"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveTemplate = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
function recursiveTemplate(obj, data) {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            obj[key] = recursiveTemplate(obj[key], data);
        }
        else {
            const compiledTemplate = handlebars_1.default.compile(obj[key]);
            obj[key] = compiledTemplate(data);
        }
    }
    return obj;
}
exports.recursiveTemplate = recursiveTemplate;
