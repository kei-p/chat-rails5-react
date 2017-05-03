class Participation < ApplicationRecord
  belongs_to :user
  belongs_to :room

  validates :user, uniqueness: { scope: :room_id }
end
