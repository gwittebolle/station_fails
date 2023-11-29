class CreateAttempts < ActiveRecord::Migration[7.1]
  def change
    create_table :attempts do |t|
      t.string :results
      t.references :levels, null: false, foreign_key: true
      t.references :projects, null: false, foreign_key: true

      t.timestamps
    end
  end
end
