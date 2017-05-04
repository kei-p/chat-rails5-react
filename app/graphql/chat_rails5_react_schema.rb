ChatRails5ReactSchema = GraphQL::Schema.define do
  query Types::QueryType
  mutation Mutations::MutationType
end
