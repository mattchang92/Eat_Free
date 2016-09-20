class Stat < ApplicationRecord
  belongs_to :user

  validates :age, presence: true
  validates :sex, presence: true
  validates :weight, presence: true
  validates :height, presence: true
  validates :activity_level, presence: true
  validates :weight_loss_rate, presence: true
  validates :calories, presence: true

end
