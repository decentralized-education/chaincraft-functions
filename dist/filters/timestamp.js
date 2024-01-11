"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampFilter = void 0;
const moment_1 = __importDefault(require("moment"));
const timestampFilter = async (filter, context) => {
    try {
        console.log('[getTimestampFilter] ', filter);
        const provider = context.multiChainProvider.default();
        const timestamp = (0, moment_1.default)().unix();
        console.log('[getTimestampFilter] timestamp=', timestamp);
        if (filter.condition === 'TIMEAFTER') {
            return timestamp > +filter.value;
        }
        if (filter.condition === 'TIMEBEFORE') {
            return timestamp < +filter.value;
        }
        if (filter.condition === 'EQUAL') {
            return timestamp === +filter.value;
        }
    }
    catch (e) {
        console.log('[filters] getTimestampFilter error ', e);
    }
    return false;
};
exports.timestampFilter = timestampFilter;
