"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFilters = exports.prepareAction = exports.main = void 0;
const VERSION = 'v0.0.1';
const actions_1 = require("./actions");
const filters_1 = require("./filters");
console.log('starting on ', process.env.ENVIRONMENT);
function isWeb3FunctionResultCallData(data) {
    return 'to' in data && 'data' in data;
}
const main = async (context) => {
    console.log('VERSION ', VERSION);
    const { userArgs, storage, multiChainProvider, gelatoArgs } = context;
    try {
        const { task: taskArgument } = userArgs;
        console.log('taskArgument ', ('' + taskArgument).slice(0, 5));
        const task = JSON.parse('' + taskArgument);
        console.log('task ', typeof task, ('' + task).slice(0, 5));
        const filtersResult = await (0, filters_1.checkFilters)(task.filters, context);
        if (filtersResult.success == false) {
            return {
                canExec: false,
                message: `Filters not met`,
            };
        }
        const stepsData = await (0, actions_1.prepareAction)(task.action, context, {
            sender: task.sender,
        });
        console.log('stepData ', stepsData);
        if (!stepsData) {
            return {
                canExec: false,
                message: `Failed to generate call data`,
            };
        }
        return {
            canExec: true,
            steps: stepsData,
        };
    }
    catch (e) {
        console.log('Error: ', e);
        return {
            canExec: false,
            message: `Error: ${e}`,
        };
    }
};
exports.main = main;
// if (process.env.ENVIRONMENT !== 'local') {
//     Web3Function.onRun(main)
// }
var actions_2 = require("./actions");
Object.defineProperty(exports, "prepareAction", { enumerable: true, get: function () { return actions_2.prepareAction; } });
var filters_2 = require("./filters");
Object.defineProperty(exports, "checkFilters", { enumerable: true, get: function () { return filters_2.checkFilters; } });
