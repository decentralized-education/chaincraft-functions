import { Filter, Web3FunctionContext } from "chaincraft-types";
export declare function checkFilters(filtersGroups: Filter[][], context: Web3FunctionContext): Promise<CheckFilterResult>;
export declare function checkFilterGroup(filters: Filter[], context: Web3FunctionContext): Promise<CheckFilterResult>;
export declare function checkFilter(filter: Filter, context: Web3FunctionContext): Promise<CheckFilterResult>;
export interface CheckFilterResult {
    success: boolean;
    outputs?: object;
}
