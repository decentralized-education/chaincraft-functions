import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk';
import { Filter } from 'chaincraft-types';
import 'cross-fetch/polyfill';
export declare const walletJettonTrade: (filter: Filter, context: Web3FunctionContext) => Promise<{
    success: boolean;
    outputs?: undefined;
} | {
    success: boolean;
    outputs: {
        'to-jetton-address': string;
        'jetton-amount': string;
    };
}>;
