import { run } from '@subsquid/batch-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { OrderbookAbi__factory } from './abi'
import {
    TradeOrderEventOutput,
    OpenOrderEventOutput,
    CancelOrderEventOutput,
    DepositEventOutput,
    WithdrawEventOutput,
} from './abi/OrderbookAbi'
import isEvent from './isEvent'
import { dataSource, processBlocks } from './dataSource'
import { handleOpenOrderEvent } from './openOrderEventHandler'
import { handleTradeOrderEvent } from './tradeOrderEventHandler'
import { handleCancelOrderEvent } from './cancelOrderEventHandler'
import { handleDepositEvent } from './depositEventHandler'
import { handleWithdrawEvent } from './withdrawEventHandler'


const database = new TypeormDatabase()

run(dataSource, database, async (ctx) => {

    const {
        receipts,
        logs,
        balances,
        orders,
        activeBuyOrders,
        activeSellOrders,
        tradeOrderEvents,
        openOrderEvents,
        cancelOrderEvents,
        depositEvents,
        withdrawEvents,
    } = await processBlocks(ctx);

    for (let idx = 0; idx < logs.length; idx++) {
        let log = logs[idx];
        let receipt = receipts[idx];

        if (isEvent<OpenOrderEventOutput>('OpenOrderEvent', log, OrderbookAbi__factory.abi)) {
            await handleOpenOrderEvent(log, receipt, openOrderEvents, orders, activeBuyOrders, activeSellOrders, balances, ctx);
        } else if (isEvent<TradeOrderEventOutput>('TradeOrderEvent', log, OrderbookAbi__factory.abi)) {
            await handleTradeOrderEvent(log, receipt, tradeOrderEvents, orders, activeBuyOrders, activeSellOrders, balances, ctx);
        } else if (isEvent<CancelOrderEventOutput>('CancelOrderEvent', log, OrderbookAbi__factory.abi)) {
            await handleCancelOrderEvent(log, receipt, cancelOrderEvents, orders, activeBuyOrders, activeSellOrders, balances, ctx);
        } else if (isEvent<DepositEventOutput>('DepositEvent', log, OrderbookAbi__factory.abi)) {
            await handleDepositEvent(log, receipt, depositEvents, balances, ctx);
        } else if (isEvent<WithdrawEventOutput>('WithdrawEvent', log, OrderbookAbi__factory.abi)) {
            await handleWithdrawEvent(log, receipt, withdrawEvents, balances, ctx);
        }
    }


    await ctx.store.upsert([...balances.values()])
    await ctx.store.upsert([...orders.values()])
    await ctx.store.upsert([...activeBuyOrders.values()])
    await ctx.store.upsert([...activeSellOrders.values()])
    await ctx.store.save([...tradeOrderEvents.values()])
    await ctx.store.save([...openOrderEvents.values()])
    await ctx.store.save([...cancelOrderEvents.values()])
    await ctx.store.save([...depositEvents.values()])
    await ctx.store.save([...withdrawEvents.values()])
})