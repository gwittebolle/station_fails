Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  mount Bootsy::Engine => '/bootsy', as: 'bootsy'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  resources :pages, only: %i[index]
  resources :projects, only: %i[show new create destroy update edit]


  root to: "pages#home"

  resources :projects, only: %i[show] do
    # Afficher /project/1/levels/1
    resources :levels, only: %i[show] do
      # Afficher /project/1/levels/1/attempts
      namespace :game do
        resources :projects, only: %i[edit update show]
      end
      resources :attempts, only: %i[index create]
      # # Afficher /project/1/level/1/project/1 -> flou, ticket à réaliser
      # namespace :game do
      #   resources :projects, only %i[show update create]
      # end
    end
  end

  resources :startups, only: %i[index show] do
    resources :favorites, only: %i[create new index]
  end

  get 'pages/win', to: 'pages#win', as: :win_page

end
