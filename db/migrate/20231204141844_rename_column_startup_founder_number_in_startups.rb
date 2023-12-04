class RenameColumnStartupFounderNumberInStartups < ActiveRecord::Migration[7.1]
  def change
    rename_column :startups, :startup_founders_number, :founders_number
  end
end
