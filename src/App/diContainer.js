import {BalanceSocket} from "../Balance/BalanceSocket"
import {BalanceStore} from "../Balance/BalanceStore"
import {AppSocket} from "../Sockets/socket"
import {BalanceOverviewStore} from "../BalanceOverview/BalanceOverviewStore"
import {CandleSocket} from "../Candle/CandleSocket"
import {PairSocket} from "../Pair/PairSocket"
import {CandleStore} from "../Candle/CandleStore"
import {CandleStorageSocket} from "../Candle/Storage/CandleStorageSocket"
import {CandleStorageStore} from "../Candle/Storage/CandleStorageStore"
import {MarketSocket} from "../Market/MarketSocket"
import {MarketStore} from "../Market/MarketStore"
import {OrdersSocket} from "../Orders/OrderSocket"
import {OrderStore} from "../Orders/OrderStore"
import {OrderStorageSocket} from "../Orders/Storage/OrderStorageSocket"
import {OrderStorageStore} from "../Orders/Storage/OrderStorageStore"
import {PairStore} from "../Pair/PairStore"
import {SimulationModeStore} from "../SimulationMode/SimulationModeStore"
import {StrategyRunnerStore} from "../Strategy/StrategyRunnerStore"
import {StrategyStore} from "../Strategy/StrategyStore"
import {FilterStore} from "../TopFilter/FilterStore"
import {StatusIndicatorStore} from "../Sockets/StatusIndicator/StatusIndicatorStore"
import {StrategySocket} from "../Strategy/StrategySocket"
import {Position, Toaster} from "@blueprintjs/core"
import type {FlashMessageHandlerType} from "../FlashMessage/handling"
import {UNIT_MINUTE} from "../Candle/CandleSize/CandleSize"
import {MainChartStore} from "../MainChart/MainChartStore"

const url = process.env.REACT_APP_BACKEND_SOCKET_URL
const socketio = require('socket.io-client')(url)

// Toaster / Flesh Messages
const _appMainToaster = Toaster.create({
  className: "app-main-toaster",
  position: Position.TOP_RIGHT,
  container: document.body
})

const flashMessageHandler: FlashMessageHandlerType = (message: string, type: string) => {
  _appMainToaster.show({message: message, className: type})
}

// Socket
const appSocketInstance = new AppSocket(socketio, flashMessageHandler)
const statusIndicatorStoreInstance = new StatusIndicatorStore(appSocketInstance)

// Balance
const balanceSocketInstance: BalanceSocket = new BalanceSocket(appSocketInstance)
const balanceStoreInstance: BalanceStore = new BalanceStore(balanceSocketInstance)
const balanceOverviewStoreInstance: BalanceOverviewStore = new BalanceOverviewStore()

// Candle
const candleSocketInstance: CandleSocket = new CandleSocket(appSocketInstance)
const candleStoreInstance: CandleStore = new CandleStore(candleSocketInstance)
const mainChartStoreInstance: MainChartStore = new MainChartStore(UNIT_MINUTE, 15)
const candleStorageSocketInstance: CandleStorageSocket = new CandleStorageSocket(appSocketInstance)
const candleStorageStoreInstance: CandleStorageStore = new CandleStorageStore(candleStorageSocketInstance)

// Market
const marketSocketInstance: MarketSocket = new MarketSocket(appSocketInstance)
const marketStoreInstance: MarketStore = new MarketStore(marketSocketInstance)


// Orders
const orderSocketInstance: OrdersSocket = new OrdersSocket(appSocketInstance, flashMessageHandler)
const orderStoreInstance: OrderStore = new OrderStore(orderSocketInstance)
const orderStorageSocketInstance: OrderStorageSocket = new OrderStorageSocket(appSocketInstance)
const orderStorageStoreInstance: OrderStorageStore = new OrderStorageStore(orderStorageSocketInstance)

// Pair
const pairSocketInstance: PairSocket = new PairSocket(appSocketInstance)
const pairStoreInstance: PairStore = new PairStore(pairSocketInstance)

// Simulation Mode
const simulationModeStoreInstance: SimulationModeStore = new SimulationModeStore()

// TopFilter
const filterStoreInstance: FilterStore = new FilterStore()

// Strategy
const strategySocketInstance: StrategySocket = new StrategySocket(appSocketInstance)
const strategyStoreInstance: StrategyStore = new StrategyStore(strategySocketInstance)
const strategyRunnerStoreInstance = new StrategyRunnerStore(
  appSocketInstance,
  filterStoreInstance,
  strategyStoreInstance,
  marketStoreInstance,
  flashMessageHandler
)


export {
  flashMessageHandler,
  appSocketInstance,
  statusIndicatorStoreInstance,
  balanceSocketInstance,
  balanceStoreInstance,
  balanceOverviewStoreInstance,
  candleSocketInstance,
  candleStoreInstance,
  mainChartStoreInstance,
  candleStorageSocketInstance,
  candleStorageStoreInstance,
  marketSocketInstance,
  marketStoreInstance,
  orderSocketInstance,
  orderStoreInstance,
  orderStorageSocketInstance,
  orderStorageStoreInstance,
  pairSocketInstance,
  pairStoreInstance,
  simulationModeStoreInstance,
  filterStoreInstance,
  strategySocketInstance,
  strategyStoreInstance,
  strategyRunnerStoreInstance,
}
