talkToMeApp.service('UpdateUserService', function ($resource, $locale) {
	var that = this;

	this.update = function (user, successCallback) {
		$resource('service/updateUser', {}, {
			update: {
				method: 'POST'
			}
		})
		.update(user, function (friends) {
			console.log("User updated!");

			successCallback();
		});
	};
});