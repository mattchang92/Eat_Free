class User < ApplicationRecord
  has_secure_password
  has_many :stats, dependent: :destroy
  has_many :foodlogs, dependent: :destroy

  # before_create :generate_api_key


  # after_initialize :set_defaults

  VALID_EMAIL_REGEX = /\A([\w+\-]\.?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i



  validates :email, presence: true,
                    uniqueness: {case_sensitive: false},
                    format: VALID_EMAIL_REGEX,
                    unless: :from_oauth?


  serialize :fitbit_data, Hash


  def full_name
    "#{first_name} #{last_name}".squeeze(" ").strip.titleize
  end

  def token_refresh(fitbit_data,user)
    if user.fitbit_access_token != fitbit_data["credentials"]["token"]
      user.fitbit_access_token = fitbit_data["credentials"]["token"]
      user.fitbit_refresh_token = fitbit_data["credentials"]["refresh_token"]
      user.save
    end
  end

  def self.find_from_omniauth(fitbit_data)
    User.where(provider: fitbit_data["provider"], uid: fitbit_data["uid"].first)
  end

  def from_oauth?
    uid.present? && provider.present?
  end

  def from_fitbit?
    uid.present? && provider == "fitbit"
  end

  def self.find_or_create_from_fitbit(fitbit_data)
    find_by_fitbit(fitbit_data) || create_from_fitbit(fitbit_data)
  end

  def self.find_by_fitbit(fitbit_data)
    find_by(uid: fitbit_data["uid"], provider: fitbit_data["provider"])
  end

  def self.create_from_fitbit(fitbit_data)
    full_name = fitbit_data["info"]["full_name"].split(" ")
    create!(first_name: full_name[0],
            last_name: full_name[1],
            uid: fitbit_data["uid"],
            provider: fitbit_data["provider"],
            fitbit_access_token: fitbit_data["credentials"]["token"],
            fitbit_refresh_token: fitbit_data["credentials"]["refresh_token"],
            password: SecureRandom.hex(32),
            fitbit_raw_data: fitbit_data)
  end

  private

  # def generate_api_key
  #   loop do
  #     self.api_key = SecureRandom.hex(32)
  #     break unless User.find_by_api_key(self.api_key)
  #   end
  # end

end
