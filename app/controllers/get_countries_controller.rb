class GetCountriesController < BaseController
  def getCountries
 		user = params

        countries = []
        Country.find_each do |c|

            l = Localization
            	.where(fieldName: c.countryLabel, 
            		   localization: user['country'])
            	.first
           
           	if l
           		countryName = l.value
	            country = {}

	            country['countryLabel'] = c.countryLabel
	            country['countryCode'] = c.countryCode
	            country['name'] = countryName
	            
	            countries.append(country)
        	end
        end

        puts "GetCountries response: #{countries}"

  	render :json => countries
  end
end
