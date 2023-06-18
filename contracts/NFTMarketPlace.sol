// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarketPlace is ReentrancyGuard{

    uint256 private marketFees = 0.019 ether;

    address payable owner;

    using Counters for Counters.Counter;
    Counters.Counter private itemID;
    Counters.Counter private itemsSold;

    constructor(){
        owner = payable(msg.sender);
    }

    struct NFTMarketItem{
        address nftContract;
        uint256 id;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;

    }
    event NFTMarketItemCreated(
        address indexed nftContract,
        uint256 indexed id,
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold

    );
    function gettheMarketFees()public view returns(uint256){
        return marketFees;
    }

///////////////////////
    mapping(uint256 => NFTMarketItem) private idForMarketItem;
//////////////////////

    function createItemForSale(address nftContract, uint256 tokenId, uint256 price)public payable nonReentrant{
        require(price > 0,"Price should be moreThan 1");
        require(tokenId > 0,"Token Id should be moreThan 1");
        require(msg.value == marketFees, "The Market Fees is 0.010 Ether");
        require(nftContract != address(0), "Address should not be equal 0*0");


        itemID.increment();
        uint256 id = itemID.current();

        idForMarketItem[id]=NFTMarketItem(
            nftContract,
            id,
            tokenId,
            payable (address (0)),
            payable (msg.sender),
            price,
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit NFTMarketItemCreated(nftContract, id, tokenId, address(0), msg.sender, price, false);

    }
    // Create Market

    function createMarketForSale(address nftContract, uint256 nftItemId) public payable nonReentrant{
        uint256 price = idForMarketItem[nftItemId].price;
        uint256 tokenId = idForMarketItem[nftItemId].tokenId;

        require(msg.value == price, "Should buy the price of item");
        idForMarketItem[nftItemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom( address(this),msg.sender, tokenId); //buy
        idForMarketItem[nftItemId].owner = payable(msg.sender);
        idForMarketItem[nftItemId].sold = true;
        payable(owner).transfer(marketFees);
        itemsSold.increment();

    }

    // My items => sold, not sold, buy

    function getMyItemCreated() public view returns (NFTMarketItem[] memory){
        uint256 totalItemCount = itemID.current();
        uint myItemCount=0;
        uint myCurrentIndex=0;

        for(uint i = 1; i<totalItemCount;i++){
            if(idForMarketItem[i].seller==msg.sender){
                myItemCount+=1;

            }
        }
        NFTMarketItem [] memory nftItems = new NFTMarketItem[](myItemCount);
        for(uint i = 0; i<totalItemCount;i++){
            if(idForMarketItem[i+1].seller==msg.sender){
                uint currentId = i+1;
                NFTMarketItem  storage currentItem = idForMarketItem[currentId];
                nftItems[myCurrentIndex] = currentItem;
                myCurrentIndex +=1;

            }


        }

        return nftItems;
    }

    // Create My purchased NFT Item

    function getMyNFTPurchased() public view returns (NFTMarketItem[] memory){
        uint256 totalItemCount = itemID.current();
        uint myItemCount=0;
        uint myCurrentIndex=0;

        for(uint i = 0; i<totalItemCount;i++){
            if(idForMarketItem[i+1].owner==msg.sender){
                myItemCount+=1;

            }
        }

        NFTMarketItem [] memory nftItems = new NFTMarketItem[](myItemCount);
        for(uint i = 0; i<totalItemCount;i++){
            if(idForMarketItem[i+1].owner==msg.sender){
                uint currentId = i+1;
                NFTMarketItem  storage currentItem = idForMarketItem[currentId];
                nftItems[myCurrentIndex] = currentItem;
                myCurrentIndex +=1;

            }


        }

        return nftItems;
    }

    // Fetch all unsold NFT item

    function getAllUnsoldItem() public view returns (NFTMarketItem[] memory) {
        uint256 totalItemCount = itemID.current();
        uint myItemCount= itemID.current() - itemsSold.current();
        uint myCurrentIndex=0;

        NFTMarketItem [] memory nftItems = new NFTMarketItem[](myItemCount);
        for(uint i = 0; i<totalItemCount;i++){
            if(idForMarketItem[i+1].owner==address(0)){
                uint currentId = i+1;
                NFTMarketItem  storage currentItem = idForMarketItem[currentId];
                nftItems[myCurrentIndex] = currentItem;
                myCurrentIndex +=1;

            }


        }

        return nftItems;

        

    }

}