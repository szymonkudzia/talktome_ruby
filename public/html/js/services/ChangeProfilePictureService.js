talkToMeApp.service('ChangeProfilePictureService', function ($resource, $locale, $http) {
	var that = this;

	this.changeProfilePicture = function (userId, pictureFile, successCallback) {
		// $resource('service/changeProfilePicture', {}, {
		// 	get: {
		// 		method: 'POST', isArray: false
		// 	}
		// })
		// .get({userId: userId, picturFile: pictureFile}, function (pathToPicture) {
		// 	console.log("Changed profile picture for uId: " + userId, pathToPicture);

		// 	successCallback(friendId, pathToPicture.path);
		// });

		var fd = new FormData();
		fd.append("userId", userId);
        fd.append('file', pictureFile);

        $http.post('service/changeProfilePicture', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
        	console.log("Changed profile picture for uId: " + userId, response.path);

			successCallback(response.path);
        })
        .error(function(){
        });
	};
});