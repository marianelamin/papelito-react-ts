import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import React from 'react'
import { PapButton } from '.'

interface PapDialogIO {
  /** @todo: add style prop */
  headerLabel: string
  visible: boolean
  primaryButtonLabel: string
  onPrimaryButton: (input: any) => any
  onVisibleChange: (value: boolean) => any
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
    children,
  } = props
  return (
    <Dialog
      header={headerLabel.toUpperCase()}
      visible={visible}
      draggable={draggable}
      closeOnEscape={closeOnEscape}
      closable={closable}
      style={{ width: '' }}
      onHide={
        onHideDialog ??
        (() => {
          console.log('Closing dialog')
          onVisibleChange(false)
        })
      }
      footer={
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
          }}
        >
          <div>
            <PapButton
              label={primaryButtonLabel}
              loading={primaryButtonLoading}
              className={showPrimaryButtonError ? 'p-button-danger' : ''}
              disabled={primaryButtonDisabled}
              onClick={onPrimaryButton}
            ></PapButton>
            <br />
            {showPrimaryButtonError
              ? showPrimaryButtonErrorText ?? (
                  <small className="p-error">There was an error</small>
                )
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
          ) : (
            ''
          )}{' '}
        </div>
      }
    >
      <div style={{ padding: '1rem' }}>{children}</div>
    </Dialog>
  )
}
