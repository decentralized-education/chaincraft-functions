"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
const form_data_1 = __importDefault(require("form-data"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
async function sendEmail(action, context, options) {
    console.log('[sendEmail] ', action);
    try {
        let domain = await context.secrets.get('mailgun-domain');
        if (!domain) {
            domain = process.env.MAILGUN_DOMAIN;
        }
        let apiKey = await context.secrets.get('mailgun-api-key');
        if (!apiKey) {
            apiKey = process.env.MAILGUN_API_KEY;
        }
        console.log("[sendEmail] domain ", domain, process.env.MAILGUN_DOMAIN, apiKey, process.env.MAILGUN_API_KEY);
        const toEmail = lodash_1.default.get(action, 'data.email');
        if (!toEmail) {
            console.error("[sendEmail] no email set up");
            return false;
        }
        const mailgun = new mailgun_js_1.default(form_data_1.default);
        const mg = mailgun.client({
            username: 'api',
            key: apiKey,
        });
        const text = lodash_1.default.get(action, 'data.text', `Spell is casted at ${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`);
        console.log('[sendEmail] sending email to ', toEmail, text);
        await mg.messages
            .create(domain, {
            from: `Chaincraft <noreply@${domain}>`,
            to: [toEmail],
            subject: 'Chaincraft Spell is casted',
            text
        });
        return true;
    }
    catch (e) {
        console.error('[sendEmail] error ', e);
    }
    return false;
}
exports.sendEmail = sendEmail;
