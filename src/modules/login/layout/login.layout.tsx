import { ReactNode } from 'react'
import styles from './login.layout.module.css'

interface LoginLayoutProps {
  children: ReactNode
}
const LoginLayout = ({ children }: LoginLayoutProps) => {
  return <div className={styles['container']}>{children}</div>
}

export default LoginLayout
