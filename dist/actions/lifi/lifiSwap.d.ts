import { Web3FunctionContext, Web3FunctionResultCallData } from '@gelatonetwork/web3-functions-sdk';
import { Action, EstimateInteraction } from 'chaincraft-types';
export declare const lifiSwap: {
    estimate: (action: Action, context: Web3FunctionContext) => Promise<EstimateInteraction | false>;
    swap: (action: Action, context: Web3FunctionContext, estimation: EstimateInteraction) => Promise<Web3FunctionResultCallData | false>;
};
