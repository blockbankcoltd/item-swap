// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MorarableToken is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor () ERC721("MorarableToken", "MORA"){}

    struct Item {
        uint256 id;
        address creator;
        string uri;
    }

    mapping (uint256 => Item) public Items;

    function createItem(string memory uri) public returns (uint256){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);

        Items[newItemId] = Item(newItemId, msg.sender, uri);

        return newItemId;
    }

    function currentId() public view returns (uint256) {
        return _tokenIds.current();
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

       return Items[tokenId].uri;
    }
}