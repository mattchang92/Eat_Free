# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160914040221) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "foodlogs", force: :cascade do |t|
    t.integer  "servings"
    t.integer  "recipe_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_foodlogs_on_recipe_id", using: :btree
    t.index ["user_id"], name: "index_foodlogs_on_user_id", using: :btree
  end

  create_table "recipes", force: :cascade do |t|
    t.string   "name"
    t.text     "ingredients"
    t.integer  "calories"
    t.integer  "servings"
    t.float    "fats"
    t.float    "carbs"
    t.float    "proteins"
    t.string   "tag"
    t.string   "photo"
    t.text     "directions"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "stats", force: :cascade do |t|
    t.integer  "age"
    t.string   "sex"
    t.float    "weight"
    t.integer  "height"
    t.float    "activity_level"
    t.integer  "calories"
    t.float    "weight_loss_rate"
    t.integer  "user_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["user_id"], name: "index_stats_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["email"], name: "index_users_on_email", using: :btree
  end

  add_foreign_key "foodlogs", "recipes"
  add_foreign_key "foodlogs", "users"
  add_foreign_key "stats", "users"
end
