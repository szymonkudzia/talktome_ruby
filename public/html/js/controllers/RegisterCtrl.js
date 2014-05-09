talkToMeApp.controller('RegisterCtrl', function ($scope, $http, $location, MainService, RegisterService) {
	var that = this;

	$scope.session = MainService.session;
	$scope.countries = [{ code: 'pl-pl', name: 'Polska' }, { code: 'en-us', name: 'United States of America' }];

	$scope.registerForm = {
		firstName: 'a',
		lastName: 'a',
		birtdate: '2013-01-01',
		country: 'Polska',
		email: 'szymonkudzia@gmail.com',
		password: 'a',
		passwordRepeated: 'a'
	};

	$scope.registrationSuccess = false;

    $scope.registerForm = {
    	error: {
    		addressEmailDuplication: false,
    		serverUnaviable: false
    	}
    };

    $scope.register = function () {
        console.log('Sending request to register service');

        RegisterService.register($scope.registerForm, function (data) {
        	if (!data.error) {
        		console.log('Registration success! :)');

        		$scope.registrationSuccess = true;
        		$scope.registerForm.error.addressEmailDuplication = false;
        	} else {
        		console.log('Registration failure! :(');

        		$scope.registrationSuccess = false;
        		$scope.registerForm.error.addressEmailDuplication = true;
        	}
        }, function () {
        	console.log('Registration failure! :(');
        	$scope.registerForm.error.serverUnaviable = true;
        });
    };

    $scope.onLanguageChange = function () {
    	MainService.changeLocale($scope.selectedLocale);
    }


    $scope.$watch('registerForm.country', function (newValue, oldValue) {
    	if (newValue && !oldValue) { 
    		$('#inputCountry').removeClass('selectPlaceholder');
    	}
    });

    $scope.$watch('registerForm.passwordRepeated', function (newValue, oldValue) {
    	if (!$scope.registerForm)
    		return;

    	if ($scope.registerForm.password !== newValue) {
    		$scope.form.passwordRepeated.$setValidity('different', false);
    	} else {
    		$scope.form.passwordRepeated.$setValidity('different', true);
    	}
    });
});