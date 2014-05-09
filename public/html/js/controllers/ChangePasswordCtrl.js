talkToMeApp.controller('ChangePasswordCtrl', function ($scope, $routeParams, $location, MainService, WorkersNotifierService, ChangePasswordService) {
	$scope.session = MainService.session
	//$scope.selectedLocale = $scope.session.localization.currentLocale;
	var Notifier = WorkersNotifierService;

	$scope.disableSubmitButtons = false;


	$scope.passwordChangeCode = $routeParams.passwordChangeCode;

	$scope.loginForm = {
		error: false
	};

	$scope.generatePasswordChangeCode = function () {
		console.log('Sending request to password change service');
		$scope.disableSubmitButtons = true;

		Notifier.addWorker(
			worker = function (params, success, failure) {
				ChangePasswordService.generateCode(params.email, success, failure);
			},
			params = { email: $scope.email },
			success = function (data) { // on success
				console.log('Code generation succeeded!')
				$scope.codeGenerationSucceed = true;

				setTimeout(function () {
					$scope.$apply(function () {
						$location.path('/login');
					})
				}, 2000);
			},
			failure = function (error) { // on failure
				console.log('Code generattion failed');
				$scope.codeGenerationSucceed = false;
				$scope.disableSubmitButtons = false;
			});
	};


	$scope.changePassword = function () {
		$scope.disableSubmitButtons = true;

		Notifier.addWorker(
			worker = function (params, success, failure) {
				ChangePasswordService.changePassword(params.code, params.password, success, failure);
			},
			params = { password: $scope.password, code: $scope.passwordChangeCode },
			success = function (data) { // on success
				console.log('Changing password succeeded!')
				$scope.changingPasswordSucceed = true;

				setTimeout(function () {
					$scope.$apply(function () {
						$location.path('/login');
					})
				}, 2000);
			},
			failure = function (error) { // on failure
				console.log('Changing password failed');

				$scope.changingPasswordSucceed = false;
				$scope.disableSubmitButtons = false;
			});
	};



	$scope.$watch('passwordRepeated', function (newValue, oldValue) {
		if ($scope.password !== newValue) {
			$scope.changePasswordForm.repeatedPassword.$setValidity('different', false);
		} else {
			$scope.changePasswordForm.repeatedPassword.$setValidity('different', true);
		}
	});



	$scope.onLanguageChange = function () {
		MainService.changeLocale($scope.selectedLocale);
	}


	$scope.showLoadingBar = function () {
		return Notifier.hasActiveWorker();
	}
});