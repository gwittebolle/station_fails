class CreateFavorites < ActiveRecord::Migration[7.1]
  def change
    create_table :favorites do |t|
      t.string :comment
      t.references :project, null: false, foreign_key: true
      t.references :startup, null: false, foreign_key: true

      t.timestamps
    end
  end
end
