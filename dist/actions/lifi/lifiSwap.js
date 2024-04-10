"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lifiSwap = void 0;
const estimate_1 = __importDefault(require("./estimate"));
const swap_1 = __importDefault(require("./swap"));
exports.lifiSwap = {
    estimate: async (action, context) => {
        console.log('[lifiSwap - estimate] ', action);
        return (0, estimate_1.default)(context, action);
    },
    swap: async (action, context, estimation) => {
        console.log('[lifiSwap - swap] ', action);
        return (0, swap_1.default)(context, action, estimation);
    },
};
