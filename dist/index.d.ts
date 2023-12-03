import { Web3FunctionContext, Web3FunctionResult } from "@gelatonetwork/web3-functions-sdk";
export declare const main: (context: Web3FunctionContext) => Promise<Web3FunctionResult>;
export { checkFilters } from './filters';
export { prepareAction } from './actions';
