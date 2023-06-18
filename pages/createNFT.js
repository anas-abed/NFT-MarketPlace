import React, {useState,useEffect} from "react";
import { create } from 'ipfs-http-client'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
//import "../contracts/NFTMarketPlace.sol"

//const ipfsClient = require("ipfs-http-client");
const projectId = "2RN2clEtTkj0CKVkdrLFeVVPCIM";
const projectSecretKey = "ace790353b1b7ddde9e97e21338ed58d";
const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecretKey).toString("base64");

const ipfsClient = create({
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https",
	headers: {
		authorization: auth,
	},
});

const CreateNFT = () => {

	

	
	const [urlHash, setUrlHash]= useState()

	

	
	const onChange = async(e)=>{
		const file = e.target.files[0];
		
		try{
			const addedFile = await ipfsClient.add(file);
			//console.log(addedFile.path)
			const ipfsURL ='https://anas.infura-ipfs.io/${addedFile.path}';
			//console.log(ipfsURL)
			setUrlHash(ipfsURL)
			//console.log(ipfsURL)
		}catch(e){
			console.log(e)

		}

	}












  return (
    <div className=" flex justify-center ">
      <div className=" w-1/2 flex flex-col pb-11 ">
        <input
          className=" mt-8 border rounded p-3 bg-gray-200 "
          placeholder="Enter your NFTs Name"
          onChange={e=>setNftFormInput({...nftFormInput,name:e.target.value})}
        />
		<input
          className=" mt-8 border rounded p-3 bg-gray-200 "
          placeholder="Enter your NFTs Price in Ether"
          onChange={e=>setNftFormInput({...nftFormInput,price:e.target.value})}
        />
		<input
          className=" mt-8 border rounded p-3 bg-gray-200 "
          placeholder="Enter your NFTs Description"
          onChange={e=>setNftFormInput({...nftFormInput,description:e.target.value})}
        />
		<div class="grid grid-cols-1 space-y-2" >
		    <label class="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
			<div class="flex items-center justify-center w-full">
			    <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
				    <div class="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
					    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
						</svg>
						<div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
						{
							urlHash?<img class="has-mask h-36 object-center" src={urlHash} alt="freepik image"/>:null

						}
						
						<p class="pointer-none text-gray-500 "><span class="text-sm">Drag and drop</span> files here <br /> or <a  id="" class="text-blue-600 hover:underline">select a file</a> from your computer</p>
						</div>

					</div>
					<input type="file" onChange={onChange}/>
				</label>
			</div>
	    
		</div>
		<button className=" font-bold bg-blue-500 mt-5 rounded p-4 text-white " onClick={console.log("kkk")} >Submit Your NFTs</button>
      </div>
    </div>
  );
};

export default CreateNFT;
