import {
  Web3Function,
  Web3FunctionContext,
  Web3FunctionResultCallData,
} from "@gelatonetwork/web3-functions-sdk";
import { Action, Filter } from "chaincraft-types";
import { Contract, ethers } from "ethers";

import ERC20 from './abi/ERC20'
const ERC20_ABI = ["function transferFrom(address, address, uint256)",

"function allowance(address owner, address spender) external view returns (uint256)"
];

export async function prepareAction(
  action: Action,
  context: Web3FunctionContext
): Promise<Web3FunctionResultCallData | false> {
  if (action.type === "SEND_NATIVE_ASSET") {
    return await sendEth(action, context);
  }
  if (action.type === "SEND_ERC20") {
    return await sendErc20(action, context);
  }
  return false;
}

export async function sendEth(
  action: Action,
  context: Web3FunctionContext
): Promise<Web3FunctionResultCallData | false> {
  // is it able to send??? probably no
  return {
    to: action.toAddress!,
    data: "",
    value: ethers.utils.parseEther(action.value!).toHexString(),
  };
}

export async function sendErc20(
  action: Action,
  context: Web3FunctionContext
): Promise<Web3FunctionResultCallData | false> {
  const { multiChainProvider } = context;

  const provider = multiChainProvider.default();

  console.log("sendErc20 ",action.tokenAddress,action.fromAddress,action.toAddress)
  const erc20Contract = new Contract(action.tokenAddress!, ERC20, provider);

  // const code = await provider.getCode(action.address) 
  // console.log("code ",code)
  try{
    let checkAllowance = await erc20Contract.allowance(action.fromAddress,action.toAddress)
    console.log("formattedAllowance ", checkAllowance.toString())    
  }catch(e){
    console.log('catch ',e)
  }


  const data = [
    action.fromAddress, // sender
    action.toAddress, // recipient
    ethers.utils.parseUnits(action.value!, "ether").toBigInt().toString(), // amount
  ]
  console.log("data ",data)
  // TODO: Check allowance
  return {
    to: action.tokenAddress!,
    data: erc20Contract.interface.encodeFunctionData("transferFrom", data), //ethers.utils.parseUnits("0.0000001", "ether").toHexString(),
  };
}
