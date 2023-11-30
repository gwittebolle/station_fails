class Game::ProjectsController < ApplicationController

  def show
    @project = Project.find(params[:project_id])
    @max_level_reached = Level.max_level_reached(@project)
    @level = Level.find_by(index: Level.max_level_reached(@project))
    @next_level = Level.find_by(index: @max_level_reached + 1)
  end

  def edit
    @project = Project.find(params[:project_id])
    @level = Level.find(params[:id])

  end

  def update
    @project = Project.find(params[:project_id])
    @level = Level.find(params[:id])

    # Pour le moment, tout le monde est gagnant
    @attempt = Attempt.new(result: true)
    @attempt.project = @project
    @attempt.level = @level
    @attempt.save
    
    redirect_to project_level_game_project_path(@project, @level)
  end

  def project_params
    # Pour le moment, tous les paramètres sont autorisés, voir Jonathan
    params.require(:project).permit!
  end
end
