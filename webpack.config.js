const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	mode: "development",
	entry: './src/main.ts',
	target: "node",
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js'],
		modules: [path.join(__dirname, "./node_modules")]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};