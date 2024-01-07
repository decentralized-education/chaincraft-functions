"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEth = void 0;
const ethers_1 = require("ethers");
async function sendEth(action, context, options) {
    // is it able to send??? probably no
    return {
        to: action.toAddress,
        data: '',
        value: ethers_1.ethers.utils.parseEther(action.value).toHexString(),
    };
}
exports.sendEth = sendEth;
