import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk';
import { Action } from 'chaincraft-types';
import { ActionOptions, SpellStepFunctions } from '../types';
export declare function prepareAction(action: Action, context: Web3FunctionContext, options?: ActionOptions): Promise<SpellStepFunctions | false>;
