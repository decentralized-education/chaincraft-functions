const VERSION = 'v0.0.1'
import { Web3Function, Web3FunctionContext, Web3FunctionResult, Web3FunctionResultCallData } from '@gelatonetwork/web3-functions-sdk'
import { ActionUserInteraction, EstimateInteraction, Task } from 'chaincraft-types'
import { prepareAction } from './actions'
import { checkFilters } from './filters'
import { FunctionsObject } from './types'
console.log('starting on ', process.env.ENVIRONMENT)

function isWeb3FunctionResultCallData(data: any): data is Web3FunctionResultCallData {
    return 'to' in data && 'data' in data
}

// export type ExtendedWeb3FunctionResult =
//     | Web3FunctionResult
//     | {
//           canExec: true
//           estimation: EstimateInteraction
//       }

export type prepareActionRes = {
    canExec: boolean
    steps?: FunctionsObject
    message?: string
}


export const main = async (context: Web3FunctionContext): Promise<prepareActionRes> => {
    console.log('VERSION ', VERSION)
    const { userArgs, storage, multiChainProvider, gelatoArgs } = context

    try {
        const { task: taskArgument } = userArgs
        console.log('taskArgument ', ('' + taskArgument).slice(0, 5))
        const task: Task = JSON.parse('' + taskArgument)
        console.log('task ', typeof task, ('' + task).slice(0, 5))

        const filtersResult = await checkFilters(task.filters, context)
        if (filtersResult.success == false) {
            return {
                canExec: false,
                message: `Filters not met`,
            }
        }

        const stepsData = await prepareAction(task.action, context, {
            sender: task.sender!,
        }) 
        console.log('stepData ', stepsData)

        if (!stepsData) {
            return {
                canExec: false,
                message: `Failed to generate call data`,
            }
        }

            return {
                canExec: true,
                steps: stepsData,
            }
        
    } catch (e) {
        console.log('Error: ', e)
        return {
            canExec: false,
            message: `Error: ${e}`,
        }
    }
}
// if (process.env.ENVIRONMENT !== 'local') {
//     Web3Function.onRun(main)
// }

export { prepareAction } from './actions'
export { checkFilters } from './filters'
