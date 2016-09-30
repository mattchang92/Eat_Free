class StatsController < ApplicationController
  def new
    @stat = Stat.new
  end

  def create
    @stat = Stat.new stat_params
    @stat.user = current_user
    if @stat.save
      redirect_to new_stat_path, notice: 'Stats saved!'
    else
      redirect_to new_stat_path, alert: 'Missing entry in required fields'
    end
  end

  def index
    if !current_user.stats.last.present?
      redirect_to new_stat_path, alert: 'You must save your stats first to view your info'
    else
      if !current_user.from_fitbit?
        redirect_to new_stat_path, alert: 'You must signin with your fitbit account to view fitbit info'
      else
        date = Date.today - 30
        if current_user.from_oauth? && current_user.provider == 'fitbit'
          @weight = HTTParty.get("https://api.fitbit.com/1/user/-/body/weight/date/#{date}/today.json", headers: { 'Authorization' => "Bearer #{current_user.fitbit_access_token}" })
          gon.weight_data = @weight['body-weight']
          @steps = HTTParty.get("https://api.fitbit.com/1/user/-/activities/steps/date/#{date}/today.json", headers: { 'Authorization' => "Bearer #{current_user.fitbit_access_token}" })
          gon.steps_data = @steps['activities-steps']
          @distance = HTTParty.get("https://api.fitbit.com/1/user/-/activities/distance/date/#{date}/today.json", headers: { 'Authorization' => "Bearer #{current_user.fitbit_access_token}" })
          gon.distance_data = @distance['activities-distance']
          @heart = HTTParty.get("https://api.fitbit.com/1/user/-/activities/heart/date/#{date}/today.json", headers: { 'Authorization' => "Bearer #{current_user.fitbit_access_token}" })

          gon.heart_data = @heart['activities-heart']
          gon.loss_rate = current_user.stats.last.weight_loss_rate
          current_user.stats.last.units == 'metric' ? true : gon.loss_rate /= 2.2
        end
        @average_hr = average_hr
        @max_steps = max_steps
        @weekly_steps = weekly_steps
        @daily_steps = daily_steps
        @max_distance = max_distance
        @weekly_distance = weekly_distance
        @daily_distance = daily_distance
        @rate = current_user.stats.last.weight_loss_rate
        current_user.stats.last.units == 'metric' ? true : @rate /= 2.2
      end
    end

    # if @heart["errors"][0]["errorType"] == 'expired_token'
    #   session[:user_id] = nil
    #   redirect_to fitbit_auth_path
    # end
  end

  def stat_params
    params.require(:stat).permit([:units, :age, :sex, :weight, :height, :activity_level, :calories, :weight_loss_rate])
  end

  def max_steps
    max = 0
    @steps['activities-steps'].each do |steps|
      steps['value'].to_i > max ? max = steps['value'].to_i : true
    end
    max
  end

  def daily_steps
    total = 0
    n = 0
    @steps['activities-steps'].each do |s|
      total += s['value'].to_i
      n += 1
    end
    (total / n).to_i
  end

  def weekly_steps
    total = 0
    steps = @steps['activities-steps'][24..-1]
    steps.each do |s|
      total += s['value'].to_i
    end
    total
  end

  def max_distance
    max = 0
    @distance['activities-distance'].each do |d|
      d['value'].to_f > max ? max = d['value'].to_f : true
    end
    max.round(2)
  end

  def daily_distance
    total = 0
    n = 0
    @distance['activities-distance'].each do |d|
      total += d['value'].to_f
      n += 1
    end
    (total / n).round(2)
  end

  def weekly_distance
    total = 0
    distance = @distance['activities-distance'][24..-1]
    distance.each do |d|
      total += d['value'].to_f
    end
    total.round(2)
  end

  def average_hr
    total = 0
    n = 0
    @heart['activities-heart'].each do |h|
      if h['value']['restingHeartRate']
        total += h['value']['restingHeartRate'].to_i
        n += 1
      end
    end
    (n.zero? ? 0 : (total / n).to_i)
  end
end
