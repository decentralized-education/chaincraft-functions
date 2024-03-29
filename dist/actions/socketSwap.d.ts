import { Web3FunctionContext, Web3FunctionResultCallData } from "@gelatonetwork/web3-functions-sdk";
import { Action } from "chaincraft-types";
import { ActionOptions } from "../types";
export declare function socketSwap(action: Action, context: Web3FunctionContext, options?: ActionOptions): Promise<Web3FunctionResultCallData | false>;
