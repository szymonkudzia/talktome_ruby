talkToMeApp.service('ChangePasswordService', function ($resource) {
	var that = this;

	var ajax = $resource('service/changePassword', {}, {
		execute: { method: 'POST', params: {} }
	});

	/**
	* Generates unique code for given address and sends email
	* with generated code as a part of link to @emailAddress
	*
	* @param {string} emailAddress address email 
	* @returns {none}
	*/
	this.generateCode = function (emailAddress, success, failure) {
		return ajax.execute({ generateCode: true, email: emailAddress }, success, failure);
	};

	/**
	* Change password for earlier generated code
	*
	* @param {string} code generated password change code
	* @param {string} password new password
	* @param {function} success(data) callback on success (optional)
	* @param {function} failure(error) callback on failure (optional)
	*/
	this.changePassword = function (code, password, success, failure) {
		return ajax.execute({ generateCode: false, code: code, password: password }, success, failure);
	};
});