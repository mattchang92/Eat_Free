class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception


    def daily_calories
      calories = 0
      foodlog = current_user.foodlogs.where("created_at >= ?", Time.zone.now.beginning_of_day)
      foodlog.each do |meal|
        calories += (meal.recipe.calories * meal.servings)
      end
      return calories
    end

    def carbs_calories
      carbs = 0
      foodlog = current_user.foodlogs.where("created_at >= ?", Time.zone.now.beginning_of_day)
      foodlog.each do |meal|
        carbs += (meal.recipe.carbs * meal.servings)
      end
      return carbs * 4
    end

    def fats_calories
      fats = 0
      foodlog = current_user.foodlogs.where("created_at >= ?", Time.zone.now.beginning_of_day)
      foodlog.each do |meal|
      fats += (meal.recipe.fats * meal.servings)
      end
      return fats * 9
    end

    def proteins_calories
      proteins = 0
      foodlog = current_user.foodlogs.where("created_at >= ?", Time.zone.now.beginning_of_day)
      foodlog.each do |meal|
        proteins += (meal.recipe.proteins * meal.servings)
      end
      return proteins * 4
    end

  def user_signed_in?
    session[:user_id].present?
  end
  helper_method :user_signed_in?

  def current_user
    if user_signed_in?
      @current_user ||= User.find session[:user_id]
    end
  end
  helper_method :current_user

  def authenticate_user!
    redirect_to new_session_path unless user_signed_in?
  end

  def authorize
    redirect_to root_path, alert: "Access denied" unless can? :manage, @question
  end

end
