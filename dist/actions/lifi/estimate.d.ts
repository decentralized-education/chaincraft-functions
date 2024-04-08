import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk/*';
import { Action, EstimateInteraction } from 'chaincraft-types';
declare const estimate: (context: Web3FunctionContext, _action: Action) => Promise<EstimateInteraction | false>;
export default estimate;
