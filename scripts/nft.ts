import { getContractFactory } from "@nomiclabs/hardhat-ethers/types";
import { ethers } from "hardhat";

async function main() {
    // const Web3NFT = await ethers.getContractFactory("Web3Token");
    // const web3NFT = await Web3NFT.deploy();

    // await web3NFT.deployed();
const web3NFT = await ethers.getContractAt("Web3Token","0x23604479Ec9d14dD83ae7d2573C2F9E33fe73B6D");
    // console.log(`NFT contract deployed at ${web3NFT.address}`);

     await web3NFT.safeMint("0x8DCeC3aF87Efc4B258f2BCAEB116D36B9ca012ee","QmfHz1h1uUWY1j3oR7a5UHHepXqKDZ86Rr1fcBT8xM7poQ");

     const tokenURI = await await web3NFT.tokenURI(0);
     console.log(`the token URI for index[0] is ${tokenURI} `);

 

}
main().catch((error)=>{
    console.error(error);
    process.exitCode = 1;
})