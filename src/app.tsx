import './App.css'
import { RouterProvider } from 'react-router-dom'
import { AlertContextProvider, GlobalDialogContextProvider } from './utilities/context'
import { Provider } from 'react-redux'
import store from './store-redux/store'
import { router } from './modules/routes/routes'

function App() {
  return (
    <Provider store={store}>
      <AlertContextProvider>
        <GlobalDialogContextProvider>
          <RouterProvider router={router} />
        </GlobalDialogContextProvider>
      </AlertContextProvider>
    </Provider>
  )
}

export default App
