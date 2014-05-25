class Interest < ActiveRecord::Base
	def self.getCountriesForUser(userId)
		countries = Set.new

		Interest.where(interes_type: 1, userId: userId).each do |i|
			country = Country.where(countryCode: i.interest).first

			if country
				countries.add(country)
			end
		end

		return countries.to_a
	end

	def self.getInterestsForUser(userId) 
		return Interest.where('interes_type != ? and userId = ?', 1, userId)
	end
end
