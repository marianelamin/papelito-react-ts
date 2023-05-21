import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '+redux/store'

/** @todo: determine if:
 * - user is leaving tab
 * - closing the tab
 * - returning to the tab
 *
 */

export const useActiveUser = () => {
  const appDispatch = useAppDispatch()

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

  const alertUser = (e: any) => {
    // if (!) {
    //   return;
    // }
    e.preventDefault()
    e.returnValue = true
    console.log('trying to leave...', e)
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
