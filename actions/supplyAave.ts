import { Action, Web3FunctionContext, Web3FunctionResultCallData } from "chaincraft-types";
import { ethers } from "ethers";
import { ActionOptions } from "../types";
import { Pool } from "@aave/contract-helpers";
import { EthereumTransactionTypeExtended } from "@aave/contract-helpers";
import { AaveV3Polygon } from "@bgd-labs/aave-address-book";

export async function supplyAave(
  action: Action,
  context: Web3FunctionContext,
  options?: ActionOptions
): Promise<Web3FunctionResultCallData | false> {
  console.log("[aave] ", action);
  const { multiChainProvider } = context;

  const provider = multiChainProvider.default();

  try {
    const poolAddress = AaveV3Polygon;
    const wethGatewayAddress = poolAddress.WETH_GATEWAY;
    const user = action.fromAddress; //  Eth address
    const reserve = action.fromTokenAddress; // The reserve token address
    const amount = ethers.utils.parseEther("1").toString();
    const deadline = Math.floor(Date.now() / 1000 + 3600).toString(); // 1 h

    if (user && reserve && amount) {
      const pool = new Pool(provider, {
        POOL: poolAddress.POOL,
        WETH_GATEWAY: wethGatewayAddress,
      });

      const dataToSign: string = await pool.signERC20Approval({
        user,
        reserve,
        amount,
        deadline,
      });

      const signature = await provider.send("eth_signTypedData_v4", [
        user,
        dataToSign,
      ]);

      const txs: EthereumTransactionTypeExtended[] =
        await pool.supplyWithPermit({
          user,
          reserve,
          amount,
          signature,
          deadline,
        });

      const tx = await txs[0].tx();
      
      if (tx.to && tx.data) {
        return {
          to: tx.to,
          data: tx.data,
          value: tx.value,
        };
      }

      return false;
    }
  } catch (e: any) {
    console.log("[aave] error ", e?.response?.data);
  }
  return false;
}
