Rails.application.routes.draw do
  root to: 'rooms#index'

  devise_for :users

  resources :rooms do
    resources :comments, only: %i(index create destroy)
    resources :participations, only: %i(index)
  end

  mount ActionCable.server => '/cable'
end
