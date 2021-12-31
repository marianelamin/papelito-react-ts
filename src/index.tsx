import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { unregister, register } from 'core'
import reportWebVitals from 'reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './+redux/store'

import { Suspense } from 'react'
import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import lazyViews from './routes/lazy_views'

import AppRoutes from './routes'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

unregister()
