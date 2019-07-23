require 'unirest'
require 'pp'

base_url = "http://localhost:3000"
system "clear"
while true
  p "Choose a number from the options below"
  p "[1] to see all of the restaurants"
  p "[2] to add a restaurant"
  p "[3] to see a particular restaurants"
  p "[4] to update a restaurant"
  p "[5] to sign up"
  p "[6] to login"
  p "[7] to logout"


  user_input = gets.chomp 

  if user_input == "1"
    response = Unirest.get("#{base_url}/restaurants")
    pp response.body

  elsif user_input == "2"
    the_params = {}
    p "Add a restaurant!"
    p "Enter the name of the restaurant!"
    the_params['name'] = gets.chomp
    p "Enter the location!" 
    the_params['location'] = gets.chomp
    response = Unirest.post("#{base_url}/restaurants", parameters: the_params)
    pp response.body

  elsif user_input == "2"  

  elsif user_input == "3"
    p "Enter the id for the restaurant you would like to look at!"
    restaurant_id = gets.chomp
    response = Unirest.get("#{base_url}/restaurants/#{restaurant_id}")
    pp response.body

  elsif user_input == "4"
    p "Enter the id of the restaurant you want to edit"
    restaurant_id = gets.chomp
    response = Unirest.get("localhost:3000/restaurants/#{restaurant_id}")
    the_restaurant = response.body
    the_params = {}

    p "Enter the restaurant name, the original restaurant name was #{the_restaurant['name']}"
    the_params['name'] = gets.chomp

    p "enter the last name the original last name was #{the_restaurant['location']}"
    the_params['location'] = gets.chomp

    response = Unirest.patch("localhost:3000/restaurants/#{restaurant_id}", parameters: the_params)
    pp response.body

  elsif user_input == "5"
    the_params = {}
    p "type your name"
    the_params[:name] = gets.chomp
    p "enter your email"
    the_params[:email] = gets.chomp
    p "enter a password"
    the_params[:password] = gets.chomp
    p "confirm your password"
    the_params[:password_confirmation] = gets.chomp
    response = Unirest.post("http://localhost:3000/users", parameters: the_params)
    user = response.body
    pp user

  elsif user_input == "6"
    p "type in your email"
    user_email = gets.chomp
    p 'type in your password'
    user_password = gets.chomp
    response = Unirest.post(
    "http://localhost:3000/user_token",
    parameters: {
        auth: {
          email: user_email,
          password: user_password
        }
      }
    )

    jwt = response.body["jwt"]
    Unirest.default_header("Authorization", "Bearer #{jwt}")
    pp response.body

  elsif user_input == "7"
    jwt = ""
    Unirest.clear_default_headers()
    pp jwt
    # if current_user
    #   restaurants = current_user.restaurants
    #   render json: contacts.as_json
    # else
    #   render json: []
    # end
    p "You just logged out"
  elsif user_input == 'exit'
    break
  end
end
