import { type MenuItem } from 'primereact/menuitem'
import { Tooltip } from 'primereact/tooltip'
import { SpeedDial, type SpeedDialProps } from 'primereact/speeddial'
import { type CSSProperties } from 'react'

export const PapSpeedDial = (props: {
  items: MenuItem[]
  showIcon?: string
  buttonClassName?: string
  type?: SpeedDialProps['type']
  radius?: SpeedDialProps['radius']
  style?: CSSProperties
  direction?: SpeedDialProps['direction']
}) => {
  const {
    items,
    showIcon = 'pi pi-cog',
    direction = 'down',
    style,
    type,
    radius,
    buttonClassName
  } = props

  return (
    <>
      <Tooltip target=".speeddial-right .p-speeddial-action" position="left" />

      <SpeedDial
        style={style}
        showIcon={showIcon}
        type={type}
        radius={radius}
        model={items}
        direction={direction}
        className="speeddial-right right-0"
      ></SpeedDial>
    </>
  )
}
