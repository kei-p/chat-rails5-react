class ParticipationsController < ApplicationController
  before_action :set_room

  def index
    @participations = @room.participations.order(created_at: :asc)
  end

  private

  def set_room
    @room = Room.find(params[:room_id])
  end
end
