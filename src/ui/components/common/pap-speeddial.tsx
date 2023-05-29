import { MenuItem } from 'primereact/menuitem'
import { Tooltip } from 'primereact/tooltip'
import { SpeedDial, SpeedDialProps } from 'primereact/speeddial'

export const PapSpeedDial = (props: {
  items: MenuItem[]
  showIcon?: string
  direction?: SpeedDialProps['direction']
}) => {
  const { items, showIcon = 'pi pi-cog', direction = 'down' } = props

  return (
    <>
      <Tooltip target=".speeddial-right .p-speeddial-action" position="left" />

      <SpeedDial
        showIcon={showIcon}
        model={items}
        direction={direction}
        className="speeddial-right right-0"
      ></SpeedDial>
    </>
  )
}
