class UpdateUserController < BaseController
  def updateUser
  	user = params

  	u = User.where(id: user['id']).first
    puts u.attributes

    if u
    	u.email = user['email']
    	u.country = user['country']
    	u.birthdate = Time.strptime(user['birthdate'], "%Y-%m-%d %H:%M:%S")
    	u.firstName = user['firstName']
    	u.lastName = user['lastName']
    	u.profilePicture = user['profilePicture']
    	u.men = user['men']
    	u.women = user['women']
    	u.sex = user['sex']
    	u.aboutMe = user['aboutMe']
    	u.telephone = user['telephone']
    	u.facebook = user['facebook']
    	u.googlep = user['googlep']

    	u.save

      #TODO update countries that user is interested in
    end

    render :json => {}
  end
end
