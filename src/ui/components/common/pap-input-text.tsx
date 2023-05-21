import { InputText } from 'primereact/inputtext'

interface PapInputTextIO {
  id: string
  label?: string
  value: string
  onValueChange: (v: any) => void
  onKeyDown?: (v: any) => void
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
