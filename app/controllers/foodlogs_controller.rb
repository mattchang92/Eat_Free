class FoodlogsController < ApplicationController

  def create
    @foodlog = Foodlog.new params.permit(:servings, :recipe_id)
    @foodlog.user = current_user
    respond_to do |format|
      if @foodlog.save
        format.html {redirect_to recipes_path}
        format.js {render :add_success}
      end
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
