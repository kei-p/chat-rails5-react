const FETCH_ROOM = 'FETCH_ROOM';

export function fetchRoom(room) {
  return {
    type: FETCH_ROOM,
    room: room
  };
}
