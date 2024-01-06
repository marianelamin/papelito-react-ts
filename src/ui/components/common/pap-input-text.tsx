import { InputText } from 'primereact/inputtext'
import { type ChangeEventHandler, type KeyboardEventHandler } from 'react'

interface PapInputTextIO {
  id: string
  label?: string
  value: string
  disabled?: boolean
  onValueChange: ChangeEventHandler<HTMLInputElement> | undefined
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined
}

export const PapInputText = ({
  id,
  disabled = false,
  value,
  label,
  onValueChange,
  onKeyDown
}: PapInputTextIO) => {
  return (
    <div className="p-float-label">
      <InputText
        id={id}
        type="text"
        value={value}
        onChange={onValueChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
