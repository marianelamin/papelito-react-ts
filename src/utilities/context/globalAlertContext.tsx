import { type Toast } from 'primereact/toast'
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef
} from 'react'
import { PapToast } from '../../ui/components/common'

interface AlertConfig {
  title: string
  text?: string
}

interface AlertParams {
  notifyInfoAlert: (alertconfig: AlertConfig) => void
  notifyWarningAlert: (alertconfig: AlertConfig) => void
  notifySuccessAlert: (alertconfig: AlertConfig) => void
  notifyErrorAlert: (alertconfig: AlertConfig) => void
}

export const AlertContext = createContext<AlertParams | undefined>(undefined)
AlertContext.displayName = 'AlertContext'

export function useAlert(): AlertParams {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert debe ser usado dentro de AlertContextProvider')
  }
  return context
}

export const AlertContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const toast = useRef<Toast>(null)

  const enqueueInfoAlert = useCallback((alertconfig: AlertConfig) => {
    toast.current?.show({
      severity: 'info',
      summary: alertconfig.title,
      detail: alertconfig.text
    })
  }, [])
  const enqueueSuccessAlert = useCallback((alertconfig: AlertConfig) => {
    toast.current?.show({
      severity: 'success',
      summary: alertconfig.title,
      detail: alertconfig.text
    })
  }, [])
  const enqueueWarningAlert = useCallback((alertconfig: AlertConfig) => {
    toast.current?.show({
      severity: 'warn',
      summary: alertconfig.title,
      detail: alertconfig.text
    })
  }, [])
  const enqueueErrorAlert = useCallback((alertconfig: AlertConfig) => {
    toast.current?.show({
      severity: 'error',
      summary: alertconfig.title,
      detail: alertconfig.text
    })
  }, [])

  return (
    <AlertContext.Provider
      value={{
        notifyErrorAlert: enqueueErrorAlert,
        notifyInfoAlert: enqueueInfoAlert,
        notifySuccessAlert: enqueueSuccessAlert,
        notifyWarningAlert: enqueueWarningAlert
      }}
    >
      {children}
      <PapToast toast={toast} />
    </AlertContext.Provider>
  )
}
