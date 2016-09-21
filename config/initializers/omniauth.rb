Rails.application.config.middleware.use OmniAuth::Builder do
  provider :fitbit, ENV['FITBIT_CLIENT_KEY'], ENV['FITBIT_CLIENT_SECRET'], scope: "nutrition profile weight"
end
