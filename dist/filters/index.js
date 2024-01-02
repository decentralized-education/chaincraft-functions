"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFilter = exports.checkFilterGroup = exports.checkFilters = void 0;
const blocknumber_1 = require("./blocknumber");
const gasprice_1 = require("./gasprice");
const timestamp_1 = require("./timestamp");
const newsapi_1 = require("./newsapi");
async function checkFilters(filtersGroups, context) {
    console.log('[checkFilters] filtersGroups ', filtersGroups);
    for (const filterGroup of filtersGroups) {
        // console.log("checkFilters: filterGroup ",filterGroup)
        const result = await checkFilterGroup(filterGroup, context);
        if (result) {
            console.log('checkFilters true');
            return true;
        }
    }
    console.log('[checkFilters] false');
    return false;
}
exports.checkFilters = checkFilters;
async function checkFilterGroup(filters, context) {
    for (const filter of filters) {
        const result = await checkFilter(filter, context);
        if (!result) {
            return false;
        }
    }
    return true;
}
exports.checkFilterGroup = checkFilterGroup;
async function checkFilter(filter, context) {
    console.log('[checkFilter] ', filter);
    if (filter.id === 'GASPRICE') {
        return await (0, gasprice_1.gasPriceFilter)(filter, context);
    }
    if (filter.id === 'BLOCKNUMBER') {
        return await (0, blocknumber_1.blockNumberFilter)(filter, context);
    }
    if (filter.id === 'TIMESTAMP') {
        return await (0, timestamp_1.timestampFilter)(filter, context);
    }
    if (filter.id === 'NEWSAPI') {
        return await (0, newsapi_1.newsApiFilter)(filter, context);
    }
    return false;
}
exports.checkFilter = checkFilter;
