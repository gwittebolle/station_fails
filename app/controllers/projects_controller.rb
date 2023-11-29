class ProjectsController < ApplicationController
  def new
    @project = Project.new
  end



  def create
    @project = Project.new(project_params)
    @project.user = current_user
    if @project.save
      redirect_to project_path(@project), notice: "Projet créé avec succès."
    else
      render :new, status: :unprocessable_entity
      puts "Erreur lors de l'enregistrement du projet : #{project.errors.full_messages.join(', ')}"
    end
  end

  def show
    @project = Project.find(params[:id])
  end

  private

  def project_params
    params.require(:project).permit(:name, :description)
  end
end
