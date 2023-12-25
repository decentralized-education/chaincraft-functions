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

type ActionOptions = {
  sender: string
}

export async function prepareAction(
  action: Action,
  context: Web3FunctionContext,
  options?: ActionOptions
): Promise<Web3FunctionResultCallData | false> {
  if (action.type === "SEND_NATIVE_ASSET") {
    return await sendEth(action, context, options);
  }
  if (action.type === "SEND_ERC20") {
    return await sendErc20(action, context, options);
  }
  return false;
}

export async function sendEth(
  action: Action,
  context: Web3FunctionContext,
  options?: ActionOptions
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
  context: Web3FunctionContext,
  options?: ActionOptions
): Promise<Web3FunctionResultCallData | false> {
  const { multiChainProvider } = context;

  const provider = multiChainProvider.default();

  console.log("[sendErc20] ",action.tokenAddress,action.fromAddress,action.toAddress,action, options)
  const erc20Contract = new Contract(action.tokenAddress!, ERC20, provider);

  // const code = await provider.getCode(action.address) 
  // console.log("code ",code)

  // TODO: Check balance too

  try{
    if(!options?.sender){
      console.log("[sendErc20] no sender")
      return false;
    }

    if(options?.sender?.toLowerCase() !== action?.fromAddress?.toLowerCase()){
      let checkAllowance = await erc20Contract.allowance(action.fromAddress, options?.sender)
      console.log("[sendErc20] allowance is ", checkAllowance.toString())
      console.log("[sendErc20] action.value ",action.value, ethers.utils.parseUnits(action.value!, "wei").toBigInt().toString())    
      if(checkAllowance < ethers.utils.parseUnits(action.value!, "wei").toBigInt()){
        console.log(`[sendErc20] not enough allowance ${checkAllowance} < ${ethers.utils.parseUnits(action.value!, "wei").toBigInt()}`)
        return false
      } 
    }else{
      console.log("[sendErc20] sending from the same address, no allowance required")
    }
  }catch(e){
    console.log('[sendErc20] catch ',e)
  }


  console.log("[sendErc20] action.value ",action.value)
  const data = [
    action.fromAddress, // sender
    action.toAddress, // recipient
    action.value // amount
  ]
  console.log("[sendErc20] data ",data)
  // TODO: Check allowance
  return {
    to: action.tokenAddress!,
    data: erc20Contract.interface.encodeFunctionData("transferFrom", data), //ethers.utils.parseUnits("0.0000001", "ether").toHexString(),
  };
}
