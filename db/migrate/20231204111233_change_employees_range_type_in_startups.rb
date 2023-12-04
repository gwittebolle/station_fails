class ChangeEmployeesRangeTypeInStartups < ActiveRecord::Migration[7.1]
  def change
    change_column :startups, :employees_range, 'integer USING CAST(employees_range AS integer)'
  end
end
