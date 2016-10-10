class Api::V1::UsersController < Api::BaseController
 # Api::BaseController
  # before_action :login_request
  # protect_from_forgery with: :null_session


  def login
    # p request.headers
    user = User.find_by_email params[:email]
    if user && user.authenticate(params[:password])
      render json: user
    else
      render json: {success: false}
    end
  end

  private

  def login_request
    request = params[:login_request]
    head :unauthorized unless request
  end



end
