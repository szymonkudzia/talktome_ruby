talkToMeApp.controller('ConversationCtrl', function ($scope, $http, $routeParams, $location, $interval, 
		WorkersNotifierService, ResrictAccessService, SlideInPageService, MainService,
		MessagingService, GoogleTranslatorService) {
	ResrictAccessService.blockUnlogged();
	// $scope.session = MainService.session MainService,

	var windowHeight = $(window).height();
	var offset = 145;
	$('#friendList').height(windowHeight - offset);
	$('#messageBox').height(windowHeight - offset - 197);

	$('#friendList').perfectScrollbar({
		wheelSpeed: 40,
		suppressScrollX: true
	});

	$('#messageBox').perfectScrollbar({
		wheelSpeed: 40,
		suppressScrollX: true
	});



	$scope.matchSearchValue = function (friend) {
		// TODO add matching lastName then firstName (now matching: firstName and then lastName)
		var name = friend.firstName + ' ' + friend.lastName;

		if ($scope.searchValue == undefined)
			return true;

		var value = $scope.searchValue.trim();
		if (value !== '') {
			var result = name.search(new RegExp(value, 'i'))
			if (result >= 0)
				return true;
		} else {
			return true;
		}

		return false;
	};

	$scope.isPersonActive = function (friend) {
		if (!MainService.session.activeFriendInConversation) return '';

		if (friend.id === MainService.session.activeFriendInConversation.id)
			return 'personPickerContainerActive';

		return '';
	}

	$scope.genName = function (friend) {
		if (friend)
			return (friend.firstName ? firend.firstName : "" ) + ' ' + (friend.lastName ? friend.lastName : "");

		return "No friends yet? :(";
	};


	$scope.changeActiveFriend = function (friend) {
		MainService.session.activeFriendInConversation = friend;
	}

	$scope.getMessages = function () {
		MessagingService.getMessages(
			MainService.session.user.id, 
			MainService.session.activeFriendInConversation.id,
			function (friendId, messages) {
				var friend = $scope.findFriendWithId(friendId);

				for (var i = 0; i< messages.length; ++i) {
					if (friend.messages) {
						friend.messages.push(messages[i]);
					} else {
						friend.messages = [messages[i]];
					}
				}
			});
	}
	//$scope.getMessages();
	
	$scope.findFriendWithId = function (friendId) {
		var friend = undefined;

		if (friendId === MainService.session.activeFriendInConversation.id)
				friend = MainService.session.activeFriendInConversation;
			else 
				for (i in MainService.session.friends)
					if (MainService.session.firends[i].id === friendId)
					{
						friend = MainService.session.firends[i];
						break;
					}
		return friend;
	}

	$scope.$watch('activeFriendInConversation', function () {
		var messageBox = $('#messageBox');
		messageBox.scrollTop(messageBox[0].scrollHeight);
		messageBox.perfectScrollbar('update');

		if (!MainService.session.activeFriendInConversation.messages)
			$scope.getMessages();
	});


	$scope.getNewMessages = function () { 
			MessagingService.getNewMessages(MainService.session.user.id, function (newMessages) {
				console.log(newMessages);


				for (i in MainService.session.friends) {
					for (j in newMessages) {
						friend = MainService.session.friends[i]
						message = newMessages[j];

						if (friend && message) {
							if (friend.id === message.from || friend.id === message.to) { 
								friend.hasNewMessages = true;

								if (friend.messages) {
									friend.messages.push(message);
								} else {
									friend.messages = [message];
								}
							}
						}
					}
				}	
			});
	};

	// TODO move it to the service which would be able to disable it after
	// logout etc.

	if (CONFIG.pingForNewMessages)
		var cancelReceivingMsgs = setInterval($scope.getNewMessages, CONFIG.checkForMessagesIntervals);

	$scope.$on('$destroy', function () {
		clearInterval(cancelReceivingMsgs);
	});




	$scope.getMessageType = function (message) {
		if (message == undefined) return '';

		if (message.from === MainService.session.activeFriendInConversation.id)
			return 'left';

		return 'right';
	}

	$scope.submitMessage = function (event) {
		if (!MainService.session.activeFriendInConversation) return;

		if (event.keyCode === 13) { // ENTER == 13
			if (!event.ctrlKey && !event.shiftKey) {

				MessagingService.sendMessage(
					MainService.session.user.id,
					MainService.session.activeFriendInConversation.id,
					$scope.message,
					function (friendId, message) {
						var friend = $scope.findFriendWithId(friendId);

						if (friend.messages)
							friend.messages.push(message)
						else
							friend.messages = [message];
					});

				$scope.message = undefined;
			}
		}
	}

	$scope.clearSelectBGColor = function () {
		$('#translations').removeClass('gotTranslations');
	}

	$scope.translations = [];
	$scope.translate = function (event) {
		$interval.cancel($scope.cancelTranslation);
		$scope.cancelTranslation = $interval($scope.sendTranslateRequest, 1000, 1);


		if (event.keyCode === 13)  {// ENTER
			$interval.cancel($scope.cancelTranslation);

			$scope.sendTranslateRequest();
		}
	};

	$scope.sendTranslateRequest = function () {
		var from = $scope.fromLanguage.code.split('-')[0];
		var to = $scope.toLanguage.code.split('-')[0];

		GoogleTranslatorService.translate($scope.textForTranslation, from, to, function (translations) {
			if (translations.length > 0) {
				$scope.textTranslated = translations[0];
				$scope.translations = translations;

				$('#translations').addClass('gotTranslations');
			}
		});
	}


	if (MainService.session.localization.languages && MainService.session.localization.languages.length > 0) { 
		$scope.fromLanguage = MainService.session.localization.languages[0]
		$scope.toLanguage = MainService.session.localization.languages[0]
	}

	if (MainService.session.user) {
		for (var i = 0; i <  MainService.session.localization.languages.length; ++i) {
			if (MainService.session.localization.languages[i].code === 
				 MainService.session.user.country) {
				$scope.toLanguage = MainService.session.localization.languages[i];
				break;
			}
		}
	}

	if (MainService.session.activeFriendInConversation) {
		for (var i = 0; i <  MainService.session.localization.languages.length; ++i) {
			if (MainService.session.localization.languages[i].code === 
				 MainService.session.activeFriendInConversation.country) {
				$scope.fromLanguage = MainService.session.localization.languages[i];
				break;
			}
		}
	}


	$scope.changeFromLanguage = function (language) {
		$scope.fromLanguage = language;
	}

	$scope.changeToLanguage = function (language) {
		$scope.toLanguage = language;
	}

	$scope.invertLanguages = function () {
		var tmp = $scope.fromLanguage;
		$scope.fromLanguage = $scope.toLanguage;
		$scope.toLanguage = tmp;
	}
});