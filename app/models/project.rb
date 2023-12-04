class Project < ApplicationRecord
  belongs_to :user
  has_many :favorites, dependent: :destroy
  has_many :attempts, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true


end
