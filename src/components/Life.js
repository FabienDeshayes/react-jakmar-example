define(function(require) {
	'use strict'

	var React = require('React')

	var Life = React.createClass({

		displayName: 'Life',

		render: function() {
			return React.DOM.rect({
				x: this.props.life.x * this.props.cellSize,
				y: this.props.life.y * this.props.cellSize,
				width: this.props.cellSize,
				height: this.props.cellSize,
				fill: this.getFillColor(this.props.life.state),
				stroke: 'black'
			})
		},

		getFillColor: function(state) {
			var color = 'white'

			switch (state) {
				case 'nothing':
					color = 'white'
					break
				case 'born':
					color = 'green'
					break
				case 'alive':
					color = 'blue'
					break
				case 'dead':
					color = 'red'
					break
			}

			return color
		}
		
	})

	return Life;

})