import { Knob } from 'primereact/knob'

export const PapReactiveKnob = (props: {
  label: string
  total: number
  value: number
}) => {
  const { total, value, label } = props

  return (
    <>
      <div className="card">
        <div className="grid formgrid text-center"></div>
        <div className="field col-4">
          {value} / {total}
          <p style={{ textAlign: 'center' }}>{label}</p>
          <Knob value={value} max={total} readOnly />
        </div>
      </div>
    </>
  )
}
