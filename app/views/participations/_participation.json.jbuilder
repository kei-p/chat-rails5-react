json.extract! participation, :id, :online
json.user do
  json.extract! participation.user, :id, :email
end
