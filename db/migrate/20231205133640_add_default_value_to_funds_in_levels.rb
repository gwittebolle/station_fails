class AddDefaultValueToFundsInLevels < ActiveRecord::Migration[7.1]
  def change
    change_column :levels, :funds, :integer, default: 0
  end
end
