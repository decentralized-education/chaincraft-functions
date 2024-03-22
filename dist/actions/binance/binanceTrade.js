// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.binanceTrade = void 0;
// const binance_1 = require("binance");
// const lodash_1 = __importDefault(require("lodash"));
// async function binanceTrade(action, context, options) {
//     console.log("[binanceTrade] ", action);
//     try {
//         const binanceKey = await context.secrets.get('binance-api-key');
//         const binanceSecret = await context.secrets.get('binance-api-secret');
//         console.log("[binanceTrade] ", binanceKey, binanceSecret);
//         if (!binanceKey) {
//             console.error("[binanceTrade] no key set up");
//             return false;
//         }
//         if (!binanceSecret) {
//             console.error("[binanceTrade] no secret set up");
//             return false;
//         }
//         const symbol = lodash_1.default.get(action, "data.symbol");
//         const side = lodash_1.default.get(action, "data.side");
//         if (!side) {
//             console.error("[binanceTrade] no side set up");
//             return false;
//         }
//         if (!symbol) {
//             console.error("[binanceTrade] no symbol set up");
//             return false;
//         }
//         if (!action.value) {
//             console.error("[binanceTrade] no amount set up");
//             return false;
//         }
//         const binanceClient = new binance_1.MainClient({
//             api_key: binanceKey,
//             api_secret: binanceSecret,
//         });
//         const response = await binanceClient.submitNewOrder({
//             symbol,
//             side: side,
//             type: "MARKET",
//             quantity: +action.value
//         });
//         console.log("[binanceTrade] successful trade ", response);
//         if (response.orderId) {
//             return true;
//         }
//     }
//     catch (e) {
//         console.error("[binanceTrade] error ", e);
//     }
//     return false;
// }
// exports.binanceTrade = binanceTrade;
