Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/" => "project#home", as: :home
  get "/test" => "project#test", as: :test
  get "/planner" => "project#planner"

end
