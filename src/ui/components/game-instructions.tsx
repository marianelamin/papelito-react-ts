import { useUser } from '../../modules/core/user/context'

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
              <p>You are an admin.</p>
              <p>
                Open the Room drawer to update room settings. Similarly with Players to make more
                player admin.
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
          {player?.isAdmin ? (
            <li>
              <p>Start the Game</p>
            </li>
          ) : null}
        </ol>
      </div>
    </div>
  )
}
