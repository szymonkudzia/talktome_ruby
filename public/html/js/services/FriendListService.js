talkToMeApp.service('FriendListService', function ($resource, $locale) {
	var that = this;

	this.getFriendList = function (userId, successCallback) {
		$resource('service/getFriendList', {}, {
			get: {
				method: 'POST', isArray: true
			}
		})
		.get({userId: userId}, function (friends) {
			console.log("Fetched friends list for userId: " + userId, friends);

			successCallback(friends, userId);
		});
	};


	this.addFriend = function(user, friend, successCallback) {
		$resource('service/addFriend', {}, {
			get: {
				method: 'POST'
			}
		})
		.get({userId: user.id, friendId: friend.id}, function () {
			console.log("Added friend with id: " + friend.id + " for userId: " + user.id);

			successCallback();
		});
	} 

	this.deleteFriend = function(user, friend, successCallback) {
		$resource('service/deleteFriend', {}, {
			get: {
				method: 'POST'
			}
		})
		.get({userId: user.id, friendId: friend.id}, function () {
			console.log("Deleted friend with id: " + friend.id + " for userId: " + user.id);

			successCallback();
		});
	}


	this.confirmFriend = function(user, friend, successCallback) {
		$resource('service/confirmFriend', {}, {
			get: {
				method: 'POST'
			}
		})
		.get({userId: user.id, friendId: friend.id}, function () {
			console.log("Confirmed friend with id: " + friend.id + " for userId: " + user.id);

			successCallback();
		});
	}
});