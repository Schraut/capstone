class RestaurantsController < ApplicationController
  
  def index
    the_restaurants = Restaurant.all
    p "here is the current user"
    p current_user
    render json:the_restaurants.as_json
  end

  def show
    restaurant = Restaurant.find_by(id: params[:id])
    
    render json: restaurant.as_json
  end

  def create
    restaurant = Restaurant.new(
      name: params[:name],
      location: params[:location],
      image: params[:image]
    )
    if restaurant.save
      render json: restaurant.as_json
    else
      render json: {errors: restaurant.errors.full_messages}
    end
  end

  def update
    the_id = params[:id]
    restaurant = Restaurant.find_by(id: the_id)
    if restaurant.update(
      name: params[:name],
      location: params[:location],
      image: params[:image]
    )
      render json: restaurant.as_json
    else
      render json: { errors: restaurant.errors.full_messages }
    end
  end

  def destroy
    the_id = params[:id]
    restaurant = Restaurant.find(the_id)
    restaurant.destroy
    render json: {message: "You have removed this restaurant"}
  end
end
