class AddIndexToLevels < ActiveRecord::Migration[7.1]
  def change
    add_column :levels, :index, :integer, default: 1
  end
end
