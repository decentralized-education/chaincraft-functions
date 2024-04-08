import { Web3FunctionResultCallData } from '@gelatonetwork/web3-functions-sdk';
import { ActionUserInteraction } from 'chaincraft-types';
export type ActionOptions = {
    sender: string;
    outputs?: object;
};
type ReturnType = Web3FunctionResultCallData | false | ActionUserInteraction;
type StepFunction<T> = (context: any, ...args: any[]) => Promise<T | ReturnType>;
export type FunctionsObject = {
    [key: string]: StepFunction<any>;
};
export type SpellStepFunctions = Promise<FunctionsObject>;
export {};
