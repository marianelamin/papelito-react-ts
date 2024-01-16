import { useState } from 'react'

export const useFlags = () => {
  const [enableAdminRoute] = useState(false)
  const [enableRoomSetupRoute] = useState(false)
  const [enableRoomSetupFeature] = useState(false)

  return { enableAdminRoute, enableRoomSetupFeature, enableRoomSetupRoute }
}
