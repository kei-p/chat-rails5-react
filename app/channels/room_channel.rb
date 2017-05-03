class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_for Room.find(params[:room])
  end

  def unsubscribed
  end
end
