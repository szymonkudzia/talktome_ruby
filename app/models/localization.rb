class Localization < ActiveRecord::Base
	# attr_accessible :localization, :fieldName, :value

	def self.getTranslationFor(fieldName, localization)
		translation = Localization.where(fieldName: fieldName, localization: localization).first

		if translation
			return translation.value
		else
			return Localization.where(fieldName: fieldName, localization: 'en-us').first.value
		end
	end
end
