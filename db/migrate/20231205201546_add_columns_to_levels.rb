class AddColumnsToLevels < ActiveRecord::Migration[7.1]
  def change
    add_column :levels, :min_funds, :integer
    add_column :levels, :min_employees, :integer
  end
end
