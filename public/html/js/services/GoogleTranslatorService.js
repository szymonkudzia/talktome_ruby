talkToMeApp.service('GoogleTranslatorService', function ($resource, $locale) {
	var that = this;

	this.translate = function (text, fromLanguage, toLanguage, successCallback) {
		$resource('service/translateText', {}, {
			get: {
				method: 'POST'
			}
		})
		.get({text: text, fromLanguage: fromLanguage, toLanguage: toLanguage}, function (text) {
			console.log("Translated text: ", text);

			if (text) {
				if (text.matches && text.matches.length > 0) { 
					var translations = [];

					for (var i = 0; i < text.matches.length; ++i) {
						translations.push(text.matches[i].translation);
					}

					successCallback(translations);
				}
			}
		});
	};
});
