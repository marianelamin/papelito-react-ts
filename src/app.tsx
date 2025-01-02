import './App.css'
import { BrowserRouter } from 'react-router'
import { AlertContextProvider, GlobalDialogContextProvider } from './utilities/context'
import { Provider } from 'react-redux'
import store from './store-redux/store'
import { PapelitoRoutes } from './routes'

export function App() {
  return (
    <Provider store={store}>
      <AlertContextProvider>
        <BrowserRouter>
          <GlobalDialogContextProvider>
            <PapelitoRoutes />
          </GlobalDialogContextProvider>
        </BrowserRouter>
      </AlertContextProvider>
    </Provider>
  )
}
