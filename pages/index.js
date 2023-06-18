
import HeadSection from '@component/components/HeadSection'
import styles from '@component/styles/Home.module.css'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'



export default function Home() {
  const [web3api,setweb3api] = useState({
    provider:null,
    web3:null

  })

  // Craete function to listen the change in account changed and network changes

  const providerChanged = (provider) => {
    provider.on("accountChanged",_=>window.location.reload);
    provider.on("chainChanged",_=>window.location.reload);
  }

  useEffect(() => {
    const loadProvider = async()=>{
      const provider = await detectEthereumProvider();

      if(provider){
        providerChanged(provider);
        setweb3api({
          provider,
          web3: new Web3(provider),

        })
        //console.log(provider)

      } else{
        window.alert("Please install any provider wallet like MetaMask")
      }
    }
    loadProvider()
    
  },[])
  // create loadAccount Function
  
  const [account,setAccount]= useState(null);

  useEffect(()=>{
    const loadAccount = async()=>{
      const accounts = await web3api.web3.eth.getAccounts();
      setAccount(accounts[0])
      //console.log(accounts)

    }
    web3api.web3 &&  loadAccount();
  },[web3api.web3])

  // create loadContracts Function

  const[NFTcontract, setNFTcontract]= useState(null)
  const[marketContract, setmarketContract]= useState(null)
  const [unsoldItems, setUnsoldItems] = useState([])

  useEffect(()=>{
    const loadContract = async()=>{
      // Paths of Json File
      const nftContractFile = await fetch("/abis/NFT.json");
      const marketContractFile = await fetch("/abis/NFTMarketPlace.json")
      //Convert all to json
      const convertnftContractFileToJson = await nftContractFile.json();
      const convertmarketContractFileToJson = await marketContractFile.json();
      //Get the api
      const marketabi = convertmarketContractFileToJson.abi;
      const nftapi = convertnftContractFileToJson.abi;

      const netWorkid = await web3api.web3.eth.net.getId()

      const nftNetworkObject = convertnftContractFileToJson.networks[netWorkid];
      const marketNetworkObject = convertmarketContractFileToJson.networks[netWorkid];

      if(nftNetworkObject && marketNetworkObject){
        const nftAddress = nftNetworkObject.address;
        const marketAddress = marketNetworkObject.address;

        const deployedNFTContract = await new web3api.web3.eth.Contract(nftapi,nftAddress );
        setNFTcontract(deployedNFTContract)
        const deployedMarketContract = await new web3api.web3.eth.Contract(marketabi,marketAddress );
        setmarketContract(deployedMarketContract)

        // Fetch all unsold item
        const data = await deployedMarketContract.methods.getAllUnsoldItem().call();
        console.log(data)
        const items = await Promise.all(data.map(async item=>{
          const nftUrl = await deployedNFTContract.tokenURI(item.tokenId);
          console.log(item)

          //TODO : fix this object
          let myItem ={
            price:item.price.toString(),
            tokenId:item.tokenId.toString(),
            owner:item.owner,
            seller:item.seller,
            image:"",
            name:"",
            description:""
          }
          return myItem;
        }))
        
          
        //console.log(deployedNFTContract.methods);
        //console.log(deployedMarketContract.methods);


      } else{
        window.alert("You are at Wrong Network") 
      }


      //console.log(networkObject);
      //console.log(netWorkid)

      //console.log(marketabi)
      //console.log("********************")
      //console.log(nftapi)



    }
    web3api.web3 && loadContract();
  },[web3api.web3])

  return (
    <div>
      <HeadSection/>
      <h1>{account}</h1>
    </div>
  )
}
