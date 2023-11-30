class Startup < ApplicationRecord
  has_many :favorites, dependent: :destroy
end
