# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'digest/sha1'
require 'securerandom'

user = User.new()
salt = SecureRandom.hex
user.salt = salt
user.email = 'admin1@ttm.com'
user.password = Digest::SHA1.hexdigest('admin1'+salt)
user.country = 'pl-pl'
user.birthdate = '1990-12-31'
user.firstName = 'Brad'
user.lastName = 'Pit'
user.save()

user = User.new()
salt = SecureRandom.hex
user.salt = salt
user.email = 'admin2@ttm.com'
user.password = Digest::SHA1.hexdigest('admin2'+salt)
user.country = 'en-us'
user.birthdate = '1990-12-31'
user.firstName = 'Angelina'
user.lastName = 'Jole'
user.save()

user = User.new()
salt = SecureRandom.hex
user.salt = salt
user.email = 'admin3@ttm.com'
user.password = Digest::SHA1.hexdigest('admin3'+salt)
user.country = 'pl-pl'
user.birthdate = '1990-12-31'
user.firstName = 'Jozin'
user.lastName = 'Z Bazin'
user.save()