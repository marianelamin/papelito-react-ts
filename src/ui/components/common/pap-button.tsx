import { Button } from 'primereact/button'

type PapButtonPositionType = 'top' | 'bottom' | 'left' | 'right'

interface PapButtonIO {
  onClick: (v: any) => void
  id?: string
  label?: string
  tooltip?: string
  icon?: string
  iconPos?: PapButtonPositionType
  loading?: boolean
  className?: any
  style?: any
  disabled?: boolean
}

export const PapButton = (props: PapButtonIO) => {
  const {
    id,
    tooltip,
    label,
    icon,
    onClick,
    className,
    style,
    disabled = false,
    iconPos = 'right',
  } = props

  /** @todo: add tooltip funcitonality */
  const tooltip1 = tooltip || label || 'hhh'
  return (
    <Button
      icon={icon}
      label={label}
      onClick={onClick}
      className={className}
      style={style}
      disabled={disabled}
      tooltip={tooltip1}
      tooltipOptions={{ position: 'top' }}
    />
  )
}
