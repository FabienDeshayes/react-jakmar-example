define(function(require) {
	'use strict'

	var AppDispatcher = require('dispatchers/AppDispatcher')
		,	WorldConstants = require('constants/WorldConstants')
		, jakmar = require('jakmar')

	var world = {}
		, lifeDefinition
		, listeners = {}
		, intervalId

	var WORLD_SIZE = 10
		,	CELL_SIZE = 30
		, TICK_INTERVAL = 1000 // in ms

	function emitChange() {
		if (listeners['change']) {
			for (var i = 0; i < listeners['change'].length; i++) {
				listeners['change'][i]()
			}
		}
	}

	function initWorld() {
		world.moving = false
		world.size = WORLD_SIZE
		world.cells = [] // flat rep of the world
		for (var i = 0; i < world.size * world.size; i++) {
			var isAlive = Math.random() > .5
			var initState = isAlive ? 'alive' : 'nothing'
			world.cells[i] = lifeDefinition.build(initState, {
				x: i % world.size,
				y: Math.floor(i / world.size)
			})
		}
	}

	function initLifeDefinition() {

		lifeDefinition = jakmar
			.create()
			.state('nothing')
			.state('born')
			.state('alive')
			.state('dead')
			.transition('dies', 'alive', 'dead')
			.transition('dies', 'born', 'dead')
			.transition('disappear', 'dead', 'nothing')
			.transition('appear', 'nothing', 'born')
			.transition('appear', 'dead', 'born')
			.transition('old', 'born', 'alive')
	}

	function toggle() {
		if (world.moving) {
			world.moving = false
			stopTicking()
		} else {
			world.moving = true
			startTicking()
		}
	}

	function startTicking() {
		intervalId = setTimeout(function() {
			tick()
		}, TICK_INTERVAL)
	}

	function stopTicking() {
		clearInterval(intervalId)		
	}

	function reset() {
		stopTicking()
		initWorld()
	}

	function tick() {
		var transitionsToApply = []
		for (var i = 0; i < world.size * world.size; i++) {
			transitionsToApply.push(getTransitionIfAny(world.cells[i]))
		}
		// once we have all transitions, apply them
		for (var i = 0; i < world.size * world.size; i++) {
			var transition = transitionsToApply[i]
			if (transition) {
				world.cells[i][transition].call(this)
			}	
		}
		emitChange()

		intervalId = setTimeout(function() {
			tick()
		}, TICK_INTERVAL)
	}

	function getTransitionIfAny(cell) {
		var transition = null
			,	 neighboursCount = getNeighboursCount(cell.x, cell.y)


		if (cell.state === 'born') {
			transition = 'old'
		} else if (cell.state === 'dead') {
			transition = 'disappear'
		}

		if (isCellAlive(cell) && (neighboursCount < 2 || neighboursCount > 3)) {
			transition = 'dies'
		}
		if (!isCellAlive(cell) && neighboursCount === 3) {
			transition = 'appear'
		}

		return transition
	}

	function getNeighboursCount(x, y) {
		var count = 0

		count += checkCell(x - 1, y - 1)
		count += checkCell(x - 1, y)
		count += checkCell(x - 1, y + 1)
		count += checkCell(x, y - 1)
		count += checkCell(x, y  +1)
		count += checkCell(x + 1, y - 1)
		count += checkCell(x + 1, y)
		count += checkCell(x + 1, y + 1)

		return count
	}

	function checkCell(x, y) {
		var isAlive = 0

		if (x >= 0 && y >= 0 && x < WORLD_SIZE && y < WORLD_SIZE) {
			var cell = world.cells[x + y * WORLD_SIZE]
			isAlive = isCellAlive(cell) ? 1 : 0
		}

		return isAlive
	}

	function isCellAlive(cell) {
		return cell.state === 'alive' || cell.state === 'born'
	}

	var LifeStore = function() {
		initLifeDefinition()
		AppDispatcher.register(this.onAction.bind(this))
		initWorld()
	}

	LifeStore.prototype.onAction = function(payload) {
		var action = payload.action

		switch (action.actionType) {
			case WorldConstants.TOGGLE:
				toggle()
				break
			case WorldConstants.RESET:
				reset()
				break
			default:
				return true
		}

		emitChange()
		return true
	}

	LifeStore.prototype.getCells = function() {
		return world.cells
	}

	LifeStore.prototype.isMoving = function() {
		return world.moving
	}

	LifeStore.prototype.getWorldSize = function() {
		return WORLD_SIZE
	}

	LifeStore.prototype.getCellSize = function() {
		return CELL_SIZE
	}

	LifeStore.prototype.addListener = function(eventName, callback) {
		listeners[eventName] || (listeners[eventName] = [])
		listeners[eventName].push(callback)
	}

	LifeStore.prototype.removeListener = function(eventName, callback) {
		// TODO: implement remove listeners
	}

	return new LifeStore()
})