class UpdateUserController < BaseController
  def updateUser
  	user = params

  	u = User.where(id: user['id']).first
    puts u.attributes

    if u
    	u.email = user['email']
    	u.country = user['country']

      if user['birthdate']
    	 u.birthdate = Time.strptime(user['birthdate'], "%Y-%m-%d %H:%M:%S")
      end

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

      if user['countries']
        Interest.delete_all(userId: u.id, interes_type: 1)
        
        user['countries'].each do |country|
          Interest.new do |interest|
            interest.userId = user['id']
            interest.interes_type = 1
            interest.interest = country

            interest.save
          end
        end
      end
    end

    render :json => {}
  end
end
