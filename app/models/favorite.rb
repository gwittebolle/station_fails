class Favorite < ApplicationRecord
  belongs_to :project
  belongs_to :startup
end
