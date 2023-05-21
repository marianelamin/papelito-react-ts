import { Card, CardTemplateTypes } from 'primereact/card'

type PapCardTemplateTypes =
  | React.ReactNode
  | ((props: PapCardIO) => React.ReactNode)

interface PapCardIO {
  header?: PapCardTemplateTypes
  footer?: PapCardTemplateTypes
  title?: PapCardTemplateTypes
  subTitle?: PapCardTemplateTypes
  children?: React.ReactNode
}

const PapCard = (props: PapCardIO) => {
  const { title, subTitle, footer, header, children } = props
  return (
    <Card title={title} subTitle={subTitle} footer={footer} header={header}>
      {children}
    </Card>
  )
}

export { PapCard }
