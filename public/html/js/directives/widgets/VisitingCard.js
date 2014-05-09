talkToMeApp.directive('visitingCard', function () {
	return {
		restrict: 'EA',
		scope: {
			pictureUrl: '@',
			name: '@',
			age: '@',
			country: '@',
			tags: '@',
			onClick: '&onClick'
		},
		templateUrl: 'html/views/partials/visitingCard.html',
		link: function (scope, element, attrs) {
		}
	}
})