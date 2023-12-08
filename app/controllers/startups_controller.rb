class StartupsController < ApplicationController
  def index
    @startups = Startup.all.shuffle


    if params[:query].present?
      sql_subquery = <<~SQL
        startups.name ILIKE :query
        OR startups.founder ILIKE :query
        OR startups.localisation ILIKE :query
        OR startups.sector ILIKE :query
        OR startups.fail_reason ILIKE :query
      SQL
      @startups = @startups.where(sql_subquery, query: "%#{params[:query]}%")
    end
  end

  def show
    @startup = Startup.find(params[:id])
    @favorite = Favorite.new
  end

end
