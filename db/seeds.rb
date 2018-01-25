# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user1 = User.new(name: "Steve", username: "Stevo", password: "password")
user1.save
user2 = User.new(name: "Sarah", username: "Ssomething", password: "password")
user2.save
user3 = User.new(name: "Dave", username: "asdf", password: "password")
user3.save

restaurant1 = Restaurant.new(name: "Wendy's", location: "Houston, TX")
restaurant1.save
restaurant2 = Restaurant.new(name: "McDonald's", location: "Dallas, TX")
restaurant2.save
restaurant3 = Restaurant.new(name: "Subway", location: "Las Vegas, NV")
restaurant3.save

recipe1 = Recipe.new(title: "Chicken Alfredo", ingredients: "Chicken and alfredo", directions: "Put the two together!", source: "pinterest.com")
recipe1.save
recipe2 = Recipe.new(title: "Peanut butter and jelly", ingredients: "bread, peanut butter and jelly", directions: "Put the peanut butter and jelly between two slices of bread", source: "mom's kitchen")
recipe2.save
recipe3 = Recipe.new(title: "Cereal", ingredients: "milke and cereal", directions: "Put cereal in a bowl then add milk", source: "pinterest.com")
recipe3.save