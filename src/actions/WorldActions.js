define(function(require) {
	'use strict'

	var AppDispatcher = require('dispatchers/AppDispatcher')
		,	WorldConstants = require('constants/WorldConstants')

	var WorldActions = function() {}

	WorldActions.prototype.toggle = function() {
		AppDispatcher.handleViewAction({
			actionType: WorldConstants.TOGGLE
		})
	}

	WorldActions.prototype.reset = function() {
		AppDispatcher.handleViewAction({
			actionType: WorldConstants.RESET
		})
	}

	return new WorldActions()

})