import react from 'react'
// import { ActionButtonContainer } from 'ui/styles'

interface ActionItem {
  onClickHandler: Function
  actionLabel: string
}

interface ActionListComponentIO {
  listItems: { renderName: string; item: any }[]
  actionItems: ActionItem[]
}

export const ActionListComponent = (props: ActionListComponentIO) => {
  return (
    <div>
      <ol>
        {props.listItems.map((item, index) => (
          <li key={index}>
            <div style={{ display: 'flex' }}>
              <div style={{ padding: '0 1rem' }}>{item.renderName}</div>
              {props.actionItems.map((action, index) => (
                <button
                  key={index}
                  onClick={() => action.onClickHandler(item.item)}
                >
                  {action.actionLabel}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
