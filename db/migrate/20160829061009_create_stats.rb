class CreateStats < ActiveRecord::Migration[5.0]
  def change
    create_table :stats do |t|
      t.integer :age
      t.string :sex
      t.float :weight
      t.integer :height
      t.float :activity_level
      t.integer :calories
      t.float :weight_loss_rate
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
