class ChangeDescriptionTypeInLevels < ActiveRecord::Migration[7.1]
  def change
    change_column :levels, :description, :text
  end
end
