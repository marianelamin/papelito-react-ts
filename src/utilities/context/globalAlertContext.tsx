import { Toast } from 'primereact/toast'
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
} from 'react'
import { PapToast } from 'ui/components/common'

interface AlertConfig {
  title: string
  text: string
}

interface AlertParams {
  enqueueInfoAlert: (alertconfig: AlertConfig) => void
  enqueueWarningAlert: (alertconfig: AlertConfig) => void
  enqueueSuccessAlert: (alertconfig: AlertConfig) => void
  enqueueErrorAlert: (alertconfig: AlertConfig) => void
}

export const AlertContext = createContext<AlertParams | undefined>(undefined)
AlertContext.displayName = 'AlertContext'

// Context Provider hook

export function useAlert(): AlertParams {
  const context = useContext(AlertContext)
  if (!context)
    throw new Error('useAlert debe ser usado dentro de AlertContextProvider')

  return context
}

// Context Provider

export const AlertContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const toast = useRef<Toast>(null)

  const enqueueInfoAlert = useCallback(
    (alertconfig: AlertConfig) => {
      toast.current?.show({
        severity: 'info',
        summary: alertconfig.title,
        detail: alertconfig.text,
      })
    },
    [toast.current]
  )

  const enqueueSuccessAlert = useCallback(
    (alertconfig: AlertConfig) => {
      toast.current?.show({
        severity: 'success',
        summary: alertconfig.title,
        detail: alertconfig.text,
      })
    },
    [toast.current]
  )
  const enqueueWarningAlert = useCallback(
    (alertconfig: AlertConfig) => {
      toast.current?.show({
        severity: 'warn',
        summary: alertconfig.title,
        detail: alertconfig.text,
      })
    },
    [toast.current]
  )
  const enqueueErrorAlert = useCallback(
    (alertconfig: AlertConfig) => {
      toast.current?.show({
        severity: 'error',
        summary: alertconfig.title,
        detail: alertconfig.text,
      })
    },
    [toast.current]
  )

  return (
    <AlertContext.Provider
      value={{
        enqueueErrorAlert,
        enqueueInfoAlert,
        enqueueSuccessAlert,
        enqueueWarningAlert,
      }}
    >
      {children}
      <PapToast toast={toast} />
    </AlertContext.Provider>
  )
}
