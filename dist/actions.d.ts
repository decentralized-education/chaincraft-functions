import { Web3FunctionContext, Web3FunctionResultCallData } from "@gelatonetwork/web3-functions-sdk";
import { Action } from "chaincraft-types";
type ActionOptions = {
    sender: string;
};
export declare function prepareAction(action: Action, context: Web3FunctionContext, options?: ActionOptions): Promise<Web3FunctionResultCallData | false>;
export declare function sendEth(action: Action, context: Web3FunctionContext, options?: ActionOptions): Promise<Web3FunctionResultCallData | false>;
export declare function sendErc20(action: Action, context: Web3FunctionContext, options?: ActionOptions): Promise<Web3FunctionResultCallData | false>;
export {};
