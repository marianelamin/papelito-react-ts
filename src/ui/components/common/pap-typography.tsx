import { ReactNode } from 'react'

interface PapTypographyIO {
  children: string
}

export const PapTypography = ({ children }: PapTypographyIO): ReactNode => {
  return <p className="font-italic border-round">{children}</p>
}
