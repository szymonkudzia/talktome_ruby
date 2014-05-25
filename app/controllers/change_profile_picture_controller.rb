class ChangeProfilePictureController < BaseController
  def changeProfilePicture
  	userId = params['userId']
  	profilePicture = params['file']


  	puts "coś jest do cholery nie tak!"

  	userPath = "/avatars/#{userId}_#{Random.rand(10000).to_s.rjust(5, "0")}.png"
  	servicePath = "public" + userPath

	File.open(servicePath, "wb") { |f| f.write(profilePicture.read) }

	User.where(id: userId).each do |u| 
		old = u.profilePicture

		u.profilePicture = userPath
		u.save

		puts "Old picture file: #{old}"
		if old.include? "/avatars/"
			pathToDelete = "public" + old
			puts "Deleting file: #{pathToDelete}"

			File.delete(pathToDelete)
		end
	end

  	render :json => {path: userPath}
  end
end
