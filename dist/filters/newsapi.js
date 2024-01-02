"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsApiFilter = void 0;
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const newsApiFilter = async (filter, context) => {
    try {
        console.log('[filters] newsApiFilter ', filter);
        const query = filter.value;
        const date = (0, moment_1.default)().add(-1, 'days').format('YYYY-MM-DD');
        const apiKey = await context.secrets.get('news-api-key');
        console.log("[filters] newsApiFilter query ", query);
        const url = `https://newsapi.org/v2/everything?q=${query}&from=${date}&sortBy=popularity&apiKey=${apiKey}`;
        const { data } = await axios_1.default.get(url);
        console.log('[filters] newsApiFilter response ', data);
        if (data.status == 'ok' && data.totalResults > 0) {
            return true;
        }
    }
    catch (e) {
        console.log('[filters] newsApiFilter error ', e);
    }
    return false;
};
exports.newsApiFilter = newsApiFilter;
