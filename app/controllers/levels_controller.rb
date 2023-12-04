class LevelsController < ApplicationController

  def show
    @project = Project.find(params[:project_id])
    # Comment afficher niveau max ?

    @level = Level.find_by(index: Level.max_level_reached(@project) + 1) || Level.find_by(index: Level.max_level_reached(@project))
    @attempt_count = @project.attempts.where(result: false).count
  end
end
