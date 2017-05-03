class CommentNotifyJob < ApplicationJob
  def perform(comment)
    RoomChannel.broadcast_to(
      comment.room,
      type: 'CREATE_COMMENT',
      comment: JSON.parse(render_comment(comment))['comment']
    )
  end

  private

  def render_comment(comment)
    ApplicationController.renderer.render(partial: 'comments/comment', locals: { comment: comment })
  end
end
