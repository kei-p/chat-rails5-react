module Mutations
  AddCommentMutationType = GraphQL::Relay::Mutation.define do
    name 'AddComment'

    input_field :roomId, !types.ID
    input_field :body, !types.String

    return_type Types::CommentType

    resolve ->(object, inputs, ctx) {
      room = Room.find(inputs[:roomId])
      comment = room.comments.build(body: inputs[:body])
      comment.user = ctx[:current_user]
      comment.save!

      CommentNotifyJob.perform_now(comment)
      comment
    }
  end

  MutationType = GraphQL::ObjectType.define do
    name "Mutation"

    field :addComment, field: AddCommentMutationType.field
  end
end
