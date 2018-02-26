import {Balance} from "../Balance/Balance"

type PortfolioSnapshot = {
 balances: { [key: string ]: Balance },
 order_id: string,
 market_name: string,
 strategy_run_id: string,
}

export type {
 PortfolioSnapshot
}
