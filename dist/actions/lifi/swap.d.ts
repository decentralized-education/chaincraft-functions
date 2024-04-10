import { Web3FunctionContext, Web3FunctionResultCallData } from '@gelatonetwork/web3-functions-sdk';
import { Action, EstimateInteraction } from 'chaincraft-types';
declare const swap: (context: Web3FunctionContext, action: Action, estimation?: EstimateInteraction) => Promise<Web3FunctionResultCallData | false>;
export default swap;
