import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './index.css'

// theme and core
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.min.css' // core css
import 'primereact/resources/themes/lara-light-indigo/theme.css'
// import 'primereact/resources/themes/lara-dark-indigo/theme.css'
// import 'primereact/resources/themes/lara-light-cyan/theme.css'

import { PrimeReactProvider } from 'primereact/api'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
)
