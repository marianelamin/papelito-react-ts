import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import { CSSProperties, useState, ReactNode } from 'react'
import { PapButton } from '.'

export const PapSideBar = (props: {
  icon?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  btnStyle?: CSSProperties
  btnLabel?: string
  children?: ReactNode
}) => {
  const {
    children,
    icon = 'pi-arrow-right',
    btnStyle,
    btnLabel = '',
    position = 'left',
  } = props

  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position={position}
      >
        <div style={{ padding: '1rem' }}>{children}</div>
      </Sidebar>

      <PapButton
        icon={`pi ${icon}`}
        style={btnStyle}
        onClick={() => setVisible(true)}
        label={btnLabel}
      ></PapButton>
    </>
  )
}
