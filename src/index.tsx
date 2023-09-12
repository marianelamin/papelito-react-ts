import React, { StrictMode } from 'react'
import { unregister, register } from 'core'
import reportWebVitals from 'reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// theme and core
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.min.css' //core css
import 'primereact/resources/themes/lara-light-indigo/theme.css'
// import 'primereact/resources/themes/lara-dark-indigo/theme.css'
import { PrimeReactProvider } from 'primereact/api'

// dialogs and alert
import { AlertContextProvider } from 'utilities/context/globalAlertContext'
import { GlobalDialogContextProvider } from 'utilities/context/globalDialogContext'

import store from './+redux/store'
import AppRoutes from './ui/routes'

import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PrimeReactProvider>
          <AlertContextProvider>
            <GlobalDialogContextProvider>
              <AppRoutes />
            </GlobalDialogContextProvider>
          </AlertContextProvider>
        </PrimeReactProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

unregister()
