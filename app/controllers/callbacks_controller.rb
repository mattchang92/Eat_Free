class CallbacksController < ApplicationController

  def index
  end

  def make_request
  end

  def get_response
    # user = User.from_omniauth(env["omniauth.auth"])
    # session[:user_id] = user.id

    oauth_token = params[:oauth_token]
    oauth_verifier = params[:oauth_verifier]
    fitbit_data  = request.env['omniauth.auth']

    # activities = get_user_activities(fitbit_data)
    render json:fitbit_data
  end


  private
    def get_user_activities(fitbit_data)
      fitbit_user_id = fitbit_data["uid"]
      user_secret = fitbit_data["credentials"]["secret"]
      user_token = fitbit_data["credentials"]["token"]

      # Store this information in you user model for

      # logins in the future.

      client = Fitgem::Client.new({
        consumer_key: ENV['FITBIT_CLIENT_KEY'],
        consumer_secret: ENV['FITBIT_CLIENT_SECRET'],
        token: user_token,
        secret: user_secret,
        user_id: fitbit_user_id,
      })

      # Reconnects existing user using the information above
      access_token = client.reconnect(user_token, user_secret)
      # client.activities_on_date('2015-03-25') <- Specific Date
      client.activities_on_date('today')
    end


end
