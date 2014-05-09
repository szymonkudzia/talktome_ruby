talkToMeApp.controller('FindCtrl', 
	function ($scope, $http, $routeParams, $location, 
			MainService, WorkersNotifierService, ResrictAccessService,
			SlideInPageService, SlideOutPageService, SearchPeopleService,
			FriendListService) {
	ResrictAccessService.blockUnlogged();
	var SLIDE_SPEED = 150;
	// $scope.session = MainService.session MainService,

	$scope.deffaultSearchSettings = true;

	$scope.initialize = function() {
		$('.changeSearchSettingsForm').slideUp({duration: 0});

		var years = []
		for (var i = 18; i < 101; ++i) {
			years.push({label: i, value: i});
		}

		MainService.addOptionsToSelect('#ageBottom', years);
		MainService.addOptionsToSelect('#ageUp', years);
		$("#ageUp").val(100);
	}();

	$scope.onChangeSearchSettingsClick = function () {
		$('.changeSearchSettings').slideUp({
			duration: SLIDE_SPEED,
			complete: function () {
				$('.changeSearchSettingsForm').slideDown({duration: SLIDE_SPEED})
			}
		});
	};

	$scope.onSaveSearchSettings = function() {
		$('.changeSearchSettingsForm').slideUp({
			duration: SLIDE_SPEED,
			complete: function () {
				$('.changeSearchSettings').slideDown({duration: SLIDE_SPEED})
			}
		});

		$scope.deffaultSearchSettings = false;
		$scope.searchPeople();

		//TODO change search settings and reload search results
	};

	$scope.onCancelChangeSearchSettings = function() {
		$('.changeSearchSettingsForm').slideUp({
			duration: SLIDE_SPEED,
			complete: function () {
				$('.changeSearchSettings').slideDown({duration: SLIDE_SPEED})
			}
		});
	};


	$scope.onVisitCardClick = function (person) {
		
		$scope.hideSearch(
			$scope.showProfile
		);
		
		$scope.selectedPerson = person;
	};

	$scope.onBackClick = function () {
		$scope.hideProfile(
			$scope.showSearch
		);
	}


	$scope.hideSearch = function (onComplete) {
		$('#search').hide("slide", {duration: 500, direction: "up", complete: onComplete});
	};

	$scope.showSearch = function (onComplete) {
		$('#search').show("slide", {duration: 500, direction: "up", complete: onComplete});
	};

	$scope.hideProfile = function (onComplete) {
		$('#profile').hide("slide", {duration: 500, direction: "up", complete: onComplete});
	};

	$scope.showProfile = function (onComplete) {
		$('#profile').show("slide", {duration: 500, direction: "up", complete: onComplete});
	};



	$scope.searchPeople = function () {
		SearchPeopleService.search(MainService.session.user, $scope.modifiedSearchSettings, function (people) {
			$scope.searchResults = people;
		});
	};



	$scope.searchResults = [];
	$scope.modifiedSearchSettings = {
		lowerAge: 18,
		upperAge: 100,
		men: true,
		women: true,
		aboutMe: MainService.session.user.aboutMe,
		email: MainService.session.user.email,
		telephone: MainService.session.user.telephone,
		facebook: MainService.session.user.facebook,
		googlep: MainService.session.user.googlep,
		countries: MainService.session.user.countries,
		interests: MainService.session.user.interests
	};
	$scope.searchPeople();


	$scope.$on("$viewContentLoaded", function () {
		$('#interests').multiselect(MainService.multiselectOptions($scope.$parent.session.localization.chooseInterests));
		$('#locations').multiselect(MainService.multiselectOptions($scope.$parent.session.localization.chooseCountries));
	});

	$scope.$on('countriesRenderingFinished', function () {
		$('#locations').multiselect("rebuild");

		if (MainService.session.countries.length > 0 && $scope.modifiedSearchSettings.countries) {
			for (var i = 0; i < $scope.modifiedSearchSettings.countries.length; ++i) 
				$('#locations').multiselect('select', $scope.modifiedSearchSettings.countries[i])

			$('#locations').multiselect('refresh');
		}
	});


	$scope.$on('interestsRenderingFinished', function () {
		$('#interests').multiselect("rebuild");

		if (MainService.session.interests.length > 0 && $scope.modifiedSearchSettings.interests) {
			for (var i = 0; i < $scope.modifiedSearchSettings.interests.length; ++i) 
				$('#interests').multiselect('select', $scope.modifiedSearchSettings.interests[i])

			$('#interests').multiselect('refresh');
		}
	});


	$scope.addFriend = function () {
		var selectedPerson = $scope.selectedPerson;

		FriendListService.addFriend(
			MainService.session.user,
			selectedPerson,
			function () {
				// selectedPerson.confirmed = false;

				// MainService.session.friends.push(selectedPerson);
				MainService.reloadFriendList();
				$scope.searchPeople();
			})

		$scope.onBackClick();
	}
});