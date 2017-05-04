Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  root to: 'rooms#index'

  devise_for :users

  resources :rooms do
    resources :comments, only: %i(index create destroy)
    resources :participations, only: %i(index)
  end

  post "/graphql", to: "graphql#execute"
  mount ActionCable.server => '/cable'
end
