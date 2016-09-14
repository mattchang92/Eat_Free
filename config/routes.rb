Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/" => "project#home", as: :root
  get "/test" => "project#test", as: :test
  get "/planner" => "project#planner"

  resources :stats, only: [:new,:create]
  resources :users, only: [:new,:create]
  # resources :recipes
  resources :sessions, only: [:new,:create] do
    delete :destroy, on: :collection
  end
  resources :recipes, only: [:show, :index]
  resources :foodlogs, only: [:create, :destroy]

end
