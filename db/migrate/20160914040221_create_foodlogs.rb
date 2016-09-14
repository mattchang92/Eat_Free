class CreateFoodlogs < ActiveRecord::Migration[5.0]
  def change
    create_table :foodlogs do |t|
      t.integer :servings
      t.references :recipe, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
