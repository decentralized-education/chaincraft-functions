import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk'
import { Filter, FilterCondition } from 'chaincraft-types'
import axios from 'axios'
import moment from 'moment'
import Decimal from 'decimal.js'

export const coingeckoPriceFilter = async (
    filter: Filter,
    context: Web3FunctionContext
) => {
    try {
        console.log('[filters] coingeckoPriceFilter ', filter)
        const {coingeckoid, price, currency = "usd"} = filter.data as any;
        // const apiKey = await context.secrets.get('coingecko-api-key')
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoid}&vs_currencies=${currency}`;
        console.log("[filters] coingeckoPriceFilter url ",url)

        const { data } = await axios.get(url)
        console.log('[filters] coingeckoPriceFilter response ', data)
        if (data && data[coingeckoid] && data[coingeckoid][currency]) {
            if(filter.condition == FilterCondition.GREATER  && new Decimal(data[coingeckoid][currency]).greaterThan(new Decimal(price))) {
                return true
            }
            if(filter.condition == FilterCondition.LESS  && new Decimal(data[coingeckoid][currency]).lessThan(new Decimal(price))) {
                return true
            }
            if(filter.condition == FilterCondition.LESSOREQUAL  && new Decimal(data[coingeckoid][currency]).lessThanOrEqualTo(new Decimal(price))) {
                return true
            }
            if(filter.condition == FilterCondition.GREATEROREQUAL  && new Decimal(data[coingeckoid][currency]).greaterThanOrEqualTo(new Decimal(price))) {
                return true
            }
            if(filter.condition == FilterCondition.EQUAL  &&  new Decimal(data[coingeckoid][currency]).equals(new Decimal(price))) {
                return true
            }
        }
    } catch (e) {
        console.log('[filters] coingeckoPriceFilter error ', e)
    }

    return false
}
