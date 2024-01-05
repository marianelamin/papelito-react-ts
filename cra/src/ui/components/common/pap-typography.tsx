interface PapTypographyIO {
  children: string
}

export const PapTypography = ({ children }: PapTypographyIO): JSX.Element => {
  return <p className="font-italic border-round">{children}</p>
}
