const VERSION = "v0.0.1";
import {
  Web3Function,
  Web3FunctionContext,
  Web3FunctionResult,
} from "@gelatonetwork/web3-functions-sdk";
import { Task } from "chaincraft-types";
import { checkFilters } from "./filters";
import { prepareAction } from "./actions";
console.log("starting on ",process.env.ENVIRONMENT)

export const main = async (context: Web3FunctionContext): Promise<Web3FunctionResult> => {
  console.log("VERSION ", VERSION);
  const { userArgs, storage, multiChainProvider, gelatoArgs } = context;
  try {
    const { task: taskArgument } = userArgs;
    console.log("taskArgument ", ("" + taskArgument).slice(0, 5));
    const task: Task = JSON.parse("" + taskArgument);
    console.log("task ", typeof task, ("" + task).slice(0, 5));

    const filtersResult = await checkFilters(task.filters, context);
    if (filtersResult == false) {
      return {
        canExec: false,
        message: `Filters not met`,
      };
    }
    const actionData = await prepareAction(task.action, context);
    console.log("actionData ", actionData);
    if (!actionData) {
      return {
        canExec: false,
        message: `Failed to generate call data`,
      };
    }
    return {
      canExec: true,
      callData: [actionData],
    };
  } catch (e) {
    console.log("Error: ", e);
    return {
      canExec: false,
      message: `Error: ${e}`,
    };
  }
};
if(process.env.ENVIRONMENT !== 'local') {
  Web3Function.onRun(main);
}

export {checkFilters} from './filters'
export {prepareAction} from './actions'