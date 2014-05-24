class Friend < ActiveRecord::Base
	def self.areFriends(id1, id2)
		count = Friend.where(user_1: [id1, id2], user_2: [id1, id2]).first

		if count 
			return true 
		else		
			return false
		end
	end

	def self.getFriendsIds(userId) 
		friendIds = Set.new

		Friend.where(user_1: userId).each do |f|
			friendIds.add(f.user_2)
		end

		Friend.where(user_2: userId).each do |f|
			friendIds.add(f.user_1)
		end

		return friendIds.to_a
	end
end
