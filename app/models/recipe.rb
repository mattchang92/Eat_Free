class Recipe < ApplicationRecord

  has_many :foodlogs, dependent: :nullify

end
