class User < ActiveRecord::Base
	def self.findPeople(countries, interests, lowerAge, upperAge, men, women)
		sex = ["0", "0"]
		sex[0] = "1" if men
		sex[1] = "2" if women


		query = "(sex = %s or sex = %s)"
		query = query % sex

		if countries && countries.length > 0
			countryConstraint = ' AND ('
			countries.each_with_index do |country, i|
				countryConstraint += "country = '%s'" % country

				if i < countries.length - 1
					countryConstraint += ' or '
				end
			end

			countryConstraint += ')'

			query += countryConstraint
		end


		# ageConstraint = ' AND ('
		# ageConstraint += 'floor(datediff(curdate(),birthdate) / 365) >= ' + str(lowerAge)
		# ageConstraint += ' AND '
		# ageConstraint += 'floor(datediff(curdate(),birthdate) / 365) <= ' + str(upperAge)
		# ageConstraint += ')'
		# query += ageConstraint

		return User.where(query)
	end
end
