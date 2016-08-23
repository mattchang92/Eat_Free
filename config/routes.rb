Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/" => "project#home", as: :root
  get "/test" => "project#test", as: :test
  get "/planner" => "project#planner"

  resources :users, only: [:new,:create]
  resources :sessions, only: [:new,:create] do
    delete :destroy, on: :collection
  end

end
