const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, '../index.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../dist')
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},

	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|svg|ico)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			},

			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
				// exclude: /node_modules/
				// use: "style-loader!css-loader?modules=true"
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../index.html'),
			favicon: path.resolve(__dirname, '../favicon.ico')
		})
	]
};
