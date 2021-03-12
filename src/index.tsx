import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import { unregister, register } from 'core'
import reportWebVitals from 'reportWebVitals'
import { BrowserRouter } from 'react-router-dom'

import Routes from 'routes'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

unregister()
