class ChangeNameOfColumnRankInLevel < ActiveRecord::Migration[7.1]
  def change
    rename_column :levels, :rank, :rank1
  end
end
