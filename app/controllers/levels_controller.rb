class LevelsController < ApplicationController

  def show
    @project = Project.find(params[:project_id])
    # Comment afficher niveau max ?
    @level = Level.first

    @attempt = Attempt.new
    @attempt.project = @project
    @attempt.level = @level
    raise

  endgit remote add heroku

end
