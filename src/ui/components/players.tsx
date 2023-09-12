import { Player, defaultPlayer } from 'papelito-models'
import { DataView } from './common'
import { usePlayer } from 'hooks'

export const Players = (): JSX.Element => {
  const { currentPlayer } = usePlayer()

  // todo: get this from a hook
  const players = [
    currentPlayer!,
    { ...defaultPlayer, id: 'test1', name: 'test1' },
    { ...defaultPlayer, id: 'test2', name: 'test2' },
  ].filter((p) => p != undefined)

  const playerTemplate = (item: Player) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
          <i
            className="pi pi-circle-fill"
            style={{ color: item.hasSubmittedPapelitos ? 'teal' : 'tomato' }}
          ></i>
          <span className="font-bold">{item.name}</span>
          <i className="pi pi-wifi" style={{ color: 'green' }}></i>
        </div>
        <span className="font-bold text-900">order: #{item.order}</span>
        <div className="flex align-items-center gap-2">
          <i className="pi pi-tag text-sm"></i>
          <span>team: {item.teamId}</span>
        </div>
        <span>submitted: {item.hasSubmittedPapelitos ? 'yes' : 'no'}</span>
      </div>
    )
  }

  return (
    <DataView value={players} itemTemplate={playerTemplate} header="Players" />
  )
}
