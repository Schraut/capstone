class Restaurant < ApplicationRecord
  def as_json
    {
      id: id,
      name: name,
      location: location,
      image: image
    }
  end
end
