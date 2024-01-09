import { ReactNode } from 'react'
import styles from './home.layout.module.css'

interface HomeLayoutProps {
  children: ReactNode
}
const HomeLayout = ({ children }: HomeLayoutProps) => {
  return <div className={styles['container']}>{children}</div>
}

export default HomeLayout
