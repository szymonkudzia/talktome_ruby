require 'mail'
require 'digest/sha1'
require 'securerandom'

class RegisterController < BaseController
  def register
  		u = params

		user = User.new()
		
		salt = SecureRandom.hex

		user.email = u['email']
  		user.password = Digest::SHA1.hexdigest(u['password']+salt)
  		user.country = u['country']
  		user.birthdate = u['birthdate']
  		user.firstName = u['firstName']
  		user.lastName = u['lastName']
		user.salt = salt
		
  		user.save()

  		puts user.id

  		code = code_generator(15) + user.id.to_s

  		unc = UserNotConfirmed.new()
  		unc.userId = user.id
  		unc.code = code
  		unc.save()

  		puts unc.dateInserted

  		msg = prepareMessage(code, user.country)
  		subject = prepareSubject(user.country)

  		puts "message: #{msg}"


  		sendEmail(user.email, subject, msg)


  		render :json => {}
  end

	def code_generator(size=10, chars="QAZWSXEDCRFVTGBYHNUJMIKOLP1234567890".split(''))
		return chars.sample(size).join('')
	end


  def prepareMessage(code, localization)
		link = "http://localhost:3000/service/confirm?code=" + code 

		msg = Localization.where(fieldName: 'confirmationEmail', localization: localization).first

		return msg.value % link
	end

	def prepareSubject(localization)
		l = Localization.where(fieldName: 'confirmationEmailSubject', localization: localization).first

		return l.value
	end

	def sendEmail(email, subject, msg)
		puts "sending email to: #{email}"
		options = { 
			:address		      => "smtp.gmail.com",
            :port                 => 587,
            :domain               => 'your.host.name',
            :user_name            => 'talktome.student.project',
            :password             => 'jakieshaslo',
            :authentication       => 'plain',
            :enable_starttls_auto => true  }
            
		Mail.defaults do
		  delivery_method :smtp, options
		end

		Mail.deliver do
		       to email
		     from 'talktome.student.project@talktome.com'
		  subject subject
		     body msg
		end
	end
end