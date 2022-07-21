import React from "react";
import { useIPFS } from "hooks/useIPFS";
import axios from "axios";
// import { useMoralis } from "react-moralis";

const generateRarity = (tokenAddress) => {
  const CHAIN = process.env.REACT_APP_CHAIN;
  const NETWORK = process.env.REACT_APP_NETWORK;
  const { resolveLink } = useIPFS();

  const fetchGames = async () => {
    const RarityGames = Moralis.Object.extend("RarityGames");
    const query = new Moralis.Query(RarityGames);
    query.equalTo("status", "ACTIVE");
    query.equalTo("chain", "0x1");
    query.descending("createdAt");

    const results = await query.find();
    return { status: true, msg: "", data: results };
  };

  const addRarityGame = async (tokenAddress, chain) => {
    try {
      let rarityGames = await fetchGames();
      if (rarityGames.data.length) {
        let isAlreadyExist = rarityGames.data?.filter(
          (result) => result?.attributes?.tokenAddress == tokenAddress,
        );

        if (isAlreadyExist?.length > 0) {
          return {
            status: false,
            msg: "Token address already exist!",
            data: null,
          };
        }
      }

      let NFTs = await Moralis.Web3API.token.getAllTokenIds({
        address: tokenAddress,
      });

      const totalNum = NFTs.total;
      const pageSize = NFTs.page_size;
      console.log(totalNum);
      console.log(pageSize);
      let allNFTs = NFTs.result;
      // let NFTs1 = await NFTs.next();
      // console.log(NFTs1);
      const timer = (ms) => new Promise((res) => setTimeout(res, ms));

      for (let i = pageSize; i < totalNum; i = i + pageSize) {
        // const NFTs = await Moralis.Web3API.token.getAllTokenIds({
        //   address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        //   offset: i,
        // });
        // NFTs = await NFTs.next();
        // if (!NFTs.cursor) NFTs = await NFTs;
        // allNFTs = allNFTs.concat(NFTs.result);
        // await timer(2000);
      }

      console.log(allNFTs);
      let metadata = allNFTs.map((e) => JSON.parse(e.metadata).attributes);
      let tally = { TraitCount: {} };

      for (let j = 0; j < metadata.length; j++) {
        let nftTraits = metadata[j].map((e) => e.trait_type);
        let nftValues = metadata[j].map((e) => e.value);

        let numOfTraits = nftTraits.length;

        if (tally.TraitCount[numOfTraits]) {
          tally.TraitCount[numOfTraits]++;
        } else {
          tally.TraitCount[numOfTraits] = 1;
        }

        for (let i = 0; i < nftTraits.length; i++) {
          let current = nftTraits[i];
          if (tally[current]) {
            tally[current].occurences++;
          } else {
            tally[current] = { occurences: 1 };
          }

          let currentValue = nftValues[i];
          if (tally[current][currentValue]) {
            tally[current][currentValue]++;
          } else {
            tally[current][currentValue] = 1;
          }
        }
      }

      const collectionAttributes = Object.keys(tally);
      let nftArr = [];
      for (let j = 0; j < metadata.length; j++) {
        let current = metadata[j];
        let totalRarity = 0;
        for (let i = 0; i < current.length; i++) {
          let rarityScore =
            1 / (tally[current[i].trait_type][current[i].value] / totalNum);
          current[i].rarityScore = rarityScore;
          totalRarity += rarityScore;
        }

        let rarityScoreNumTraits =
          8 * (1 / (tally.TraitCount[Object.keys(current).length] / totalNum));
        current.push({
          trait_type: "TraitCount",
          value: Object.keys(current).length,
          rarityScore: rarityScoreNumTraits,
        });
        totalRarity += rarityScoreNumTraits;

        if (current.length < collectionAttributes.length) {
          let nftAttributes = current.map((e) => e.trait_type);
          let absent = collectionAttributes.filter(
            (e) => !nftAttributes.includes(e),
          );

          absent.forEach((type) => {
            let rarityScoreNull =
              1 / ((totalNum - tally[type].occurences) / totalNum);
            current.push({
              trait_type: type,
              value: null,
              rarityScore: rarityScoreNull,
            });
            totalRarity += rarityScoreNull;
          });
        }

        if (allNFTs[j].metadata) {
          allNFTs[j].metadata = JSON.parse(allNFTs[j].metadata);
          allNFTs[j].image = resolveLink(allNFTs[j].metadata.image);
        } else if (allNFTs[j].token_uri) {
          try {
            await fetch(allNFTs[j].token_uri)
              .then((response) => response.json())
              .then((data) => {
                allNFTs[j].image = resolveLink(data.image);
              });
          } catch (error) {
            console.log(error);
          }
        }

        nftArr.push({
          Attributes: current,
          Rarity: totalRarity,
          token_id: allNFTs[j].token_id,
          image: allNFTs[j].image,
        });
      }

      nftArr.sort((a, b) => b.Rarity - a.Rarity);

      let gameInfo = await Moralis.Plugins.opensea.getAsset({
        network: "mainnet",
        tokenAddress: tokenAddress,
        tokenId: "0",
      });
      console.log("Metadata", gameInfo);
      // return { msg: "", data: "" };

      const rarityGamesClass = Moralis.Object.extend("RarityGames");
      const rarityGamesObj = new rarityGamesClass();
      rarityGamesObj.set("tokenAddress", tokenAddress);
      rarityGamesObj.set("metadata", gameInfo);
      rarityGamesObj.set("status", "ACTIVE");
      rarityGamesObj.set("isActive", true);
      rarityGamesObj.set("chain", chain);

      let rarityGameResponse = await rarityGamesObj.save();
      console.log("Rarity", rarityGameResponse);

      const rarityGameItemsPointerObj = new Moralis.Object.extend(
        "RarityGames",
      );
      const rarityGameItemsPointer = new rarityGameItemsPointerObj();
      rarityGameItemsPointer.id = rarityGameResponse.id;

      nftArr = nftArr.map((nft) => ({
        RarityGameId: rarityGameItemsPointer,
        ...nft,
      }));

      for (let i = 0; i < nftArr.length; i++) {
        nftArr[i].Rank = i + 1;
        const newClass = Moralis.Object.extend("RarityGameItems");
        const newObject = new newClass();

        newObject.set("RarityGameId", nftArr[i].RarityGameId);
        newObject.set("attributes", nftArr[i].Attributes);
        newObject.set("rarity", nftArr[i].Rarity);
        newObject.set("tokenId", nftArr[i].token_id);
        newObject.set("tokenAddress", tokenAddress);
        newObject.set("rank", nftArr[i].Rank);
        newObject.set("image", nftArr[i].image);

        await newObject.save();
      }
      return { status: true, msg: "Game added successfully.", data: nftArr };
    } catch (e) {
      console.log(e);
      return { status: false, msg: "Something went wrong", data: null };
    }
  };

  const deleteGame = async (tokenAddress) => {
    try {
      const games = await fetchGames();
      let game = games.data.filter(
        (result) => result.attributes.tokenAddress == tokenAddress,
      );
      game[0].set("status", "DELETED");
      let result = await game[0].save();
      if (result)
        return { status: true, msg: "Game deleted successfully", data: null };
    } catch (e) {
      return { status: false, msg: "Something went wrong!", data: null };
    }
  };

  const toggleActive = async (tokenAddress) => {
    try {
      const games = await fetchGames();
      let game = games.data.filter(
        (result) => result.attributes.tokenAddress == tokenAddress,
      );
      let action = !game[0].attributes.isActive;
      game[0].set("isActive", action);
      let result = await game[0].save();
      if (result) return { status: true, msg: "Successfull", data: null };
    } catch (e) {
      console.log(e);
      return { status: false, msg: "Something went wrong!", data: null };
    }
  };
  return { fetchGames, addRarityGame, deleteGame, toggleActive };
};

export default generateRarity;
