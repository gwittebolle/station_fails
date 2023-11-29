class LevelsController < ApplicationController

  def show
    @project = Project.find(params[:project_id])
    @level = Level.first
    #niveau max ?

  end

end
