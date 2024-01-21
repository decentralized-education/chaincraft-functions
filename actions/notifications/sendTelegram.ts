import {
    Web3Function,
    Web3FunctionContext,
    Web3FunctionResultCallData,
} from '@gelatonetwork/web3-functions-sdk'
import { Action, Filter } from 'chaincraft-types'
import { Contract, ethers } from 'ethers'
import { ActionOptions } from '../../types'
import axios from 'axios'
import { MainClient, WebsocketClient, OrderSide } from 'binance'
import _ from 'lodash'
import moment from 'moment'
import TelegramBot from 'node-telegram-bot-api';

export async function sendTelegram(
    action: Action,
    context: Web3FunctionContext,
    options?: ActionOptions
): Promise<Web3FunctionResultCallData | false | true> {
    console.log('[sendTelegram] ', action)

    try {
        let token = await context.secrets.get('telegram-bot-token');
        if(!token){
            console.log('[sendTelegram] no token set up')
            return false;
        }
        const bot = new TelegramBot(token, {polling: true});

        const chatId = _.get(action, 'data.chatId')
        console.log("[sendTelegram] chatId ",chatId)

        const text = _.get(action, 'data.text', `Spell is casted at ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
        console.log('[sendTelegram] sendTelegram ', text)

        bot.sendMessage(chatId, 'Received your message');

        return true;
    } catch (e: any) {
        console.error('[sendTelegram] error ', e)
    }
    return false
}
