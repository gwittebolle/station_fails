class AddResultToAttempts < ActiveRecord::Migration[7.1]
  def change
    add_column :attempts, :result, :boolean
  end
end
