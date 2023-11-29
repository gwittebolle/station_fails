class RemoveResultFromAttempts < ActiveRecord::Migration[7.1]
  def up
    remove_column :attempts, :results
  end

  def down
    add_column :attempts, :result, :boolean
  end
end
