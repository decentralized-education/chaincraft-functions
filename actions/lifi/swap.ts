import { Web3FunctionContext, Web3FunctionResultCallData } from '@gelatonetwork/web3-functions-sdk';
import { Action, EstimateInteraction } from 'chaincraft-types';


const swap = async (context: Web3FunctionContext, action: Action, estimation?: EstimateInteraction): Promise<Web3FunctionResultCallData | false> => {
    if (!estimation) {
        const _estimation = await context.storage.get('estimation')
        if (!_estimation) {
            return false
        }
        const pEst = JSON.parse(_estimation)
        return {
            to: pEst.tx.to,
            data: pEst.tx.data,
            value: pEst.tx.value,
        } as Web3FunctionResultCallData
    }

    return {
        to: estimation.tx.to,
        data: estimation.tx.data,
        value: estimation.tx.value,
    } as Web3FunctionResultCallData
}

export default swap;