const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		proxy: {
			'/api': 'http://localhost:3000'
		},
		contentBase: path.resolve(__dirname, 'dist'),
		historyApiFallback: true
	}
});
