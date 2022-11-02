Moralis.Cloud.define("getUserItems", async (request) => {

    const query = new Moralis.Query("NFTTokenOwners");
    query.equalTo("contract_type", "ERC721");
    query.containedIn("owner_of", request.user.attributes.accounts);
    const queryResults = await query.find();
    const results = [];
    for (let i = 0; i < queryResults.length; ++i) {
      results.push({
        "tokenObjectId": queryResults[i].id,
        "tokenId": queryResults[i].attributes.token_id,
        "tokenAddress": queryResults[i].attributes.token_address,
        "symbol": queryResults[i].attributes.symbol,
        "tokenUri": queryResults[i].attributes.token_uri,
      });
    }
    return results;
  });

  Moralis.Cloud.define("setLoggedInUser", async (request) => {
    
    const LoggedInUsers = Moralis.Object.extend("LoggedInUsers");
    const loggedInUsers = new LoggedInUsers();
    
    loggedInUsers.set("address", res.params.address);
    return true;
    loggedInUsers.set("loggedIn", true);
  	
    loggedInUsers.save(null, { useMasterKey: true});
  
  });
  

Moralis.Cloud.beforeSave("ItemsForSale", async (request) => {
  
    const options = {
      address: request.object.get('tokenAddress').toLowerCase(),
      token_id: request.object.get('tokenId'),
      chain: "rinkeby",
    };
  	const NFTowners = await Moralis.Web3API.token.getNFTOwners(options);
    const queryResults = NFTowners.result.filter(x => x.token_address == request.object.get('tokenAddress').toLowerCase() && x.token_id == request.object.get('tokenId'));
    //query.equalTo("token_address", request.object.get('tokenAddress'));
    //query.equalTo("token_id", request.object.get('tokenId'));
    //
    const object = queryResults[0];
    if (object){
    	const owner = object.owner_of;
        const userQuery = new Moralis.Query(Moralis.User);
        userQuery.equalTo("accounts", owner);
        const userObject = await userQuery.first({useMasterKey:true});
        if (userObject){
            request.object.set('user', userObject);
        }
      	request.object.set('token', object);
    }
  });

  Moralis.Cloud.beforeSave("SoldItems", async (request) => {
  
    const query = new Moralis.Query("ItemsForSale");
    query.equalTo("uid", request.object.get('uid'));
    const item = await query.first();
    if (item){
      request.object.set('item', item);
      item.set('isSold', true);
      await item.save();
      
    
      const userQuery = new Moralis.Query(Moralis.User);
        userQuery.equalTo("accounts", request.object.get('buyer'));
      const userObject = await userQuery.first({useMasterKey:true});
      if (userObject){
          request.object.set('user', userObject);
      }
    }
  });    