import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AlertContextProvider, GlobalDialogContextProvider } from './utilities/context'
import AppRoutes from './ui/routes/index'
import { Provider } from 'react-redux'
import store from './store-redux/store'

function App() {
  return (
    <Provider store={store}>
      <AlertContextProvider>
        <BrowserRouter>
          <GlobalDialogContextProvider>
            <AppRoutes />
          </GlobalDialogContextProvider>
        </BrowserRouter>
      </AlertContextProvider>
    </Provider>
  )
}

export default App
