class RenameColumnEmployeesRangeToEmployeesInProjects < ActiveRecord::Migration[7.1]
  def change
    rename_column :projects, :employees_range, :employees
  end
end
