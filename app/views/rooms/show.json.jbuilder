json.partial! @room
json.participations do
  json.array! @room.participations, partial: 'participations/participation', as: :participation
end
json.comments do
  json.array! @room.comments, partial: 'comments/comment', as: :comment
end
