json.extract! comment, :id, :body, :created_at, :updated_at
json.user do
  json.extract! comment.user, :id, :email
end
