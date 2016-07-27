var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./src/index.jsx'
	],
	module:{
		loaders: [{
      		test: /\.jsx?$/,
			exclude: /node_modules/,
  			include: [path.resolve(__dirname, 'src')],
			loader: 'react-hot!babel'
		},
		{
			test: /\.scss$/,
			loaders: ["style", "css", "sass"]
		},
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
	},
	devServer:{
		contentBase: './dist',
		hot: true
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	]
};
