class FavoritesController < ApplicationController
  before_action :set_project, :set_startup, only: :create

  def index
    @favorites = Favorite.all
  end

  def new
    @favorite = Favorite.new
  end

  def create
    @favorite = Favorite.new(favorite_params)
    @favorite.project = @project
    @favorite.startup = @startup
    if @project.save
      redirect_to project_path(@project), notice: "Favori ajouté avec succès."
    else
      render :new, status: :unprocessable_entity
      puts "Erreur lors de l'enregistrement du favori : #{favorite.errors.full_messages.join(', ')}"
    end
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def set_startup
    @startup = Startup.find(params[:id])
  end

  def favorite_params
    params.require(:favorite).permit(:comment)
  end


end
