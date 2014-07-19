define(function(require) {
	'use strict'

	var React = require('React')
		, Controls = require('components/Controls')
		, Life = require('components/Life')
		, store = require('stores/LifeStore')

	function getWorldState() {
		return {
			cells: store.getCells(),
			cellsCount: store.getCells().length,
			worldSize: store.getWorldSize(),
			cellSize: store.getCellSize()
		}
	}

	var World = React.createClass({

		displayName: 'World',

		getInitialState: function() {
			return getWorldState()
		},

		componentDidMount: function() {
			store.addListener('change', this._onChange)
		},

		componentWillUnmount: function() {
			store.removeListener('change', this._onChange)
		},

		render: function() {
			var children = [ Controls({}) ]

			var svgChildren = []
			var svg = React.DOM.svg({
				width: this.state.worldSize * this.state.cellSize,
				height: this.state.worldSize * this.state.cellSize,
				children: svgChildren
			})

			for (var i = 0 ; i < this.state.cellsCount ; i++) {
				svgChildren.push(Life({
					life: this.state.cells[i],
					cellSize: this.state.cellSize
				}))
			}

			children.push(svg)

			return React.DOM.div({
				children: children
			})
		},

		onAddClicked: function() {
			WorldActions.create()
		},
  
		_onChange: function() {
			this.setState(getWorldState())
		}
	})

	return World;

})