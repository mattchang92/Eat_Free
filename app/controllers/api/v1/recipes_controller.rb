class Api::V1::RecipesController < Api::BaseController

  protect_from_forgery with: :null_session
  before_action :current_api_user, only: [:add_recipe, :show_foodlog]

  def index
    recipes = Recipe.all
    render json: recipes
  end

  def show_foodlog
    @foodlogs = @current_api_user.foodlogs.where('created_at >= ?', Time.zone.now.beginning_of_day)
  end

  def delete_foodlog
    foodlog = Foodlog.find params[:foodlogId]
    if foodlog.destroy
      @foodlogs = @current_api_user.foodlogs.where('created_at >= ?', Time.zone.now.beginning_of_day)
    else
      render json: {success: false}
    end
  end

  def add_recipe
    foodlog = Foodlog.new recipe_params
    foodlog.user = @current_api_user
    if foodlog.save
      render json: {success: true}
    else
      render json: {success: false}
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:servings, :recipe_id)
  end

  def current_api_user
    @current_api_user = User.find_by_api_key request.headers["HTTP_API_KEY"]
  end


end
