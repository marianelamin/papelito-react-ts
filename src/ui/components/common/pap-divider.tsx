import { Divider } from 'primereact/divider'

export const PapDivider = (props: { text: string; layout?: 'vertical' | 'horizontal' }) => (
  <Divider layout={props.layout ?? 'vertical'}>{props.text}</Divider>
)

export default PapDivider
