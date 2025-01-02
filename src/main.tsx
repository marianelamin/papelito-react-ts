import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import './index.css'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'

import { PrimeReactProvider } from 'primereact/api'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
)
