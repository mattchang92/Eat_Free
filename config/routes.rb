Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/' => 'project#home', as: :root
  get '/about' => 'project#about', as: :about

  resources :stats, only: [:new, :index, :create]
  resources :users, only: [:new, :create]
  # resources :recipes
  resources :sessions, only: [:new, :create] do
    delete :destroy, on: :collection
  end
  get '/guest_signin' => 'sessions#guest', as: :guest_signin

  resources :recipes, only: [:show, :index] do
    resources :foodlogs, only: [:create]
  end
  resources :foodlogs, only: [:destroy, :edit]
  get '/view_foodlogs' => 'foodlogs#show', as: :show_foodlog

  get '/auth/fitbit', as: :auth_fitbit
  post '/auth/fitbit' => 'callbacks#make_request', as: :fitbit_auth
  get '/auth/fitbit/callback' => 'callbacks#get_response'
  get '/weight' => 'callbacks#get_weight', as: :weight
  get '/add_weight' => 'callbacks#post_weight'
end
