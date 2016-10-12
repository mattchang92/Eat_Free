class Api::V1::UsersController < Api::BaseController

  def login
    # p request.headers
    user = User.find_by_email params[:email]
    stats = user.stats.last
    if user && user.authenticate(params[:password])
      render :json => { :user => user, :stats => stats }
    else
      render json: {success: false}
    end
  end

end
