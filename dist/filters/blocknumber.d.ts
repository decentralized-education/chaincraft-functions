import { Filter, Web3FunctionContext } from 'chaincraft-types';
export declare const blockNumberFilter: (filter: Filter, context: Web3FunctionContext) => Promise<{
    success: boolean;
}>;
