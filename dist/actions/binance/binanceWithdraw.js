// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.binanceWithdraw = void 0;
// const binance_1 = require("binance");
// const lodash_1 = __importDefault(require("lodash"));
// const moment_1 = __importDefault(require("moment"));
// async function binanceWithdraw(action, context, options) {
//     console.log("[binanceWithdraw] ", action);
//     try {
//         const binanceKey = await context.secrets.get('binance-api-key');
//         const binanceSecret = await context.secrets.get('binance-api-secret');
//         if (!binanceKey) {
//             console.error("[binanceWithdraw] no key set up");
//             return false;
//         }
//         if (!binanceSecret) {
//             console.error("[binanceWithdraw] no secret set up");
//             return false;
//         }
//         const symbol = lodash_1.default.get(action, "data.symbol");
//         const network = lodash_1.default.get(action, "data.network");
//         if (!network) {
//             console.error("[binanceWithdraw] no network set up");
//             return false;
//         }
//         if (!symbol) {
//             console.error("[binanceWithdraw] no symbol set up");
//             return false;
//         }
//         if (!action.value) {
//             console.error("[binanceWithdraw] no amount set up");
//             return false;
//         }
//         if (!action.toAddress) {
//             console.error("[binanceWithdraw] no address set up");
//             return false;
//         }
//         const binanceClient = new binance_1.MainClient({
//             api_key: binanceKey,
//             api_secret: binanceSecret,
//         });
//         // Checking the status of the withdrawal
//         const withdrawId = await context.storage.get("withdrawal-id");
//         if (withdrawId) {
//             console.log("[binanceWithdraw] withdrawId ", withdrawId);
//             const result = await binanceClient.getWithdrawHistory({
//                 startTime: (0, moment_1.default)().add(-1, 'days').unix() * 1000,
//                 endTime: Date.now(),
//                 // coin: 'BNB',
//             });
//             const withdrawal = result.find((x) => x.id == withdrawId);
//             if (withdrawal) {
//                 console.log("[binanceWithdraw] withdrawal found ", withdrawal);
//                 return true;
//             }
//             return false;
//         }
//         else {
//             console.log("[binanceWithdraw] withdrawId is empty");
//         }
//         const withdrawResult = await binanceClient.withdraw({
//             network: network,
//             coin: symbol,
//             amount: +action.value,
//             address: action.toAddress
//         });
//         console.log("[binanceTrade] successful withdrawal ", withdrawResult);
//         if (withdrawResult) {
//             await context.storage.set("withdrawal-id", withdrawResult.id);
//         }
//     }
//     catch (e) {
//         console.error("[binanceWithdraw] error ", e);
//     }
//     return false;
// }
// exports.binanceWithdraw = binanceWithdraw;
