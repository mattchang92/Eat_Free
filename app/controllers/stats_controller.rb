class StatsController < ApplicationController

  def new
    @stat = Stat.new
  end

  def create
    redirect_to root_path
  end


end
