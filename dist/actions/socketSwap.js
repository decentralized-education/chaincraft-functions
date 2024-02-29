"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketSwap = void 0;
const axios_1 = __importDefault(require("axios"));
const API_KEY = "72a5b4b0-e727-48be-8aa1-5da9d62fe635"; // SOCKET PUBLIC API KEY
// GET routes available for selected tokens & chains
async function getQuote(fromChainId, fromTokenAddress, toChainId, toTokenAddress, fromAmount, userAddress, uniqueRoutesPerBridge, sort, singleTxOnly) {
    const response = await axios_1.default.get(`https://api.socket.tech/v2/quote`, {
        params: {
            fromChainId,
            fromTokenAddress,
            toChainId,
            toTokenAddress,
            fromAmount,
            userAddress,
            uniqueRoutesPerBridge,
            sort,
            singleTxOnly,
        },
        headers: {
            "API-KEY": API_KEY,
            Accept: "application/json",
        },
    });
    return response.data;
}
// POST for swap / bridge transaction data
async function getRouteTransactionData(route) {
    const response = await axios_1.default.post("https://api.socket.tech/v2/build-tx", { route }, {
        headers: {
            "API-KEY": API_KEY,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    return response.data;
}
async function socketSwap(action, context, options) {
    try {
        const fromChainId = action.data.fromchain;
        const toChainId = action.data.tochain;
        const fromAssetAddress = action.fromTokenAddress;
        const toAssetAddress = action.toTokenAddress;
        const amount = action.value;
        const userAddress = action.fromAddress;
        const uniqueRoutesPerBridge = true;
        const sort = "output"; // or "gas" or "time"
        const singleTxOnly = true;
        if (fromAssetAddress &&
            toAssetAddress &&
            amount &&
            userAddress &&
            fromChainId &&
            toChainId) {
            const quote = await getQuote(fromChainId, fromAssetAddress, toChainId, toAssetAddress, +amount, userAddress, uniqueRoutesPerBridge, sort, singleTxOnly);
            const route = quote.result.routes[0];
            // Fetching transaction data for swap/bridge tx
            const txDataReturned = await getRouteTransactionData(route);
            return {
                to: txDataReturned.result.txTarget,
                data: txDataReturned.result.txData,
                value: txDataReturned.result.value,
            };
        }
        else {
            console.error("[socketSwap] missing parameters");
            return false;
        }
    }
    catch (e) {
        console.error("[socketSwap] error", e);
        return false;
    }
}
exports.socketSwap = socketSwap;
