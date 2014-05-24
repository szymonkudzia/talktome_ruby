class Interest < ActiveRecord::Base
	def self.getCountriesForUser(userId)
		return Interest.where(type: 1, userId: userId)
	end

	def self.getInterestsForUser(userId) 
		return Interest.where('type != ? and userId = ?', 1, userId)
	end
end
