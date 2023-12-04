class Game::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update]
  # before_action :set_level, only: [:edit]

  def show
    @max_level_reached = Level.max_level_reached(@project)
    @attempt = @project.attempts.last
    @level = Level.find_by(index: Level.max_level_reached(@project) + 1) || Level.find_by(index: Level.max_level_reached(@project))
    @next_level = Level.find_by(index: @max_level_reached + 1)
  end

  def edit
    @max_level_reached = Level.max_level_reached(@project)
    @level = Level.find_by(index: Level.max_level_reached(@project) + 1) || Level.find_by(index: Level.max_level_reached(@project))
  end

  def update
    @level = Level.find(params[:id])

    if @level.win?(params)
      @attempt = Attempt.create(result: true)
      if params[:level][:metrics] == "funds"
        @project.funds = params[:level][:rank]
        @project.save
      end
    else
      @attempt = Attempt.create(result: false)
    end

    @attempt.project = @project
    @attempt.level = @level
    @attempt.save

    redirect_to project_level_game_project_path(@project, @level)
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  # def set_level
  #   @level = Project.find(params[:id])
  # end



  def project_params
    # Pour le moment, tous les paramètres sont autorisés, voir Jonathan
    params.require(:project).permit!
  end
end
