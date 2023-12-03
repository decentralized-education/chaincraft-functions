import { Web3FunctionContext, Web3FunctionResultCallData } from "@gelatonetwork/web3-functions-sdk";
import { Action } from "chaincraft-types";
export declare function prepareAction(action: Action, context: Web3FunctionContext): Promise<Web3FunctionResultCallData | false>;
export declare function sendEth(action: Action, context: Web3FunctionContext): Promise<Web3FunctionResultCallData | false>;
export declare function sendErc20(action: Action, context: Web3FunctionContext): Promise<Web3FunctionResultCallData | false>;
