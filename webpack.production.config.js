var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'./src/index.jsx'
	],
	module:{
		loaders: [
			{
	      		test: /\.jsx?$/,
				exclude: /node_modules/,
	  			include: [path.resolve(__dirname, 'src')],
				loader: 'react-hot!babel'
			},
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			}
	    ]
	},
	resolve:{
		root: path.resolve(__dirname),
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: './dist',
		publicPath: '/',
		filename: 'bundle.js'
	}
}