talkToMeApp.directive('personPicker', function () {
	return {
		restrict: 'EA',
		scope: {
			pictureUrl: '@',
			name: '@',
			onClick: '&'
		},
		templateUrl: 'html/views/partials/personPicker.html',
		link: function (scope, element, attrs, ngModelCtrl) {
			scope.pickPerson = function () {
				if (onClick) 
					onClick();
			}
		}
	}
})