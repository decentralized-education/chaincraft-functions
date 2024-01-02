import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk'
import { Filter } from 'chaincraft-types'
import axios from 'axios'
import moment from 'moment'

export const newsApiFilter = async (
    filter: Filter,
    context: Web3FunctionContext
) => {
    try {
        console.log('[filters] newsApiFilter ', filter)

        const query = filter.value
        const date = moment().add(-1, 'days').format('YYYY-MM-DD')
        const apiKey = await context.secrets.get('news-api-key')
        console.log("[filters] newsApiFilter query ",query)
        const url = `https://newsapi.org/v2/everything?q=${query}&from=${date}&sortBy=popularity&apiKey=${apiKey}`;
        const { data } = await axios.get(url)
        console.log('[filters] newsApiFilter response ', data)
        if (data.status == 'ok' && data.totalResults > 0) {
            return true
        }
    } catch (e) {
        console.log('[filters] newsApiFilter error ', e)
    }

    return false
}
