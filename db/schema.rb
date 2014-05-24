# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140524102135) do

  create_table "countries", force: true do |t|
    t.string   "countryCode"
    t.string   "countryLabel"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "friends", force: true do |t|
    t.integer  "user_1"
    t.integer  "user_2"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "friends_unconfirmed", force: true do |t|
    t.integer  "user_1"
    t.integer  "user_2"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "interests", force: true do |t|
    t.integer  "userId"
    t.integer  "type",       default: 0
    t.string   "interest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "localizations", force: true do |t|
    t.string   "localization"
    t.string   "fieldName"
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "messages", force: true do |t|
    t.integer  "from"
    t.integer  "to"
    t.string   "message"
    t.datetime "dateInserted"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "new_messages", force: true do |t|
    t.integer  "from"
    t.integer  "to"
    t.string   "message"
    t.datetime "dateInserted", default: '2014-05-24 13:13:35'
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "password"
    t.string   "country"
    t.date     "birthdate"
    t.string   "firstName"
    t.string   "lastName"
    t.string   "profilePicture", default: "html/img/noProfilePicture.png"
    t.integer  "men",            default: 1
    t.integer  "women",          default: 1
    t.integer  "sex",            default: 1
    t.string   "aboutMe"
    t.string   "telephone"
    t.string   "facebook"
    t.string   "googlep"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users_not_confirmed", force: true do |t|
    t.integer  "userId"
    t.string   "code"
    t.datetime "dateInserted", default: '2014-05-24 13:13:34'
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
