define(function(require) {
	'use strict'

	require('es6-promise')

	var React = require('React')
		,	World = require('components/World')
		,	LifeStore = require('stores/LifeStore')

	React.renderComponent(
		World(null),
		document.getElementById('content')
	)

})