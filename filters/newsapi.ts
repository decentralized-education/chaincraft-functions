import {
    Web3FunctionContext
} from '@gelatonetwork/web3-functions-sdk'
import { Filter } from 'chaincraft-types'
import ky from 'ky'
import moment from 'moment'

export const newsApiFilter = async (
    filter: Filter,
    context: Web3FunctionContext
) => {
    try {
        console.log("[filters] newsApiFilter ",filter)

        const query = filter.value;
        const date = moment().format('YYYY-MM-DD');
        const apiKey = context.secrets.get("news-api-key");
        console.log("[filters] newsApiFilter apiKey ",apiKey)
        const response = await ky.get(`https://newsapi.org/v2/everything?q=${query}&from=${date}&sortBy=popularity&apiKey=${apiKey}`).json();
        console.log("[filters] newsApiFilter response ",response)
    } catch (e) {
        console.log('[filters] newsApiFilter error ', e)
    }

    return false
}