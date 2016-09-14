class User < ApplicationRecord
  has_secure_password
  has_many :stats, dependent: :destroy
  has_many :foodlogs, dependent: :destroy


  # after_initialize :set_defaults

  VALID_EMAIL_REGEX = /\A([\w+\-]\.?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i



  validates :email, presence: true,
                    uniqueness: {case_sensitive: false},
                    format: VALID_EMAIL_REGEX

  def full_name
    "#{first_name} #{last_name}".squeeze(" ").strip.titleize
  end

  private

  # def set_defaults
  #   self.admin ||= false
  # end


end
