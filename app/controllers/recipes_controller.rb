class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show]

  def index
    if current_user.stats.last.present?
      @recipes = Recipe.all
      @foodlog = current_user.foodlogs.where("created_at >= ?", Time.zone.now.beginning_of_day)
      @calorie_limit = current_user.stats.last.calories
      @calories = daily_calories
      @carbs = carbs_calories
      @fats = fats_calories
      @proteins = proteins_calories
      @total = 1 + @carbs + @fats + @proteins
    else
      redirect_to new_stat_path, alert: "You must enter your stats first to use the meal planner"
    end
  end

  def show
    respond_to do |format|
      format.js {render 'showRecipeModal'}
    end
  end

  def new
    @recipe = Recipe.new
  end

  def edit
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def recipe_params
      params.require(:recipe).permit(:name, :ingredients, :calories, :servings, :fats, :carbs, :proteins, :tag, :photo, :directions)
    end
end
