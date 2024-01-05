import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import { AlertContextProvider, GlobalDialogContextProvider } from './utilities/context'
import AppRoutes from './ui/routes/index'
import { Provider } from 'react-redux'
import store from './store-redux/store'

function App() {
  // const [count, setCount] = useState(0)

  return (
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
  )
}

export default App
