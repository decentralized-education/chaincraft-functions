"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFilters = exports.prepareAction = exports.main = void 0;
const VERSION = "v0.0.1";
const web3_functions_sdk_1 = require("@gelatonetwork/web3-functions-sdk");
const actions_1 = require("./actions");
const filters_1 = require("./filters");
console.log("starting on ", process.env.ENVIRONMENT);
const main = async (context) => {
    console.log("VERSION ", VERSION);
    const { userArgs, storage, multiChainProvider, gelatoArgs } = context;
    try {
        const { task: taskArgument } = userArgs;
        console.log("taskArgument ", ("" + taskArgument).slice(0, 5));
        const task = JSON.parse("" + taskArgument);
        console.log("task ", typeof task, ("" + task).slice(0, 5));
        const filtersResult = await (0, filters_1.checkFilters)(task.filters, context);
        if (filtersResult == false) {
            return {
                canExec: false,
                message: `Filters not met`,
            };
        }
        const actionData = await (0, actions_1.prepareAction)(task.action, context, {
            sender: task.sender
        });
        console.log("actionData ", actionData);
        if (actionData == true) {
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
    }
    catch (e) {
        console.log("Error: ", e);
        return {
            canExec: false,
            message: `Error: ${e}`,
        };
    }
};
exports.main = main;
if (process.env.ENVIRONMENT !== 'local') {
    web3_functions_sdk_1.Web3Function.onRun(exports.main);
}
var actions_2 = require("./actions");
Object.defineProperty(exports, "prepareAction", { enumerable: true, get: function () { return actions_2.prepareAction; } });
var filters_2 = require("./filters");
Object.defineProperty(exports, "checkFilters", { enumerable: true, get: function () { return filters_2.checkFilters; } });
