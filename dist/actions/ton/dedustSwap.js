"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dedustSwap = void 0;
async function dedustSwap(action, context, options) {
    console.log("[dedustSwap] ", action);
    try {
    }
    catch (e) {
        console.log("[dedustSwap] error ", e?.response?.data);
    }
    return false;
}
exports.dedustSwap = dedustSwap;
