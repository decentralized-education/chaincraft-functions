import { Filter, Web3FunctionContext } from 'chaincraft-types';
export declare const coingeckoPriceFilter: (filter: Filter, context: Web3FunctionContext) => Promise<{
    success: boolean;
}>;
