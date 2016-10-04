class Api::V1::RecipesController < Api::BaseController

  protect_from_forgery with: :null_session


  def index
    recipes = Recipe.all
    render json: recipes
  end

end
