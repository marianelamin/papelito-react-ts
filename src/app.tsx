import './App.css'
import { RouterProvider } from 'react-router-dom'
import { AlertContextProvider, GlobalDialogContextProvider } from './utilities/context'
import { Provider } from 'react-redux'
import store from './store-redux/store'
import { router } from './routes'

export function App() {
  return (
    <Provider store={store}>
      <AlertContextProvider>
        <GlobalDialogContextProvider>
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true
            }}
          />
        </GlobalDialogContextProvider>
      </AlertContextProvider>
    </Provider>
  )
}
