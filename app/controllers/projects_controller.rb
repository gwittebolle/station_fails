class ProjectsController < ApplicationController
  before_action :set_project, only: [:edit, :update, :destroy]


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

  def update
    if @project.update(project_params)
      redirect_to project_path(@project), notice: "Projet mis à jour avec succès."
    else
      render :edit, status: :unprocessable_entity
      puts "Erreur lors de la mise à jour du projet : #{project.errors.full_messages.join(', ')}"
    end
  end

  def destroy
    @project.destroy
    redirect_to root_path
  end

  def edit

  end


  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name, :description)
  end
end
