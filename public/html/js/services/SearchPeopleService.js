talkToMeApp.service('SearchPeopleService', function ($resource, $locale) {
	var that = this;

	this.search = function (user, searchForm, successCallback) {
		$resource('service/searchPeople', {}, {
			get: {
				method: 'POST', isArray: true
			}
		})
		.get({user: user, data: searchForm}, function (result) {
			console.log("Found people: ", result);

			successCallback(result);
		});
	};
});
