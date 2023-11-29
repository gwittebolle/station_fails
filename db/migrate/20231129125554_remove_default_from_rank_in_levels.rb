class RemoveDefaultFromRankInLevels < ActiveRecord::Migration[7.1]
  def change
    change_column_default(:levels, :rank, nil)
  end
end
