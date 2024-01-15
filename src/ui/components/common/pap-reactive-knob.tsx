import { Knob } from 'primereact/knob'

export const PapReactiveKnob = (props: { label: string; total: number; value: number }) => {
  const { total, value, label } = props

  return (
    <div className="card">
      <div className="field col-4">
        <Knob value={value} max={total} readOnly />
        <p>
          {label} - {value} / {total}
        </p>
      </div>
    </div>
  )
}
