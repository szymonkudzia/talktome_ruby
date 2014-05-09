talkToMeApp.service('RegisterService', function ($resource) {
	this.register = function (registerForm, success, failure) {
		var connector = $resource('service/register', {}, { execute: { method: 'POST' } });

		connector.execute(registerForm, success, failure);
	};
});