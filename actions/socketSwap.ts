import {
  Web3FunctionContext,
  Web3FunctionResultCallData,
} from "@gelatonetwork/web3-functions-sdk";
import axios from "axios";
import { Action } from "chaincraft-types";
import { ActionOptions } from "../types";

const API_KEY = "72a5b4b0-e727-48be-8aa1-5da9d62fe635"; // SOCKET PUBLIC API KEY

// GET routes available for selected tokens & chains
async function getQuote(
  fromChainId: number,
  fromTokenAddress: string,
  toChainId: number,
  toTokenAddress: string,
  fromAmount: number,
  userAddress: string,
  uniqueRoutesPerBridge: boolean,
  sort: string,
  singleTxOnly: boolean
) {
 const response = await axios.get(`https://api.socket.tech/v2/quote`, {
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
async function getRouteTransactionData(route: any) {
  const response = await axios.post(
    "https://api.socket.tech/v2/build-tx",
    { route },
    {
      headers: {
        "API-KEY": API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function socketSwap(
  action: Action,
  context: Web3FunctionContext,
  options?: ActionOptions
): Promise<Web3FunctionResultCallData | false> {
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

    if (
      fromAssetAddress &&
      toAssetAddress &&
      amount &&
      userAddress &&
      fromChainId &&
      toChainId
    ) {
      const quote = await getQuote(
        fromChainId,
        fromAssetAddress,
        toChainId,
        toAssetAddress,
        +amount,
        userAddress,
        uniqueRoutesPerBridge,
        sort,
        singleTxOnly
      );

      const route = quote.result.routes[0];

      // Fetching transaction data for swap/bridge tx
      const txDataReturned = await getRouteTransactionData(route);

      return {
        to: txDataReturned.result.txTarget,
        data: txDataReturned.result.txData,
        value: txDataReturned.result.value,
      };
    } else {
      console.error("[socketSwap] missing parameters");
      return false;
    }
  } catch (e) {
    console.error("[socketSwap] error", e);
    return false;
  }
}