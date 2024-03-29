import { Sidebar } from 'primereact/sidebar'
import { type CSSProperties, useState, type ReactNode } from 'react'
import { PapButton } from '.'

export const PapSideBar = (props: {
  tooltip?: string
  icon?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  btnStyle?: CSSProperties
  btnLabel?: string
  children?: ReactNode
}) => {
  const {
    tooltip,
    children,
    icon = 'pi-arrow-right',
    btnStyle,
    btnLabel = '',
    position = 'left'
  } = props

  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>
      <Sidebar
        visible={visible}
        onHide={() => {
          setVisible(false)
        }}
        position={position}
      >
        <div className="p-1">{children}</div>
      </Sidebar>

      <PapButton
        icon={`pi ${icon}`}
        style={btnStyle}
        onClick={() => {
          setVisible(true)
        }}
        label={btnLabel}
        tooltip={tooltip}
      ></PapButton>
    </>
  )
}
