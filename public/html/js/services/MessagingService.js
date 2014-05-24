talkToMeApp.service('MessagingService', function ($resource, $locale) {
	var that = this;

	this.getMessages = function (userId, friendId, successCallback) {
		$resource('service/getMessages', {}, {
			get: {
				method: 'POST', isArray: true
			}
		})
		.get({userId: userId, friendId: friendId}, function (messages) {
			console.log("Fetched messages for uId: " + userId + " and fId: " + friendId, messages);

			successCallback(friendId, messages);
		});
	}

	this.getNewMessages = function (userId, successCallback) {
		$resource('service/getNewMessages', {}, {
			get: {
				method: 'POST', isArray:true
			}
		})
		.get({userId: userId}, function (newMessages) {
			if (newMessages.length > 0) { 
				console.log("Fetched new messages: ", newMessages);

				successCallback(newMessages);
			}
		});
	};

	this.sendMessage = function (userId, friendId, message, successCallback) {
		$resource('service/sendMessage', {}, {
			send: {
				method: 'POST'
			}
		})
		.send({userId: userId, friendId: friendId, message: message}, function (message) {
			console.log('Sent message from uId: ' + userId + ' to fId: ' + friendId, message);

			successCallback(friendId, message);
		})
	}
});