// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import 'normalize.css/normalize.css'
import '@blueprintjs/core/dist/blueprint.css'
import '@blueprintjs/datetime/dist/blueprint-datetime.css'
import Mobx from "mobx"

require('dotenv').config()

Mobx.useStrict(true)

localStorage.debug = ''

ReactDOM.render(<App/>, document.getElementById('root'))
registerServiceWorker()
