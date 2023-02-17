/** @format */

import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";

// const helpers = require("@nomicfoundation/hardhat-network-helpers");
async function main() {
  // uniswap contract Address
  const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

  const DAICONTRACTADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  const UNICONTRACTADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";

  const DAIHolderImpersonate = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";

  // connecting to uniswap contract address

  const UniswapConnect = await ethers.getContractAt("IUniswap", ROUTER_ADDRESS);

  // connecting to Dai contract
  const DAIContract = await ethers.getContractAt("IToken", DAICONTRACTADDRESS);

  // connecting to UNI contract
  const UNIContract = await ethers.getContractAt("IToken", UNICONTRACTADDRESS);

  // impersonating
  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  await helpers.impersonateAccount(DAIHolderImpersonate);
  const impersonatedSigner = await ethers.getSigner(DAIHolderImpersonate);

  // APProving uniswap to spend Dai;
  let AmountAToProvide = ethers.utils.parseEther("200");
  console.log(AmountAToProvide);
  await DAIContract.connect(impersonatedSigner).approve(
    ROUTER_ADDRESS,
    AmountAToProvide
  );

  // APProving uniswap to spend UNI
  let AmountBToProvide = ethers.utils.parseEther("100");
  await UNIContract.connect(impersonatedSigner).approve(
    ROUTER_ADDRESS,
    AmountBToProvide
  );

  // amount desired
  let AmountADesired = ethers.utils.parseEther("10");
  let AmountBDesired = ethers.utils.parseEther("2");

  // time
  let time = 1677628799;

  // Adding liquidity
  // const addLiquidity =
  await UniswapConnect.connect(impersonatedSigner).addLiquidity(
    DAICONTRACTADDRESS,
    UNICONTRACTADDRESS,
    AmountADesired,
    AmountBDesired,
    4,
    0,
    DAIHolderImpersonate,
    time
  );
  //  console.log (addLiquidity);

  let AmountCToProvide = ethers.utils.parseEther("100");
  console.log(AmountCToProvide);
  await DAIContract.connect(impersonatedSigner).approve(ROUTER_ADDRESS, AmountCToProvide);

  // connecting to wraped ether
//   const WETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
//   const WETHConnect = await ethers.getContractAt("IToken", WETH);
//   await WETHConnect.connect(impersonatedSigner).approve(
//     ROUTER_ADDRESS,
//     AmountCToProvide
//   );
  //  Add Liduidity to Eth

  const addEthLiquidity = await UniswapConnect.connect(
    impersonatedSigner
  ).addLiquidityETH(
    DAICONTRACTADDRESS,
    AmountCToProvide,
    0,
    0,
    DAIHolderImpersonate,
    time,{

        value:
        ethers.utils.parseEther("1")
    }

    
    

  );
  console.log(addEthLiquidity);

  await ethers.provider.send("evm_mine", [1706745600]);

  const FACTORY = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"

    const FACTORYConnect = await ethers.getContractAt("IUniswap", FACTORY);

  const getPair = await FACTORYConnect.getPair(DAICONTRACTADDRESS, UNICONTRACTADDRESS);

  console.log(getPair);

  const liquidityToken = await ethers.getContractAt("IToken", getPair);

  await liquidityToken.connect(impersonatedSigner).approve(
    ROUTER_ADDRESS,
    AmountAToProvide
  );



  const D= ethers.utils.parseEther("1");
  const e= ethers.utils.parseEther("1000");

  

//   await UNIContract.connect(impersonatedSigner).approve(getPair, e)
  
  // removing liquidity
  const removeLiquidity = await UniswapConnect.connect(
    impersonatedSigner
  ).removeLiquidity(
    DAICONTRACTADDRESS,
    UNICONTRACTADDRESS,
    D,
    0,
    0,
    DAIHolderImpersonate,
    1709251199,
  );
  console.log(removeLiquidity);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
