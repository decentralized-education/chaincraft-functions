import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk';
import { Filter } from 'chaincraft-types';
export declare const blockNumberFilter: (filter: Filter, context: Web3FunctionContext) => Promise<boolean>;
