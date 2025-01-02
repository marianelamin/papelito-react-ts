const ROOM_ID = 'roomId'
const USER_ID = 'userId'

export const setRoomId = (id: string) => {
  localStorage.setItem(ROOM_ID, id)
}
export const getRoomId = () => {
  const id = localStorage.getItem(ROOM_ID)
  return id
}
export const removeRoomId = () => {
  localStorage.removeItem(ROOM_ID)
}

export const setUserId = (id: string) => {
  localStorage.setItem(USER_ID, id)
}
export const getUserId = () => {
  const id = localStorage.getItem(USER_ID)
  return id
}

export const removeUserId = () => {
  localStorage.removeItem(USER_ID)
}

export const clear = () => {
  localStorage.clear()
}

export const getRoomAndPlayerId = () => ({
  roomId: getRoomId(),
  myUserId: getUserId()
})
