talkToMeApp.controller('ProfileCtrl', function ($scope, $http, $routeParams, $location,
	MainService,  WorkersNotifierService, ResrictAccessService, SlideInPageService,
	UpdateUserService, ChangeProfilePictureService) {
	ResrictAccessService.blockUnlogged();

	// $scope.session = MainService.session MainService,
	MainService.session.interests = ['Filmy','Muzyka','Gry','Książki', 'Sport'];



	$scope.$on("$viewContentLoaded", function () {
		$('#hobbies').multiselect(MainService.multiselectOptions($scope.$parent.session.localization.chooseInterests));
		$('#locations').multiselect(MainService.multiselectOptions($scope.$parent.session.localization.chooseCountries));
	});

	

	$scope.logout = MainService.logout;


	$scope.userSettings = {
		aboutMe: MainService.session.user.aboutMe,
		email: MainService.session.user.email,
		telephone: MainService.session.user.telephone,
		facebook: MainService.session.user.facebook,
		googlep: MainService.session.user.googlep,
		countries: MainService.session.user.countries,
		interests: MainService.session.user.interests
	}
	$scope.userSettingsModified = false;



	$scope.$watch('userSettings', function (newValue, oldValue) {
		if (newValue==oldValue) return false;

		$scope.userSettingsModified = true;
	}, true);


	
	$scope.saveUserSettings = function() {
		$scope.userSettingsModified = false;

		var user = {}

		for (var property in MainService.session.user)
			user[property] = MainService.session.user[property];

		for (var property in $scope.userSettings)
			user[property] = $scope.userSettings[property];

		UpdateUserService.update(user, function () {
			for (var property in $scope.userSettings)
				MainService.session.user[property] = $scope.userSettings[property];

			$scope.$emit('countriesRenderingFinished');
			$scope.$emit('interestsRenderingFinished');
		});
	}



	$scope.$on('countriesRenderingFinished', function () {
		$('#locations').multiselect("rebuild");

		if (MainService.session.countries.length > 0 && $scope.userSettings.countries) {
			for (var i = 0; i < $scope.userSettings.countries.length; ++i) 
				$('#locations').multiselect('select', $scope.userSettings.countries[i])

			$('#locations').multiselect('refresh');
		}
	});


	$scope.$on('interestsRenderingFinished', function () {
		$('#hobbies').multiselect("rebuild");

		if (MainService.session.interests.length > 0 && $scope.userSettings.interests) {
			for (var i = 0; i < $scope.userSettings.interests.length; ++i) 
				$('#hobbies').multiselect('select', $scope.userSettings.interests[i])

			$('#hobbies').multiselect('refresh');
		}
	});


	$scope.changeProfilePicture = function () {
		$('#newProfilePicture').click();

		$('#newProfilePicture').unbind('change.loadNewPorfilePicture').bind('change.loadNewPorfilePicture', function () {
			var file = $('#newProfilePicture').prop("files")[0];
			console.log('file is ' + JSON.stringify(file));

			ChangeProfilePictureService.changeProfilePicture(MainService.session.user.id, file, function (pathToFile) {
				MainService.session.user.profilePicture = pathToFile;
			})

			console.log("picture file loading finished!");
		});
	};
});