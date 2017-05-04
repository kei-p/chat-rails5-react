module Types
  UserType = GraphQL::ObjectType.define do
    name "User"

    field :id, !types.ID
    field :email, !types.String
    field :created_at, !types.String
    field :updated_at, !types.String
  end

  ParticipationType = GraphQL::ObjectType.define do
    name "Participation"

    field :id, !types.ID
    field :online, !types.Boolean
    field :created_at, !types.String
    field :updated_at, !types.String

    field :user, UserType
  end

  CommentType = GraphQL::ObjectType.define do
    name "Comment"

    field :id, !types.ID
    field :body, !types.String
    field :created_at, !types.String
    field :updated_at, !types.String

    field :user, UserType
  end

  RoomType = GraphQL::ObjectType.define do
    name "Room"

    field :id, !types.ID
    field :name, !types.String
    field :created_at, !types.String
    field :updated_at, !types.String

    field :participations, types[ParticipationType] do
      resolve ->(obj, args, ctx) { obj.participations.includes(:user).order(created_at: :desc) }
    end

    field :comments, types[CommentType] do
      argument :per, types.String, default_value: '10'
      argument :page, types.String, default_value: '1'

      resolve ->(obj, args, ctx) {
        obj.comments.includes(:user).order('comments.created_at DESC, comments.id DESC')
          .page(args[:page].to_i).per(args[:per].to_i)
      }
    end
  end

  QueryType = GraphQL::ObjectType.define do
    name "Query"

    field :room do
      type RoomType
      argument :id, !types.ID

      resolve ->(obj, args, ctx) { Room.find(args[:id]) }
    end
  end
end
