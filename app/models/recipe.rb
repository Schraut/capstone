class Recipe < ApplicationRecord
  
  def as_json
    {
      id: id,
      title: title,
      ingredients: ingredients,
      directions: directions,
      source: source
    }
  end
end
