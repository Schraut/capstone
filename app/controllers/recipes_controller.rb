class RecipesController < ApplicationController

  def index
    p "here is the current user"
    p current_user
    if current_user
      recipes = current_user.recipes
    else
      recipes = []
    end
    render json: recipes.as_json
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
      source: params[:source],
      user_id: current_user.id
    )
    if recipe.save
      render json: recipe.as_json
    else
      p  recipe.errors.full_messages
      render json: {errors: recipe.errors.full_messages}
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
      render json: {errors:recipe.errors.full_messages}
    end
  end

  def destroy
    the_id = params[:id]
    recipe = Recipe.find(the_id)
    recipe.destroy
    render json: {message: "You have removed this recipe"}
  end
end  

