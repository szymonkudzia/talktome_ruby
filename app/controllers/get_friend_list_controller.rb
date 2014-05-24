class GetFriendListController < BaseController
	def getFriendList
		user = User.where(id: params['userId']).first
        
        friendsIds = Friend.getFriendsIds(user['id'])
        friends = []

        friendsIds.each do |f|
            friend = User.where(id: f).first.attributes

        	friend['birthdate'] = friend['birthdate'].strftime("%Y-%m-%d %H:%M:%S")
        	friend = decorateUser(friend, user)

            friends.append(friend)
		end            

        render :json => friends
	end


    def decorateUser(person, user)
		countries = []
	    Interest.getCountriesForUser(user['id']).each do |c|
	    	country = c.attributes

	        country['name'] = Localization.getTranslationFor(country['countryLabel'], user['country'])
	        countries.append(country)
	    end


	    interests = []
	    Interest.getInterestsForUser(user['id']).each do |i|
	    	interests = i.attributes
	        interests.append(interest)
	    end


		person['countries'] = countries
		person['interests'] = interests
		person['confirmed'] = !FriendUnconfirmed.isUnconfirmed(person['id'], user['id'])

		if !person['confirmed']
			person['needsUserConfirmation'] = FriendUnconfirmed.needsUserConfirmation(user['id'], person['id'])
		end


		return person
	end
end
