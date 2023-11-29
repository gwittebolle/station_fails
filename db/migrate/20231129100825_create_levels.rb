class CreateLevels < ActiveRecord::Migration[7.1]
  def change
    create_table :levels do |t|
      t.string :description
      t.integer :rank, default: 1
      t.string :metrics

      t.timestamps
    end
  end
end
