class UpdateAttemptsTable < ActiveRecord::Migration[7.1]
  def change
    rename_column :attempts, :levels_id, :level_id
    rename_column :attempts, :projects_id, :project_id
  end
end
