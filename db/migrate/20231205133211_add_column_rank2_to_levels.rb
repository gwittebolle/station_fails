class AddColumnRank2ToLevels < ActiveRecord::Migration[7.1]
  def change
    add_column :levels, :employees, :integer, default: 0
  end
end
