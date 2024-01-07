"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lifiSwap = void 0;
const axios_1 = __importDefault(require("axios"));
async function lifiSwap(action, context, options) {
    console.log("[lifiSwap] ", action);
    try {
        const lifiQuoteUrl = `https://li.quest/v1/quote`;
        const params = {
            fromChain: "POL",
            // fromChain: action.data.fromchain,
            // toChain: action.data.tochain,
            toChain: "POL",
            fromToken: action.fromTokenAddress,
            toToken: action.toTokenAddress,
            fromAmount: action.value,
            fromAddress: action.fromAddress,
            order: "CHEAPEST",
            slippage: "0.005",
            integrator: "chaincraft.app",
            fee: 0,
            allowDestinationCall: false
        };
        console.log("[lifiSwap] params ", params);
        const { data } = await axios_1.default.get(lifiQuoteUrl, {
            params
        });
        // todo: check other
        console.log("[lifiSwap] data ", data);
        console.log("[lifiSwap] transactionRequest ", data?.transactionRequest);
        console.log("[lifiSwap] estimate ", data?.estimate);
        if (data?.transactionRequest) {
            return {
                to: data?.transactionRequest?.to,
                data: data?.transactionRequest?.data,
                value: data?.transactionRequest?.value,
            };
        }
    }
    catch (e) {
        console.log("[lifiSwap] error ", e?.response?.data);
    }
    return false;
}
exports.lifiSwap = lifiSwap;
