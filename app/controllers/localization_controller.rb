class LocalizationController < BaseController #musi dziedziczyć z tej klasy!
  def localization
  	puts params # w tej zmiennej są dostępne post parametry

  	map = {loginError: 'dafadfljafajdfladjf', 
            loginButton: 'hahahaha'
        }
  	render :json => map
  end
end
