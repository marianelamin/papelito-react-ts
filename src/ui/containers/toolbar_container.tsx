import { Toolbar } from 'primereact/toolbar'
import { PapelitosComponent } from 'ui/components'
import { PapChart, PapSideBar } from 'ui/components/common'
import { PapGameStats } from 'ui/components/game_stats'

export const ToolbarContainer = (): JSX.Element => {
  return (
    <Toolbar
      left={<h1>Room</h1>}
      right={
        <>
          <PapSideBar
            icon="pi-chart-bar"
            btnLabel="Stats"
            btnStyle={{ marginRight: '1rem' }}
          >
            <PapGameStats />
          </PapSideBar>

          <PapSideBar icon="pi-user" btnLabel="Papelitos">
            <PapelitosComponent />
          </PapSideBar>
        </>
      }
    ></Toolbar>
  )
}
