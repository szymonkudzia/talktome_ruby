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
			# user['birthdate'] = user['birthdate'].strftime("%Y-%m-%d %H:%M:%S")
			render :json => decorateUser(user)
			return
		end
	end

	render :json => {"null" => "true"}
  end

  def decorateUser(user)
  	return user
  end
end
