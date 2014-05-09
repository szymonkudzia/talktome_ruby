talkToMeApp.controller('MainCtrl', function ($scope, $routeParams, $location, MainService) {
	$scope.session = MainService.session;

	$scope.enterPage = function () {
		$('.slideInPageContainer').show("slide", {duration: 500, direction: "up"});
	};
});