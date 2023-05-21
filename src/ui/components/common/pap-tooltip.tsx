import { TooltipTargetType } from 'primereact/tooltip'
import { Tooltip } from 'primereact/tooltip'
import { TooltipPositionType } from 'primereact/tooltip/tooltipoptions'

export const PapTooltip = (props: {
  target: TooltipTargetType
  position: TooltipPositionType
}) => <Tooltip target={props.target} position={props.position} />

export default PapTooltip
