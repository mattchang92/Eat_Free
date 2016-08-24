class StatsController < ApplicationController

  def new
    @stat = Stat.new
  end

end
