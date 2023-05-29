import { Tooltip, TooltipProps } from 'primereact/tooltip'

export const PapTooltip = (props: {
  target: TooltipProps['target']
  position: TooltipProps['position']
}) => <Tooltip target={props.target} position={props.position} />

export default PapTooltip
