class Restaurant < ApplicationRecord
  belongs_to :user

  def as_json
    {
      id: id,
      name: name,
      location: location,
      image: image

    }
  end
end
