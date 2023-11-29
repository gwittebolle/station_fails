class Game::ProjectsController < ApplicationController

  def show
    @project = Project.find(params[:project_id])
    @level = Project.find(params[:id])
  end

  def edit
    @project = Project.find(params[:project_id])
    @level = Project.find(params[:id])
  end

  def update
    @project = Project.find(params[:project_id])
    @level = Project.find(params[:id])

    if @project.update(project_params)
      redirect_to project_level_game_project(@project,@level)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def project_params
    # Paramètres autorisés pour la mise à jour du projet
    params.require(:project).permit(:funds)
  end

end
