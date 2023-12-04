class RenameColumnEmployeesRangeToEmployeesInStartups < ActiveRecord::Migration[7.1]
  def change
    rename_column :startups, :employees_range, :employees
  end
end
