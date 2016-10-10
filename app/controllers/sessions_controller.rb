class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_email params[:email]
    respond_to do |format|

      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        format.js { render :login_success }
      else
        format.js { render :login_fail }
      end
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  def guest
    guest = User.find_by_first_name :Guest
    session[:user_id] = guest.id
    redirect_to root_path
  end
end
