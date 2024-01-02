"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coingeckoPriceFilter = void 0;
const chaincraft_types_1 = require("chaincraft-types");
const axios_1 = __importDefault(require("axios"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const coingeckoPriceFilter = async (filter, context) => {
    try {
        console.log('[filters] coingeckoPriceFilter ', filter);
        const { coingeckoid, price, currency = "usd" } = filter.data;
        // const apiKey = await context.secrets.get('coingecko-api-key')
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoid}&vs_currencies=${currency}`;
        console.log("[filters] coingeckoPriceFilter url ", url);
        const { data } = await axios_1.default.get(url);
        console.log('[filters] coingeckoPriceFilter response ', data);
        if (data && data[coingeckoid] && data[coingeckoid][currency]) {
            if (filter.condition == chaincraft_types_1.FilterCondition.GREATER && new decimal_js_1.default(data[coingeckoid][currency]).greaterThan(new decimal_js_1.default(price))) {
                return true;
            }
            if (filter.condition == chaincraft_types_1.FilterCondition.LESS && new decimal_js_1.default(data[coingeckoid][currency]).lessThan(new decimal_js_1.default(price))) {
                return true;
            }
            if (filter.condition == chaincraft_types_1.FilterCondition.LESSOREQUAL && new decimal_js_1.default(data[coingeckoid][currency]).lessThanOrEqualTo(new decimal_js_1.default(price))) {
                return true;
            }
            if (filter.condition == chaincraft_types_1.FilterCondition.GREATEROREQUAL && new decimal_js_1.default(data[coingeckoid][currency]).greaterThanOrEqualTo(new decimal_js_1.default(price))) {
                return true;
            }
            if (filter.condition == chaincraft_types_1.FilterCondition.EQUAL && new decimal_js_1.default(data[coingeckoid][currency]).equals(new decimal_js_1.default(price))) {
                return true;
            }
        }
    }
    catch (e) {
        console.log('[filters] coingeckoPriceFilter error ', e);
    }
    return false;
};
exports.coingeckoPriceFilter = coingeckoPriceFilter;
