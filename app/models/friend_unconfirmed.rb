class FriendUnconfirmed < ActiveRecord::Base
	self.table_name = 'friends_unconfirmed'

	def self.isUnconfirmed(id1, id2)
		count = FriendUnconfirmed.where(user_1: [id1, id2], user_2: [id1, id2]).first

		if count 
			return true 
		else		
			return false
		end
	end

	def self.needsUserConfirmation(userId, friendId)
		count = FriendUnconfirmed.where(user_1: friendId, user_2: userId).first

		if count 
			return true 
		else		
			return false
		end
	end
end
