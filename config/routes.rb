Rails.application.routes.draw do
   # user routes
  post 'user_token' => 'user_token#create'
  post '/v1/users' => 'users#create'

  # restaurant routes
  get '/restaurants' => 'restaurants#index'
  post '/restaurants' => 'restaurants#create'
  get '/restaurants/:id' => 'restaurants#show'
  patch '/restaurants/:id' => 'restaurants#update'
  delete '/restaurants/:id' => 'restaurants#destroy'

  # recipe routes
  get '/recipes' => 'recipes#index'
  post '/recipes' => 'recipes#create'
  get '/recipes/:id' => 'recipes#show'
  patch '/recipes/:id' => 'recipes#update'
  delete '/recipes/:id' => 'recipes#destroy'

 
  
end
