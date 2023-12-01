class Startup < ApplicationRecord
  has_many :favorites, dependent: :destroy
  # has_one_attached :logo
end
