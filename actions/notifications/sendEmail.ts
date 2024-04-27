import { Action, Filter, Web3FunctionContext, Web3FunctionResultCallData } from 'chaincraft-types'
import { Contract, ethers } from 'ethers'
import { ActionOptions } from '../../types'
import axios from 'axios'
import { MainClient, WebsocketClient, OrderSide } from 'binance'
import _ from 'lodash'
import moment from 'moment'

import formData from 'form-data'
import Mailgun from 'mailgun.js'

export async function sendEmail(
    action: Action,
    context: Web3FunctionContext,
    options?: ActionOptions
): Promise<Web3FunctionResultCallData | false | true> {
    console.log('[sendEmail] ', action)

    try {
        let domain = await context.secrets.get('mailgun-domain');
        if(!domain){
            domain = process.env.MAILGUN_DOMAIN;
        }
        let apiKey = await context.secrets.get('mailgun-api-key')
        if(!apiKey){
            apiKey = process.env.MAILGUN_API_KEY;
        }
        console.log("[sendEmail] domain ",domain,  process.env.MAILGUN_DOMAIN, apiKey, process.env.MAILGUN_API_KEY)

        const toEmail = _.get(action, 'data.email')

        if(!toEmail){
            console.error("[sendEmail] no email set up")
            return false;
        }

        const mailgun = new Mailgun(formData)
        const mg = mailgun.client({
            username: 'api',
            key: apiKey!,
        })

        const text = _.get(action, 'data.text', `Spell is casted at ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
        const subject = _.get(action, 'data.subject', 'Chaincraft Spell is casted')
        console.log('[sendEmail] sending email to ', toEmail, text)

        await mg.messages
            .create(domain!, {
                from: `Chaincraft <noreply@${domain}>`,
                to: [toEmail],
                subject,
                text
            })
        return true;
    } catch (e: any) {
        console.error('[sendEmail] error ', e)
    }
    return false
}
