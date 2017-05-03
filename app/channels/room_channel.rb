class RoomChannel < ApplicationCable::Channel
  def subscribed
    set_room
    stream_for @room
    current_user.join(@room)
  end

  def leave
    set_room
    current_user.leave(@room)
  end

  def unsubscribed
  end

  private

  def set_room
    @room = Room.find(params[:room])
  end
end
