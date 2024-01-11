const ROOM_ID = 'roomId'
const USER_ID = 'userId'

export const setRoomId = (id: string) => {
  localStorage.setItem(ROOM_ID, id)
}
export const getRoomId = () => localStorage.getItem(ROOM_ID) ?? undefined
export const removeRoomId = () => {
  localStorage.removeItem(ROOM_ID)
}

export const setUserId = (id: string) => {
  localStorage.setItem(USER_ID, id)
}
export const getUserId = () => localStorage.getItem(USER_ID) ?? undefined
export const removeUserId = () => {
  localStorage.removeItem(USER_ID)
}

export const clear = () => {
  localStorage.clear()
}

export const getRoomAndPlayerId = () => ({
  roomId: getRoomId() ?? undefined,
  myUserId: getUserId() ?? undefined
})
