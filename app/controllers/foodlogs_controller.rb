class FoodlogsController < ApplicationController



  def create
    @foodlog = Foodlog.new params.permit(:servings, :recipe_id)
    @foodlog.user = current_user
    get_stats
    respond_to do |format|
      if (@foodlog.servings * @foodlog.recipe.calories) > (@calorie_limit - @calories + 100)
        format.html {redirect_to recipes_path, alert: "Calorie limit surpassed, please choose another meal"}
        format.js {render :add_failure}
      else
        if @foodlog.save
          get_stats
          format.html {redirect_to recipes_path}
          format.js {render :add_success}
        end
      end
    end
  end

  def destroy
    foodlog = Foodlog.find params[:id]
    foodlog.destroy
    respond_to do |format|
      get_stats
      format.html {redirect_to recipes_path}
      format.js {render :remove_success}
    end
  end

  def edit
  end


  def get_stats
    @calorie_limit = current_user.stats.last.calories
    @calories = daily_calories
    @carbs = carbs_calories
    @fats = fats_calories
    @proteins = proteins_calories
    @total = 1 + @carbs + @fats + @proteins
  end

end
