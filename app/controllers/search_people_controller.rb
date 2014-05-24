class SearchPeopleController < BaseController
    def searchPeople
        user = params['user']
        data = params['data']
        
        people = User.findPeople(data['countries'], data['interests'], data['lowerAge'], data['upperAge'], data['men'], data['women'])

        puts "Found people: #{people}"

        
        searchResult = []
        people.each do |p|
        	person = p.attributes

            if Friend.areFriends(user['id'], person['id']) ||  person['id'] == user['id']
                next
            end

            person['birthdate'] = person['birthdate'].strftime("%Y-%m-%d %H:%M:%S")
            person['men'] = person['men'] > 0
            person['women'] = person['women'] > 0


            searchResult.append(decorateUser(person, user['country']))
        end

        render :json => searchResult
    end

    def decorateUser(person, localization)
        countries = []
        Interest.getCountriesForUser(person['id']).each do |c|
        	country = c.attributes

            country['name'] = Localization.getTranslationFor(country['countryLabel'], localization)
            countries.append(country)
        end


        interests = []
        Interest.getInterestsForUser(person['id']).each do |i|
        	interests = i.attributes
            interests.append(interest)
        end


        person['countries'] = countries
        person['interests'] = interests
        
        return person
    end
end
