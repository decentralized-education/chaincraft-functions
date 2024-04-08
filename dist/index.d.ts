import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk';
import { FunctionsObject } from './types';
export type prepareActionRes = {
    canExec: boolean;
    steps?: FunctionsObject;
    message?: string;
};
export declare const main: (context: Web3FunctionContext) => Promise<prepareActionRes>;
export { prepareAction } from './actions';
export { checkFilters } from './filters';
