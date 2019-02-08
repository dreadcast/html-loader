'use strict';

const webpack = require('webpack');
const Path = require('path');
const nodeModulesDir = Path.resolve('node_modules');
const context = Path.resolve(__dirname);

module.exports = {
	devServer: {
		contentBase: './build',
		port: 8078,
		host: 'localhost',
		stats: {
			colors: true,
		},
		quiet: false,
	},
	mode: 'development',
	entry: {
		index: 'index.js',
	},
	output: {
		path: Path.resolve('build'),
		filename: '[name].js',
		publicPath: '/path/',
		pathinfo: false,
	},
	context,
	resolve: {
		extensions: ['.js'],
		modules: [
			context,
			nodeModulesDir,
		],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].css',
						},
					},
					{ loader: 'extract-loader' },
					{ loader: 'css-loader' },
				],
			},
			{
				test: /\.bundle\.js$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						},
					},
					{ loader: 'babel-loader' },
				],
			},
			{
				test: /\.(txt|jpg|ico|cur|png|gif|ttf|eot|svg|woff2?)(\?[a-z0-9]+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						},
					}
				],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].html',
						},
					},
					{ loader: 'extract-loader' },
					{
						loader: 'html-loader',
						options: {
							attrs: [':src', 'link:href'],
						},
					},
				]
			}
		],
	},
};
