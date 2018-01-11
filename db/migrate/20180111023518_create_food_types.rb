class CreateFoodTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :food_types do |t|
      t.string :name
      t.boolean :dine_in
      t.boolean :take_out
      t.boolean :fast_food
      t.boolean :breakfast
      t.boolean :lunch
      t.boolean :dinner

      t.timestamps
    end
  end
end
