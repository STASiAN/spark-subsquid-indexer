import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class TradeOrderEvent {
    constructor(props?: Partial<TradeOrderEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    sellOrderId!: string

    @Index_()
    @StringColumn_({nullable: false})
    buyOrderId!: string

    @Index_()
    @StringColumn_({nullable: false})
    txId!: string

    @Index_()
    @StringColumn_({nullable: false})
    orderMatcher!: string

    @Index_()
    @BigIntColumn_({nullable: false})
    tradeSize!: bigint

    @Index_()
    @BigIntColumn_({nullable: false})
    tradePrice!: bigint

    @StringColumn_({nullable: false})
    seller!: string

    @StringColumn_({nullable: false})
    buyer!: string

    @StringColumn_({nullable: false})
    timestamp!: string
}
