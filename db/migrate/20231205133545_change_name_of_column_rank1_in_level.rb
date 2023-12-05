class ChangeNameOfColumnRank1InLevel < ActiveRecord::Migration[7.1]
  def change
    rename_column :levels, :rank1, :funds
  end
end
