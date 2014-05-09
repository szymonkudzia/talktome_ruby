talkToMeApp.controller('LoginCtrl', function ($scope, $http, $routeParams, $location, MainService, WorkersNotifierService) {
	$scope.session = MainService.session
	var Notifier = WorkersNotifierService;


	$scope.confirmation = $routeParams.confirmation;


	$scope.loginForm = {
		error: false
	};

	$scope.login = function () {
		console.log('Sending request to login service');

		Notifier.addWorker(
			worker = function (params, success, failure) {
				MainService.login(params.loginData, success, failure);
			},
			params = { loginData: $scope.loginForm },
			success = function (data) { // on success
				console.log('Login succeeded!')
				$location.path('/main/profile');
			},
			failure = function (error) { // on failure
				console.log('Login failed');
				$scope.loginForm.error = true;
			});


	};

	$scope.onLanguageChange = function (locale) {
		MainService.changeLocale(locale);
	}


	$scope.showLoadingBar = function () {
		return Notifier.hasActiveWorker();
	}
});