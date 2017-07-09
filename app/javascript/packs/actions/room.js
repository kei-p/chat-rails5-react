export const FETCHED_ROOM = 'FETCHED_ROOM';
export const FETCH_ROOM_REQUEST = 'FETCH_ROOM_REQUEST';

export function fetchRoom(roomId, callback) {
  return {
    type: FETCH_ROOM_REQUEST,
    roomId: roomId,
    callback: callback
  };
}

export function fetchedRoom(room) {
  return {
    type: FETCHED_ROOM,
    room: room
  };
}

