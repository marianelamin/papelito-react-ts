import { getPlayerById } from '../dao/player.dao'
import { Player } from '../models'

export const isUserValidInRoom = async (roomId: string, playerId: string): Promise<Player> => {
  return await getPlayerById(roomId, playerId)
}
