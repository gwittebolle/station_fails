class AddFundsToStartups < ActiveRecord::Migration[7.1]
  def change
    add_column :startups, :funds, :integer
  end
end
