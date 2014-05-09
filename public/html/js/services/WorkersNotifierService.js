talkToMeApp.factory('WorkersNotifierService', function () {
		return new function() { 
			var that = this;
			that.numberOfActiveWorkers = 0;

			/**
			* Add new worker and start it
			*
			* @param {function} worker 
			* @param {object} params object containing parameters for worker
			* @param {function} success(data) callback on success (optional)
			* @param {function} failure(error) callback on failure (optional)
			*
			* @returns {?} returns worker(params)
			*/
			this.addWorker = function(worker, params, success, failure) {
				that.numberOfActiveWorkers++;

				return worker(
					params,
					function (data) { that.onFinish(data, success); },
					function (error) { that.onFinish(error, failure); }
				);
			};

			/**
			* Test if there is active worker
			*
			* @return {boolean} true if there is active worker otherwise false
			*/
			this.hasActiveWorker = function () {
				return that.numberOfActiveWorkers > 0;
			};


			/**
			* Get the count of active workers
			*
			* @return {integer} 
			*/
			this.activeWorkersCount = function () {
				return that.numberOfActiveWorkers;
			};



			that.onFinish = function (data, callback) {
				that.numberOfActiveWorkers--;

				if (callback)
					callback(data);
			};

		};
});