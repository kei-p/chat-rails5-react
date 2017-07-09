import { takeEvery, delay } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { FETCH_ROOM_REQUEST, fetchedRoom } from "../actions/room";

function* fetchRoom(action) {
  const { roomId, callback } = action;
  let query = `
    query($id: ID!) {
      room(id: $id) {
        id
        name
        participations {
          id
          online
          user { id email }
        }
        comments {
          id
          body
          created_at
          user { id email }
        }
      }
    }
  `
  let variables = { id: roomId }
  let result = $.ajax({
    url: '/graphql', type: 'POST', data: { query: query, variables: variables },
    async: false
  })
  let room = result.responseJSON.data.room
  yield put(fetchedRoom(room))
  callback()
}

export default function* root() {
  yield* takeEvery(FETCH_ROOM_REQUEST, fetchRoom)
}
