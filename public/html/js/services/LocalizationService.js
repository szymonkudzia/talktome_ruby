talkToMeApp.service('LocalizationService', function ($resource, $locale) {
	var that = this;
	that.locale = null;
	that.languages = null;
	that.localizationData = null;


	this.getLocale = function () {
		return that.locale;
	};

	this.setLocale = function (locale, successCallback) {
		if (that.locale === locale) return;

		that.locale = locale;

		this.loadLocalizationData(successCallback);
	};

	this.getLanguages = function (successCallback) {
		if (that.languages == null) {
			that.fetchLanguages(function (languages) { successCallback(languages) });
		} else {
			successCallback(that.languages);
		}
	}

	this.loadLocalizationData = function (successCallback) {
		if (that.locale == null) {
			that.locale = this.detectLocale();
		}

		that.fetchLocalizationData(successCallback);
	};

	this.getLocalizationData = function (successCallback) {
		if (that.localizationData == null) {
			this.loadLocalizationData(successCallback);
			return;
		}

		successCallback(that.localizationData);
	};

	this.detectLocale = function () {
		return $locale.id;
	};


	this.isLocaleSupported = function(locale) {
		for (i = 0; i < that.languages.length; ++i) {
			if (that.languages[i].code === locale)
				return true;
		}

		return false;
	};


	that.fetchLanguages = function (successCallback) {
		$resource('service/localization', {}, {
			send: {
				method: 'POST'
			}
		})
		.send({}, function (lan) {
			if (lan['null']) {
				console.log("Cannot fetch languages!");
			} else {
				console.log("Fetched languages: ", lan);
				that.languages = lan.data;

				successCallback(that.languages);
			}
		});
	};


	that.fetchLocalizationData = function (successCallback) {
		$resource('service/localization', {}, {
			send: {
				method: 'POST'
			}
		})
		.send(that.locale, function (data) {
			if (data['null']) {
				console.log("Cannot fetch localization data for: " + locale);
			} else {
				console.log("Fetched localization data: ", data);
				that.localizationData = data;

				successCallback(that.localizationData);
			}
		});
	};
});