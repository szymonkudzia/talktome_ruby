class Localization < ActiveRecord::Base
	# attr_accessible :localization, :fieldName, :value

	def self.getTranslationFor(fieldName, localization)
		translation = Localization.where(fieldName: fieldName, localization: localization).first

		if translation
			return translation.value
		else
			translation = Localization.where(fieldName: fieldName, localization: 'en-us').first

			if translation
				return translation.value
			else
				return fieldName
			end
		end
	end
end
