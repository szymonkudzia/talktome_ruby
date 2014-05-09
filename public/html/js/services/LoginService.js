talkToMeApp.factory('LoginService', function ($resource) {
	return $resource('service/login', {},
        {
        	send: {
        		method: 'POST'
        	}
        });
});
