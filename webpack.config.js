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
		// {
	 //      test: /\.(png|jpg)$/,
	 //      loader: 'file?name=images/[name].[ext]'
  //   	}, 
  //   	{
	 //      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
	 //      loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' // eslint-disable-line max-len
  //   	}, 
  //   	{
	 //      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
	 //      loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' // eslint-disable-line max-len
	 //    }, 
	 //    {
	 //      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
	 //      loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream' // eslint-disable-line max-len
	 //    }, 
	 //    {
	 //      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
	 //      loader: 'file?name=fonts/[name].[ext]'
	 //    }, 
	 //    {
	 //      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
	 //      loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
	 //    }
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
}