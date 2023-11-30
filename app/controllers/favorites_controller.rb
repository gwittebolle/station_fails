class FavoritesController < ApplicationController
  before_action :set_project, :set_startup, only: %i[create new]
  def index
    @favorites = Favorite.all
  end

  def new
    @favorite = Favorite.new
  end

  def create
    #@favorite = @project.favorites.new(startup: @startup)
    @favorite = Favorite.new
    @favorite.project = current_user.projects.last
    @favorite.startup = @startup
    if @favorite.save

      redirect_to project_path(@project)
    else

      render :new, status: :unprocessable_entity
      puts "Erreur lors de l'enregistrement du favori : #{favorite.errors.full_messages.join(', ')}"
    end
  end

  private

  def set_project
    @project = current_user.projects.last
  end

  def set_startup
    @startup = Startup.find(params[:startup_id])
  end
end
