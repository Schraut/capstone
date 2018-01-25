class RecipesController < ApplicationController
  def index
    the_recipes = Recipe.all
    render json: the_recipes.as_json
  end

  def show
   recipe = Recipe.find_by(id: params[:id])
    render json:recipe.as_json
  end

  def create
   recipe = Recipe.new(
      title: params[:title],
      ingredients: params[:ingredients],
      directions: params[:directions],
      source: params[:source]
    )
    ifrecipe.save
      render json:recipe.as_json
    else
      render json: {errors:recipe.errors.full_messages}
    end
  end

  def update
    the_id = params[:id]
   recipe = Recipe.find_by(id: the_id)
    if recipe.update(
      name: params[:name],
      location: params[:location]
    )
      render json:recipe.as_json
    else
      render json: { errors:recipe.errors.full_messages }
    end
  end

  def destroy
    the_id = params[:id]
    recipe = Recipe.find(the_id)
    recipe.destroy
    render json: {message: "You have removed this restaurant"}
  end

