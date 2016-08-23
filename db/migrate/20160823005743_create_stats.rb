class CreateStats < ActiveRecord::Migration[5.0]
  def change
    create_table :stats do |t|
      t.integer :age
      t.string :sex
      t.integer :weight
      t.integer :height
      t.integer :activity_level
      t.integer :calories
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
