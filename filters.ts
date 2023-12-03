import {
  Web3Function,
  Web3FunctionContext,
} from "@gelatonetwork/web3-functions-sdk";
import { Filter } from "chaincraft-types";
import { BigNumber } from "ethers";


export async function checkFilters(filtersGroups: Filter[][], context: Web3FunctionContext):Promise<boolean>{
    // console.log("checkFilters ",filtersGroups)
    for(const filterGroup of filtersGroups){
        // console.log("checkFilters: filterGroup ",filterGroup)
        const result = await checkFilterGroup(filterGroup, context);
        if(result){
            console.log("checkFilters true")
            return true;
        }
    }
    console.log("checkFilters false")
    return false;
}

export async function checkFilterGroup(filters: Filter[], context: Web3FunctionContext):Promise<boolean> {
    for(const filter of filters){
        // console.log("checkFilterGroup: filter ",filter)
        const result = await checkFilter(filter, context);
        if(!result){
            return false;
        }
    }
    return true;
}

export async function checkFilter(filter: Filter, context: Web3FunctionContext):Promise<boolean> {
    // console.log("checkFilter ",filter)
    if(filter.type === "GASPRICE"){
        return await checkGasPriceFilter(filter, context);
    }
    return false;
}

const checkGasPriceFilter = async (filter:Filter,  context: Web3FunctionContext) => {
    const {gelatoArgs} = context;
    const {gasPrice} = gelatoArgs;
    console.log("checkGasPriceFilter ",filter, gasPrice.toBigInt())
    const gasPriceGwei = gasPrice.div(10**9);
    console.log("gasPrice ",gasPrice.toHexString())
    const filterValueGwei = BigNumber.from(filter.value)
    console.log("gasPriceGwei ",gasPriceGwei.toBigInt())
    console.log("filterValueGwei ",filterValueGwei.toBigInt())
    if(filter.condition === "GREATER"){
        return gasPriceGwei.gte(filterValueGwei);
    }
    if(filter.condition === "LESS"){
        console.log("is less ",gasPriceGwei.lte(filterValueGwei), gasPriceGwei.toBigInt())
        return gasPriceGwei.lte(filterValueGwei);
    }
    if(filter.condition === "EQUAL"){
        return gasPriceGwei.eq(filterValueGwei);
    }
    return false;
}

// const timestamp = (await provider.getBlock("latest")).timestamp;
