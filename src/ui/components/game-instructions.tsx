import { NavLink } from 'react-router-dom'
import { ROOM_SETUP_PATH } from '../../modules/room/routes'
import { useUser } from '../../utilities/context'

export const Instructions = (): JSX.Element => {
  const { player } = useUser()
  return (
    <div className={'col-12'}>
      <div>
        <h3 className="text-center m-0">Instructions</h3>
      </div>
      <div className={'grid p-3 gap-3'}>
        <ol>
          {player?.isAdmin ? (
            <li>
              <p>
                Since you are an admin, you can setup the game to your liking.{' '}
                <NavLink to={ROOM_SETUP_PATH}>Setup Room</NavLink>
              </p>
            </li>
          ) : null}
          <li>
            {' '}
            <p> Write papelitos</p>
          </li>
          <li>
            <p>Submit to bowl</p>
          </li>
          <li>
            <p>Wait for your peers to do the same</p>
          </li>
        </ol>
      </div>
    </div>
  )
}
