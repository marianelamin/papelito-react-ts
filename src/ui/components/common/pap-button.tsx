import { Button, ButtonProps } from 'primereact/button'

interface PapButtonIO {
  id?: string
  loading?: boolean
}

export const PapButton = ({ id, ...props }: PapButtonIO & ButtonProps) => (
  <Button
    {...props}
    iconPos={props.iconPos ?? 'right'}
    tooltip={props.tooltip ?? props.label ?? ''}
    tooltipOptions={{ position: 'top' }}
  />
)
