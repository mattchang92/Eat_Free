class FoodlogsController < ApplicationController

  def create
    foodlog = Foodlog.new params.permit(:servings, :recipe_id)
    foodlog.user = current_user
    if foodlog.save
      redirect_to recipes_path
    end
  end

  def destroy
    foodlog = Foodlog.find params[:id]
    foodlog.destroy
    redirect_to recipes_path
  end

  def edit
  end

end
