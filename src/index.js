// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import 'normalize.css/normalize.css'
import '@blueprintjs/core/dist/blueprint.css'
import '@blueprintjs/datetime/dist/blueprint-datetime.css'
import '@blueprintjs/table/dist/table.css'
import './Form/Select/select.css'
import './Form/form.css'
import {useStrict} from "mobx"
import App from "./App/App"

require('dotenv').config()

useStrict(true)

localStorage.debug = ''

ReactDOM.render(<App/>, document.getElementById('root'))
registerServiceWorker()
