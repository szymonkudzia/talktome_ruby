class LoginController < BaseController
  def login
	if !params['email'] and params['password']
		render :json => {"null" => "true"}
		return
	end

	user = User.where(email: params['email'], password: params['password']).first

	if user
		if !UserNotConfirmed.where(userId: user.id).first
			user.password = nil
			user = user.attributes

			user['birthdate'] = user['birthdate'].strftime("%Y-%m-%d %H:%M:%S")
			render :json => decorateUser(user)
			return
		end
	end

	render :json => {"null" => "true"}
  end

  def decorateUser(user)
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


    user['countries'] = countries
    user['interests'] = interests
    
    return user
  end
end
