import { InputText } from 'primereact/inputtext'
import { ChangeEventHandler, KeyboardEventHandler } from 'react'

interface PapInputTextIO {
  id: string
  label?: string
  value: string
  onValueChange: ChangeEventHandler<HTMLInputElement> | undefined
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined
}

export const PapInputText = (props: PapInputTextIO) => {
  const { id, value, label, onValueChange, onKeyDown } = props
  return (
    <div className="p-float-label">
      <InputText
        id={id}
        type="text"
        value={value}
        onChange={onValueChange}
        onKeyDown={onKeyDown}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
