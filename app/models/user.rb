class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :comments, dependent: :destroy
  has_many :participations, dependent: :destroy

  def join(room)
    participation(room).update(online: true)
  end

  def leave(room)
    participation(room).update(online: false)
  end

  private

  def participation(room)
    participations.find_or_initialize_by(room: room)
  end
end
