"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsApiFilter = void 0;
const ky_1 = __importDefault(require("ky"));
const moment_1 = __importDefault(require("moment"));
const newsApiFilter = async (filter, context) => {
    try {
        console.log("[filters] newsApiFilter ", filter);
        const query = filter.value;
        const date = (0, moment_1.default)().format('YYYY-MM-DD');
        const apiKey = context.secrets.get("news-api-key");
        console.log("[filters] newsApiFilter apiKey ", apiKey);
        const response = await ky_1.default.get(`https://newsapi.org/v2/everything?q=${query}&from=${date}&sortBy=popularity&apiKey=${apiKey}`).json();
        console.log("[filters] newsApiFilter response ", response);
    }
    catch (e) {
        console.log('[filters] newsApiFilter error ', e);
    }
    return false;
};
exports.newsApiFilter = newsApiFilter;
