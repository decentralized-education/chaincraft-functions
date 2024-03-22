// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.sendTelegramMessage = void 0;
// const lodash_1 = __importDefault(require("lodash"));
// const moment_1 = __importDefault(require("moment"));
// const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
// async function sendTelegramMessage(action, context, options) {
//     console.log('[sendTelegram] ', action);
//     try {
//         let token = await context.secrets.get('telegram-bot-token');
//         if (!token) {
//             console.log('[sendTelegram] no token set up');
//             return false;
//         }
//         const bot = new node_telegram_bot_api_1.default(token, { polling: true });
//         const chatId = lodash_1.default.get(action, 'data.chatId');
//         console.log("[sendTelegram] chatId ", chatId);
//         const text = lodash_1.default.get(action, 'data.text', `Spell is casted at ${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`);
//         console.log('[sendTelegram] sendTelegram ', text);
//         bot.sendMessage(chatId, text);
//         return true;
//     }
//     catch (e) {
//         console.error('[sendTelegram] error ', e);
//     }
//     return false;
// }
// exports.sendTelegramMessage = sendTelegramMessage;
