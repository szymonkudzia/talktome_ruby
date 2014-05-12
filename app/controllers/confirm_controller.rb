class ConfirmController < BaseController
  def confirm
  	puts "Code: #{params["code"]}"

  	unc = UserNotConfirmed.where(code: params["code"]).first

  	if unc
  		unc.delete()
  		redirect_to "/#/login/true"
  	else
  		redirect_to "/#/login/false"
  	end

  end
end
