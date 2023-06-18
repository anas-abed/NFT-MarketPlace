// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter ;
    Counters.Counter private nftTokenID ;
    address contractAddress;
    constructor(address marketplaceAddress) ERC721("ANASNFT", "ANFT") {
        contractAddress = marketplaceAddress;
    }

    function createNFTToken(string memory nftTokenURL) public returns (uint256){

        nftTokenID.increment();
        uint256 id = nftTokenID.current();
        //mint
        _mint(msg.sender, id);
        // set URL
        _setTokenURI(id, nftTokenURL);
        // Approval for all
        setApprovalForAll(contractAddress, true);

        return id;

    }
}