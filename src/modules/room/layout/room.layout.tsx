import { ReactNode } from 'react'
import styles from './room.layout.module.css'

interface RoomLayoutProps {
  children: ReactNode
}
const RoomLayout = ({ children }: RoomLayoutProps) => {
  return <div className={styles['container']}>{children}</div>
}

export default RoomLayout
