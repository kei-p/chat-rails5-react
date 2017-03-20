class CommentsController < ApplicationController
  before_action :set_room

  def index
    @comments = @room.comments.order(created_at: :desc)
  end

  def create
    @comment = @room.comments.build(comment_params)
    @comment.user = current_user
    @comment.save!
    CommentNotifyJob.perform_now(@comment)
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

  def set_room
    @room = Room.find(params[:room_id])
  end
end
