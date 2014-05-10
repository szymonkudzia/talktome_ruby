class LocalizationController < BaseController #musi dziedziczyć z tej klasy!
  def localization
  	puts params # w tej zmiennej są dostępne post parametry
  	response = {}

  	if params["locale"] #fetch localization data
  		localization = {}
  		Localization.where(localization: params["locale"]).each do |l|
  			localization[l.fieldName] = l.value
  		end
  		response = localization

  	else # fetch only available languages
  		localization = []
  		Localization.where(fieldName: "languageName").each do |l|
  			localization << {code: l.localization, name: l.value}
  		end

  		response = {data: localization}
  	end
  	
  	render :json => response
  end
end
