const VERSION = "v0.0.1";
import { Task, Web3FunctionContext, Web3FunctionResult } from "chaincraft-types";
import { prepareAction } from "./actions";
import { checkFilters } from "./filters";
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
    if (filtersResult.success == false) {
      return {
        canExec: false,
        message: `Filters not met`,
      };
    }
    
    const actionData = await prepareAction(task.action, context, {
      sender: task.sender!
    });
    console.log("actionData ", actionData);
    if(actionData == true){
      return {
        canExec: false,
        message: `Action executed`,
      }; 
    }
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
  // Web3Function.onRun(main);
}

export { prepareAction } from './actions';
export { checkFilters } from './filters';
