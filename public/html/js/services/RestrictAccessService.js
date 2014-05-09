talkToMeApp.service('ResrictAccessService', function ($location, MainService) {
	this.blockUnlogged = function () {
		if (!CONFIG.debug) {
			if (MainService.session.user) {
				if (!MainService.session.user.email)
					$location.path('/');
			} else {
				$location.path('/');
			}
		}
	}
});
