import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk';
import { Filter } from 'chaincraft-types';
import 'cross-fetch/polyfill';
export declare const walletJettonTrade: (filter: Filter, context: Web3FunctionContext) => Promise<boolean>;
