class AddColumnFoundersNumberToStartups < ActiveRecord::Migration[7.1]
  def change
    add_column :startups, :startup_founders_number, :integer
  end
end
