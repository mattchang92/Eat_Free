class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.text :ingredients
      t.integer :calories
      t.integer :servings
      t.float :fats
      t.float :carbs
      t.float :proteins
      t.string :tag
      t.string :photo
      t.text :directions

      t.timestamps
    end
  end
end
