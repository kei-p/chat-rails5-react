class Room < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :participations, dependent: :destroy
end
