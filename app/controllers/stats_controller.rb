class StatsController < ApplicationController

  def new
    @stat = Stat.new
  end

  def create
    @stat = Stat.new stat_params
      @stat.user = current_user
      if @stat.save
        redirect_to new_stat_path, notice: "Stats saved!"
      else
        redirect_to new_stat_path, alert: "Missing entry in required fields"
      end
  end

  def stat_params
    params.require(:stat).permit([:age, :sex, :weight, :height, :activity_level, :calories, :weight_loss_rate])
  end

end
