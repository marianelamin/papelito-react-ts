import react from 'react'
import { ActionButtonContainer } from 'ui/styles'

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
            <ActionButtonContainer>
              <div style={{ padding: '0 1rem' }}>{item.renderName}</div>
              {props.actionItems.map((action, index) => (
                <button
                  key={index}
                  onClick={() => action.onClickHandler(item.item)}
                >
                  {action.actionLabel}
                </button>
              ))}
            </ActionButtonContainer>
          </li>
        ))}
      </ol>
    </div>
  )
}
