var talkToMeApp = angular.module('talkToMeApp', ['ngRoute', 'ngResource', 'ngCookies']);

talkToMeApp.config(['$routeProvider',
    function ($routeProvider) {
    	$routeProvider.
            when('/login/:confirmation?', {
            	templateUrl: '/html/views/login.html', controller: 'LoginCtrl'
            })
            .when('/register', {
            	templateUrl: 'html/views/register.html', controller: 'RegisterCtrl'
            })
			.when('/changePassword/:passwordChangeCode?', {
				templateUrl: 'html/views/changePassword.html', controller: 'ChangePasswordCtrl'
			})
            .when('/main/profile', {
                templateUrl: '/html/views/profile.html', controller: 'ProfileCtrl'
            })
            .when('/main/find', {
                templateUrl: '/html/views/find.html', controller: 'FindCtrl'
            })
            .when('/main/conversation', {
                templateUrl: '/html/views/conversation.html', controller: 'ConversationCtrl'
            })
            .when('/main/friends', {
                templateUrl: '/html/views/friends.html', controller: 'FriendsCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }]);

talkToMeApp.run(function($rootScope, $location) {
    $rootScope.location = $location; 
});



talkToMeApp.filter('dateToAge', function() {
  return function(input) {
    if (!input) return 0;
    
    var now = new Date(); //"now"
    var withoutTime = input.match(/\d{4}-\d{2}-\d{2}/g);
    var birthdate = new Date(Date.parse(withoutTime));

    return Math.floor((now - birthdate) / (60 * 60 * 24 * 365 * 1000));
    // return now.getFullYear() - birthdate.getFullYear();
  };
});

talkToMeApp.filter('languageCodeToCountryName', function (GetCountriesService) {
    return function (input) {
        var countryName;

        GetCountriesService.getCountryForLocale(input, function (country) {
            if (country)
                countryName = country.name;
            else
                countryName = '';
        });

        return countryName;
    };
});

