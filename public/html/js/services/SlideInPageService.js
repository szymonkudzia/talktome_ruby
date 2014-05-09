talkToMeApp.service('SlideInPageService', function ($rootScope) {
	var that = this;
	this.enterPage = function () {
		$('.slideInPageContainer').height($(window).height() - 100);
		$('.slideInPageContainer').show("slide", {duration: 500, direction: "up"});
	};

	$rootScope.$on("$viewContentLoaded", function () {
		setTimeout(that.enterPage,100);
	});
});