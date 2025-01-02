import { Dialog } from 'primereact/dialog'
import React from 'react'
import { PapButton } from '.'

interface PapDialogIO {
  headerLabel: string
  visible: boolean
  onVisibleChange: (value: boolean) => any
  primaryButtonLabel?: string
  onPrimaryButton?: (input: any) => any
  primaryButtonLoading?: boolean
  primaryButtonDisabled?: boolean
  showPrimaryButtonError?: boolean
  showPrimaryButtonErrorText?: string
  secondaryButtonLabel?: string
  secondaryButtonLoading?: boolean
  secondaryButtonDisabled?: boolean
  draggable?: boolean
  closeOnEscape?: boolean
  closable?: boolean
  onSecondaryButton?: (input: any) => any
  onHideDialog?: () => void
  children?: React.ReactNode
}

export const PapDialog = (props: PapDialogIO) => {
  /**
   * TODO: Reported bug about dialog and ref as a prop
   *  https://github.com/primefaces/primereact/issues/7403
   */
  const {
    headerLabel = 'Header',
    visible,
    draggable,
    closeOnEscape,
    closable,
    primaryButtonLabel = 'Save',
    primaryButtonLoading,
    primaryButtonDisabled,
    showPrimaryButtonError,
    showPrimaryButtonErrorText,
    secondaryButtonLabel = 'Cancel',
    secondaryButtonLoading,
    secondaryButtonDisabled,
    onPrimaryButton,
    onSecondaryButton,
    onVisibleChange,
    onHideDialog = () => onVisibleChange(false),
    children
  } = props
  return (
    <Dialog
      header={headerLabel.toUpperCase()}
      visible={visible}
      draggable={draggable}
      closeOnEscape={closeOnEscape}
      closable={closable}
      onHide={onHideDialog}
      footer={
        <div
          style={{
            display: 'flex',
            justifyContent: 'right'
          }}
        >
          <div>
            {onPrimaryButton ? (
              <PapButton
                label={primaryButtonLabel}
                loading={primaryButtonLoading}
                className={showPrimaryButtonError ? 'p-button-danger' : ''}
                disabled={primaryButtonDisabled}
                onClick={onPrimaryButton}
              ></PapButton>
            ) : null}
            <br />
            {showPrimaryButtonError
              ? showPrimaryButtonErrorText ?? <small className="p-error">There was an error</small>
              : ''}
          </div>
          {onSecondaryButton ? (
            <div>
              <PapButton
                label={secondaryButtonLabel}
                iconPos="right"
                loading={secondaryButtonLoading}
                disabled={secondaryButtonDisabled}
                onClick={onSecondaryButton}
              ></PapButton>
            </div>
          ) : null}
        </div>
      }
    >
      <div style={{ padding: '1rem' }}>{children}</div>
    </Dialog>
  )
}
