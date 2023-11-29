class Project < ApplicationRecord
  belongs_to :user
  has_many :favorites
  has_many :attempts


  validates :name, presence: true
  validates :description, presence: true

end
