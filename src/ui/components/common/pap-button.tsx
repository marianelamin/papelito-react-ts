import { Button } from 'primereact/button'
import { CSSProperties } from 'react'

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
  style?: CSSProperties
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

  const tooltip1 = tooltip ?? label ?? ''
  return (
    <Button
      icon={icon}
      label={label}
      onClick={onClick}
      className={className}
      style={style}
      disabled={disabled}
      iconPos={iconPos}
      tooltip={tooltip1}
      tooltipOptions={{ position: 'top' }}
    />
  )
}
