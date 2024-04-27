import { Action, Web3FunctionContext, Web3FunctionResultCallData } from "chaincraft-types";
import { ActionOptions } from "../types";
export declare function socketSwap(action: Action, context: Web3FunctionContext, options?: ActionOptions): Promise<Web3FunctionResultCallData | false>;
