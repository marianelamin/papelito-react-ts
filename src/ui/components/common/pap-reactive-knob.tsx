import { Knob } from 'primereact/knob'

export const PapReactiveKnob = (props: { label: string; total: number; value: number }) => {
  const { total, value, label } = props

  return (
    <div className=" text-center	">
      <span>{`${label}`}</span>
      <small>
        {' '}
        [{value}/{total}]
      </small>
      <Knob value={value} max={total} readOnly />
    </div>
  )
}
