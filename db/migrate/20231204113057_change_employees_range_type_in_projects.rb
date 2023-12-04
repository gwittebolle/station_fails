class ChangeEmployeesRangeTypeInProjects < ActiveRecord::Migration[7.1]
  def change
    change_column :projects, :employees_range, 'integer USING CAST(employees_range AS integer)'
  end
end
