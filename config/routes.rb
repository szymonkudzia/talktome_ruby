TalkToMe::Application.routes.draw do
  root "main#index"

  post "service/localization" => "localization#localization"
  post "service/register" => "register#register"
  get "service/confirm" => "confirm#confirm"
  post "service/login" => "login#login"
  post "service/getCountries" => "get_countries#getCountries"
  post "service/deleteFriend" => "delete_friend#deleteFriend"
  post "service/getMessages" => "get_messages#getMessages"
  post "service/getNewMessages" => "get_new_messages#getNewMessages"
  post "service/sendMessage" => "send_message#sendMessage"
  post "service/updateUser" => "update_user#updateUser"
  post "service/translateText" => "google_translator#googleTranslator"
  post "service/confirmFriend" => "confirm_friend#confirmFriend"
  post "service/addFriend" => "add_friend#addFriend"
  post "service/searchPeople" => "search_people#searchPeople"
  post "service/getFriendList" => "get_friend_list#getFriendList"

  

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
