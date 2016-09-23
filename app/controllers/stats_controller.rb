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

  def index
    date = (Date.today) - 30
    if current_user.from_oauth? && current_user.provider == 'fitbit'
      weight = HTTParty.get("https://api.fitbit.com/1/user/-/body/weight/date/#{date}/today.json", :headers => {'Authorization' => "Bearer #{current_user.fitbit_access_token}"})
      gon.weight_data = weight["body-weight"]
      steps = HTTParty.get("https://api.fitbit.com/1/user/-/activities/steps/date/#{date}/today.json", :headers => {'Authorization' => "Bearer #{current_user.fitbit_access_token}"})
      gon.steps_data = steps["activities-steps"]

      gon.loss_rate = current_user.stats.last.weight_loss_rate

      current_user.stats.last.units == 'metric' ? true : gon.loss_rate /=2.2
    end
  end

  def stat_params
    params.require(:stat).permit([:units, :age, :sex, :weight, :height, :activity_level, :calories, :weight_loss_rate])
  end

end
