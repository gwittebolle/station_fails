class Project < ApplicationRecord
  belongs_to :user
  has_many :favorites

  def scrap
  end

  
end
