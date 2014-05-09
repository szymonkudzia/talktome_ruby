talkToMeApp.directive('messageBaloon', function () {
	return {
		restrict: 'EA',
		scope: {
			type: '@',
		},
		templateUrl: 'html/views/partials/messageBaloon.html',
		transclude: true,
		link: function (scope, element, attrs, ngModelCtrl) {
		}
	}
})