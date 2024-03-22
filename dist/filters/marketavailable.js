// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.marketAvailableFilter = void 0;
// const binance_1 = require("binance");
// const chaincraft_types_1 = require("chaincraft-types");
// const marketAvailableFilter = async (filter, context) => {
//     try {
//         console.log("[filters] marketAvailableFilter ", filter);
//         if (filter.condition == chaincraft_types_1.FilterCondition.EQUAL) {
//             const { currency } = filter.data;
//             const client = new binance_1.MainClient();
//             const exchangeInfo = await client.getExchangeInfo();
//             const isMarketAvailable = exchangeInfo.symbols.some((symbol) => symbol.symbol === `${currency}USDT`);
//             return { success: iasMarketAvailable };
//         }
//     }
//     catch (e) {
//         console.log("[filters] marketAvailableFilter error ", e);
//     }
//     return { success: false };
// };
// exports.marketAvailableFilter = marketAvailableFilter;
