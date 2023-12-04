class ChangeEmployeesTypeInStartups < ActiveRecord::Migration[7.1]
  def change
    change_column :startups, :employees, :string
  end
end
