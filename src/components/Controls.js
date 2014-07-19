define(function(require) {
	'use strict'

	var React = require('React')
		,	WorldActions = require('actions/WorldActions')
		, store = require('stores/LifeStore')

	function getState() {
			return {
				moving: store.isMoving()
			}
	}

	var Controls = React.createClass({

		displayName: 'Controls',

		getInitialState: function() {
			return getState()
		},

		componentDidMount: function() {
			store.addListener('change', this._onChange)
		},

		componentWillUnmount: function() {
			store.removeListener('change', this._onChange)
		},

		render: function() {
			return React.DOM.div({
				children: [
					React.DOM.button({
						onClick: this.onToggle
					}, this.state.moving ? 'Stop' : 'Start')
					, React.DOM.button({
						onClick: this.onReset
					}, 'Reset')
				]
			})
		},

		onToggle: function() {
			WorldActions.toggle()
		},

		onReset: function() {
			WorldActions.reset()
		},
  
		_onChange: function() {
			this.setState(getState())
		}
	})

	return Controls;

})