// import { MainClient } from "binance";
// import { Web3FunctionContext } from "@gelatonetwork/web3-functions-sdk";
// import { Filter, FilterCondition } from "chaincraft-types";

// export const marketAvailableFilter = async (
//   filter: Filter,
//   context: Web3FunctionContext
// ) => {
//   try {
//     console.log("[filters] marketAvailableFilter ", filter);

//     if (filter.condition == FilterCondition.EQUAL) {
//       const { currency } = filter.data as any;

//       const client = new MainClient();

//       const exchangeInfo = await client.getExchangeInfo();

//       const isMarketAvailable = exchangeInfo.symbols.some(
//         (symbol) => symbol.symbol === `${currency}USDT`
//       );

//       return { success: isMarketAvailable };
//     }
//   } catch (e) {
//     console.log("[filters] marketAvailableFilter error ", e);
//   }

//   return { success: false };
// };
