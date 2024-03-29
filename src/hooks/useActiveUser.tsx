import { useEffect } from 'react'

// import { useAppDispatch } from '../store-redux/store'

/** @todo: determine if:
 * - user is leaving tab
 * - closing the tab
 * - returning to the tab
 *
 */

export const useActiveUser = () => {
  // const appDispatch = useAppDispatch()

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
      //   appDispatch(
      //     removePlayerById({
      //       roomId: PapelitoLocalStorage.getRoomId() ?? '',
      //       playerId: PapelitoLocalStorage.getPlayerId() ?? '',
      //     })
      //   )
    }
  }, [])

  const alertUser = (event: Event) => {
    // if (!) {
    //   return;
    // }
    event.preventDefault()
    event.returnValue = true
    console.log('trying to leave...', event)
    // await appDispatch(
    //   removePlayerById({
    //     roomId: PapelitoLocalStorage.getRoomId() ?? '',
    //     playerId: PapelitoLocalStorage.getPlayerId() ?? '',
    //   })
    // )

    return false
  }
  return {}
}
