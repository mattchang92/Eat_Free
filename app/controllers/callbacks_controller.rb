class CallbacksController < ApplicationController

  def index
  end

  def make_request
  end




  def get_response
    fitbit_data  = request.env['omniauth.auth']
    user = User.find_or_create_from_fitbit(fitbit_data)
    session[:user_id] = user.id
    user.token_refresh(fitbit_data, user)
    if fitbit_data["credentials"]["expires"] === true
      HTTParty.post("https://api.fitbit.com/oauth2/token", :body => "grant_type=refresh_token&refresh_token=#{current_user.fitbit_refresh_token}" , :headers => {'Authorization' => "Basic #{ENV['FITBIT_CLIENT_KEY']}#{ENV['FITBIT_CLIENT_SECRET']}"})
    end
    # render json: fitbit_data
    redirect_to root_path
  end


  def get_weight
    date = (Date.today) - 30
    # response = HTTParty.get("https://api.fitbit.com/1/user/-/body/weight/date/#{date}/today.json", :headers => {'Authorization' => "Bearer #{current_user.fitbit_access_token}"})
    response = HTTParty.get("https://api.fitbit.com/1/user/-/activities/steps/date/#{date}/today.json", :headers => {'Authorization' => "Bearer #{current_user.fitbit_access_token}"})
    render json: response
  end

  def post_weight

    # Seeding weight data
    weight = 60.0
    for i in 0..30
      if i % 7 == 0
        weight += 1
      end
      today_weight = weight + (rand(100)/100.0)
      date = (Date.today) - i
      HTTParty.post("https://api.fitbit.com/1/user/-/body/log/weight.json", :body => "my body content", :query => { weight: today_weight, date: date } ,:headers => { 'Authorization' => "Bearer #{current_user.fitbit_access_token}"})
    end
    redirect_to stats_path

  end

  private





end
