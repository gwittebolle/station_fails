class AddDefaultValueToEmployeesInProjects < ActiveRecord::Migration[7.1]
  def change
    change_column :projects, :employees, :integer, default: 0
  end
end
