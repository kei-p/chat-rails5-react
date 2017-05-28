class RoomChannel < ApplicationCable::Channel
  def subscribed
    set_room
    stream_for @room
    current_user.join(@room)
    broadcast_update_participation
  end

  def unsubscribed
    current_user.leave(@room)
    broadcast_update_participation
  end

  private

  def broadcast_update_participation
    ParticipationNotifyJob.perform_now(@room)
  end

  def set_room
    @room = Room.find(params[:room])
  end
end
