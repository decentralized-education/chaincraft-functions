"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swap = async (context, action, estimation) => {
    if (!estimation) {
        const _estimation = await context.storage.get('estimation');
        if (!_estimation) {
            return false;
        }
        const pEst = JSON.parse(_estimation);
        return {
            to: pEst.tx.to,
            data: pEst.tx.data,
            value: pEst.tx.value,
        };
    }
    return {
        to: estimation.tx.to,
        data: estimation.tx.data,
        value: estimation.tx.value,
    };
};
exports.default = swap;
