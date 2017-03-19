class Room < ApplicationRecord
  has_many :comments, dependent: :destroy
end
