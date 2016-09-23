class AddUnitsToStats < ActiveRecord::Migration[5.0]
  def change
    add_column :stats, :units, :string
  end
end
