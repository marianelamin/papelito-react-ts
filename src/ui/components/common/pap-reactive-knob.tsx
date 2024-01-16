import { Knob } from 'primereact/knob'

export const PapReactiveKnob = (props: { label: string; total: number; value: number }) => {
  const { total, value, label } = props

  return (
    <div className="flex-auto card ">
      <span>{`${label} - ${value}/${total}`}</span>
      <Knob value={value} max={total} readOnly />
    </div>
  )
}
