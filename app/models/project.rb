class Project < ApplicationRecord
  belongs_to :user
  has_many :favorites


  validates :name, presence: true
  validates :description, presence: true

end
