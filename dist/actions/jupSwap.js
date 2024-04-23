"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jupSwap = void 0;
const axios_1 = __importDefault(require("axios"));
async function jupSwap(action, context, options) {
    try {
        const quoteResponse = await axios_1.default.get(`https://quote-api.jup.ag/v6/quote`, {
            params: {
                inputMint: action.fromTokenAddress,
                outputMint: action.toTokenAddress,
                amount: action.value,
                slippageBps: action.slippage,
            },
        });
        console.log('[jupSwap] quote response: ', quoteResponse.data);
        const serializedTransaction = await axios_1.default.post('https://quote-api.jup.ag/v6/swap', {
            quoteResponse: quoteResponse.data,
            userPublicKey: action.fromAddress,
            wrapAndUnwrapSol: true,
        });
        if (serializedTransaction.data.swapTransaction) {
            console.log('[jupSwap] swap transaction: ', serializedTransaction.data);
            return {
                data: serializedTransaction.data.swapTransaction,
                to: ''
            };
        }
        else {
            console.log('[jupSwap] no swap tx returned');
            return false;
        }
    }
    catch (error) {
        console.error('Error during quote and transaction handling: ', error);
        return false;
    }
}
exports.jupSwap = jupSwap;
