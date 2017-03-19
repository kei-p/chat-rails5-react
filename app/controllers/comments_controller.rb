class CommentsController < ApplicationController
  before_action :set_room

  def index
    @comments = @room.comments.order(created_at: :desc)
  end

  private

  def set_room
    @room = Room.find(params[:room_id])
  end
end
