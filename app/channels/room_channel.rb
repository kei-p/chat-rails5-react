class RoomChannel < ApplicationCable::Channel
  def subscribed
    @room_id = params[:room_id]
    room = Room.find(@room_id)

    stream_for room
    current_user.join(room)
    broadcast_update_participation(room)
  end

  def unsubscribed
    room = Room.find(@room_id)
    current_user.leave(room)
    broadcast_update_participation(room)
  end

  private

  def broadcast_update_participation(room)
    ParticipationNotifyJob.perform_now(room)
  end
end
