"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErc20 = exports.sendEth = exports.prepareAction = void 0;
const ethers_1 = require("ethers");
const ERC20_1 = __importDefault(require("./abi/ERC20"));
const ERC20_ABI = ["function transferFrom(address, address, uint256)",
    "function allowance(address owner, address spender) external view returns (uint256)"
];
async function prepareAction(action, context) {
    if (action.type === "SEND_NATIVE_ASSET") {
        return await sendEth(action, context);
    }
    if (action.type === "SEND_ERC20") {
        return await sendErc20(action, context);
    }
    return false;
}
exports.prepareAction = prepareAction;
async function sendEth(action, context) {
    // is it able to send??? probably no
    return {
        to: action.toAddress,
        data: "",
        value: ethers_1.ethers.utils.parseEther(action.value).toHexString(),
    };
}
exports.sendEth = sendEth;
async function sendErc20(action, context) {
    const { multiChainProvider } = context;
    const provider = multiChainProvider.default();
    console.log("sendErc20 ", action.tokenAddress, action.fromAddress, action.toAddress, action);
    const erc20Contract = new ethers_1.Contract(action.tokenAddress, ERC20_1.default, provider);
    // const code = await provider.getCode(action.address) 
    // console.log("code ",code)
    try {
        let checkAllowance = await erc20Contract.allowance(action.fromAddress, action.toAddress);
        console.log("formattedAllowance ", checkAllowance.toString());
    }
    catch (e) {
        console.log('catch ', e);
    }
    console.log("action.value ", action.value);
    const data = [
        action.fromAddress,
        action.toAddress,
        ethers_1.ethers.utils.parseUnits(action.value, "ether").toBigInt().toString(), // amount
    ];
    console.log("data ", data);
    // TODO: Check allowance
    return {
        to: action.tokenAddress,
        data: erc20Contract.interface.encodeFunctionData("transferFrom", data), //ethers.utils.parseUnits("0.0000001", "ether").toHexString(),
    };
}
exports.sendErc20 = sendErc20;
