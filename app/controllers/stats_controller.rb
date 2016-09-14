class StatsController < ApplicationController

  def new
    @stat = Stat.new
  end

  def create
    redirect_to new_stat_path
  end


end
