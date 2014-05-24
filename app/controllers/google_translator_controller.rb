require 'net/http'

class GoogleTranslatorController < BaseController
	def googleTranslator
		url = "/get?q=%s&langpair=%s|%s" % [params['text'], params['fromLanguage'], params['toLanguage']]

		data = Net::HTTP.get('api.mymemory.translated.net', url)

		render :json => data
	end
end
