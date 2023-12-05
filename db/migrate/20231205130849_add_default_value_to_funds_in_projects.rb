class AddDefaultValueToFundsInProjects < ActiveRecord::Migration[7.1]
  def change
    change_column :projects, :funds, :integer, default: 0
  end
end
