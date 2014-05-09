talkToMeApp.service('GetCountriesService', function ($resource, $locale) {
	var that = this;
	that.countries = undefined;

	this.getCountries = function (user, successCallback) {
		if (!that.countries) { 
			$resource('service/getCountries', {}, {
				get: {
					method: 'POST', isArray: true
				}
			})
			.get(user, function (countries) {
				console.log("Fetched countries list: ", countries);
				that.countries = countries;

				successCallback(countries);
			});
		} else {
			successCallback(that.countries)
		}
	};

	this.getCountryForLocale = function(locale, successCallback) {
		if (!locale) successCallback(undefined);
		
		if (!that.localeMap) {
			if (that.countries) {
				that.localeMap = [];

				for (var i = 0; i < that.countries.length; ++i) {
					that.localeMap[that.countries[i].countryCode] = that.countries[i]
				}
			}
		} 


		if (that.localeMap)
			successCallback(that.localeMap[locale]);
		else 
			successCallback(undefined);
	};
});