class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.text :ingredients
      t.string :directions
      t.string :source

      t.timestamps
    end
  end
end
