class CreateProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :description
      t.string :sector
      t.string :localisation
      t.string :employees_range
      t.string :logo
      t.integer :funds
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
