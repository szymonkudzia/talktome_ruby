talkToMeApp.controller('FriendsCtrl', 
	function ($scope, $http, $routeParams, $location, 
			MainService, WorkersNotifierService, ResrictAccessService,
			SlideInPageService, SlideOutPageService, SearchPeopleService,
			FriendListService) {
	ResrictAccessService.blockUnlogged();
	var SLIDE_SPEED = 150;
	// $scope.session = MainService.session MainService,


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


	$scope.deleteFriend = function () {
		var selectedPerson = $scope.selectedPerson;

		FriendListService.deleteFriend(
			MainService.session.user, 
			selectedPerson,
			function () {
				// var ind = MainService.session.friends.indexOf(selectedPerson);
				// MainService.session.friends.splice(ind, 1);
				MainService.reloadFriendList();
			});

		$scope.confirmed = true;
		$scope.onBackClick();
	};

	$scope.confirmFriend = function () {
		var selectedPerson = $scope.selectedPerson;

		FriendListService.confirmFriend(
			MainService.session.user, 
			selectedPerson, 
			function () {
				selectedPerson.confirmed = true;
			});

		$scope.confirmed = true;
		$scope.onBackClick();
	}


	$scope.confirmed = true;
	$scope.changeFriendsType = function (type) {
		if (type === 1) {
			$scope.confirmed = true;
		} else {
			$scope.confirmed = false;
		}
	}

	$scope.showPerson = function (person) {
		return person.confirmed === $scope.confirmed;
	}


});