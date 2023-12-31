class ProjectsController < ApplicationController
  before_action :set_project, only: [:destroy]


  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    @project.user = current_user
    if @project.save
      redirect_to project_path(@project), notice: "Nouvelle partie créée avec succès."
    else
      render :new, status: :unprocessable_entity
      puts "Erreur lors de l'enregistrement du projet : #{@project.errors.full_messages.join(', ')}"
    end
  end

  def show
    @project = Project.find(params[:id])
    @favorites = @project.favorites
    @max_level_reached = Level.max_level_reached(@project)

    # Trouver le niveau suivant s'il existe, sinon utiliser le niveau actuel
    @next_level = Level.find_by(index: @max_level_reached + 1) || Level.find_by(index: @max_level_reached)
  end



  def destroy
    @project.destroy
    redirect_to new_project_path
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name, :description, :sector, :localisation, :employees, :funds, :avatar)
  end

end
