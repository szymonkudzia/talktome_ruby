talkToMeApp.service('MainService', function ($rootScope, $locale, $cookies, $location,
		LocalizationService, LoginService, FriendListService, GetCountriesService) {
	that = this;
	this.session = {
		user: {},
		localization: {},
	};
	this.storage = sessionStorage;

	this.reloadFriendList = function () {
		FriendListService.getFriendList(that.session.user.id, function (friends) {
				// TODO should friends be overwritten?
				// what about existing messages?

				// for (var property in friends)
				// 	that.session.friends[property] = friends[property];
				that.session.friends = friends
				that.session.activeFriendInConversation = friends[0];
			});
	}
	
	var sessionFromCookie = that.storage.talkToMeApp;
	if (sessionFromCookie && sessionFromCookie !== "undefined") {
		this.session = JSON.parse(sessionFromCookie);

		if (this.session.user.id) { 
			GetCountriesService.getCountries(that.session.user, function (countries) {
				that.session.countries = countries;
			});

			
			that.reloadFriendList();


			if ($location.path().indexOf('main') < 0)
				$location.path(CONFIG.pageLoadAfterRestart);
		}
	} else {
		
	}


	$rootScope.$watch(function() {
  		return JSON.stringify(that.session);
	}, function () {
		that.storage.talkToMeApp = JSON.stringify(that.session);
	});



	LocalizationService.getLanguages(function (languages) {
		that.session.localization.languages = languages;

		if (that.session.localization.locale == undefined)
			that.session.localization.locale = languages[0].code;

		LocalizationService.setLocale(that.session.localization.locale, function (localizationData) {
			$.extend(that.session.localization, localizationData);
		});
	});




	this.login = function (loginForm, successCallback, failureCallback) {
		LoginService.send(loginForm, function (data) {
			console.log("Got response from LoginService, response: ", data);

			if (data['null']) {
				if (failureCallback)
					failureCallback();
			} else {
				that.session.user = data;

				FriendListService.getFriendList(that.session.user.id, function (friends) {
					that.session.friends = friends;
					that.session.activeFriendInConversation = friends[0];
				});

				GetCountriesService.getCountries(that.session.user, function(countries) {
					that.session.countries = countries;
				});

				if (successCallback)
					successCallback();
			}
		});
	};

	this.logout = function () {
		that.session.user = {};

		delete that.storage[talkToMeApp]; // TODO that should be commented?

		$location.path('/');
	};

	this.changeLocale = function (locale) {
		that.session.localization.locale = locale;
		
		LocalizationService.setLocale(locale, function (localizationData) {
			$.extend(that.session.localization, localizationData);
		});
	};
	




	this.multiselectOptions = function(text, onChange) {
		return {
			buttonContainer: '<div class="btn-group fill-x" />',
			buttonClass: 'btn btn-default fill-x border-color',
			buttonWidth: '100%',
			buttonText: function (options, select) {
				return text + ' <b class="caret"></b>'
			},
			onChange: onChange
		};
	};

	this.addOptionsToSelect = function(select, data) {
		for (pair in data) {
			$(select).append("<option value=" + data[pair].value + ">" + data[pair].label + "</option>");
		}
	}
});