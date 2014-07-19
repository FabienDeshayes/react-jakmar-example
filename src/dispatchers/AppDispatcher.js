define(function(require) {
	'use strict'

	var _callbacks = []
		, _promises = []
	
	var AppDispatcher = function() {}

	AppDispatcher.prototype.handleViewAction = function(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		})
	}

	AppDispatcher.prototype.register = function(callback) {
    _callbacks.push(callback)
    return _callbacks.length - 1
  }

  AppDispatcher.prototype.dispatch = function(payload) {
    var resolves = []
    var rejects = []

    _promises = _callbacks.map(function(_, i) {
      return new Promise(function(resolve, reject) {
        resolves[i] = resolve
        rejects[i] = reject
      })
    })
    
    _callbacks.forEach(function(callback, i) {
      // Callback can return an obj, to resolve, or a promise, to chain.
      // See waitFor() for why this might be useful.
      Promise.resolve(callback(payload)).then(function() {
        resolves[i](payload)
      }, function() {
        rejects[i](new Error('Dispatcher callback unsuccessful'))
      })
    })
    _promises = []
  }

	return new AppDispatcher()

})