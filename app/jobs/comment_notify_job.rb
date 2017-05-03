class CommentNotifyJob < ApplicationJob
  def perform(comment)
    RoomChannel.broadcast_to(
      comment.room,
      type: 'CREATE_COMMENT',
      comment: render_comment(comment)
    )
  end

  private

  def render_comment(comment)
    text = ApplicationController.renderer.render(partial: 'comments/comment', locals: { comment: comment })
    JSON.parse(text)
  end
end
