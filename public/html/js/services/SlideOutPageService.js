talkToMeApp.service('SlideOutPageService', function ($rootScope) {
	var that = this;
	this.leavePage = function () {
		$('.slideInPageContainer').hide("slide", {duration: 500, direction: "up"});
	};

	// $rootScope.$on("$routeChangeStart", function () {
	// 	that.leavePage();
	// 	// setTimeout(that.leavePage,100);
	// });
});