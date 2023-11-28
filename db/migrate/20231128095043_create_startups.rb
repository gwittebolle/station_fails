class CreateStartups < ActiveRecord::Migration[7.1]
  def change
    create_table :startups do |t|
      t.string :name
      t.string :founder
      t.string :logo
      t.string :employees_range
      t.string :localisation
      t.string :sector
      t.string :fail_reason
      t.integer :birth_year
      t.integer :death_year

      t.timestamps
    end
  end
end
