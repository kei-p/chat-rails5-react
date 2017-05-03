class ParticipationNotifyJob < ApplicationJob
  def perform(room)
    RoomChannel.broadcast_to(
      room,
      type: 'UPDATE_PARTICIPATIONS',
      participations: render_particiaptions(room)
    )
  end

  private

  def render_particiaptions(room)
    participations = room.participations.order(created_at: :asc)
    text = ApplicationController.renderer.render(template: 'participations/index', locals: { :@participations => participations})
    JSON.parse(text)
  end
end
