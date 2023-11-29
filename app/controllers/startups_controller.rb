class StartupsController < ApplicationController
  def index
    # @startups = FrenchTechApi.get_startups

    @startups = Startup.all
    # if params[:query].present?
    #   sql_subquery = <<~SQL
    #     startups.name ILIKE :query
    #     OR startups.founder ILIKE :query
    #     OR startups.employees_range ILIKE :query
    #     OR startups.localisation ILIKE :query
    #     OR startups.sector ILIKE :query
    #     OR startups.fail_reason ILIKE :query
    #     OR startups.death_year ILIKE :query
    #   SQL
    #   @movies = @movies.where(sql_subquery, query: "%#{params[:query]}%")
    # end
  end

  def show
    @startup = Startup.find(params[:id])
    @project = Project.find(params[:id])
  end

end
