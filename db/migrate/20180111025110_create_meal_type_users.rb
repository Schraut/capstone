class CreateMealTypeUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :meal_type_users do |t|
      t.integer :meal_type_id
      t.integer :user_id
      t.integer :restaurant_id

      t.timestamps
    end
  end
end
