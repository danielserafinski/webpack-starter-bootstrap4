'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require("path");

module.exports = {
	entry: [
		'bootstrap-loader',
		'./src/js/app.ts'
	],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: 'js/app.bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
				exclude: /node_modules/,
                use: 'source-map-loader',
            },            
            {
                test: /\.tsx?$/,
				exclude: /node_modules/,
                use: 'ts-loader',
                
            },
            {
				test: /\.(gif|png|jpe?g)$/i,
				exclude: /node_modules/,
				use: [
 					{ loader: 'file-loader', options: { context: 'src/images', name: 'images/[path][name].[ext]'} },
					{
						loader: 'image-webpack-loader',
						query: {
							mozjpeg: {
								progressive: true
							},
							gifsicle: {
								interlaced: false
							},
							optipng: {
								optimizationLevel: 4
							},
							pngquant: {
								quality: '75-90',
								speed: 3
							}
						}
					}					
				]				
            },
			{ test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, use: 'imports-loader?jQuery=jquery' },
			{
				test: /\.(woff2?|svg)$/,
				use: [
					{
						loader: "url-loader",
						query: {
							limit: 10000,
							name: "fonts/[name]_[hash:6].[ext]"
						}	
						
					}
				]				
			},
			{
				test: /\.(ttf|eot)$/,
				use: [
					{
						loader: "url-loader",
						query: {
							limit: 10000,
							name: "fonts/[name]_[hash:6].[ext]"
						}	
						
					}
				]				
			}			
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			Tether: "tether",
			"window.Tether": "tether",
			Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
			Button: "exports-loader?Button!bootstrap/js/dist/button",
			Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
			Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
			Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
			Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
			Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
			Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
			Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
			Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
			Util: "exports-loader?Util!bootstrap/js/dist/util"
		}),				
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.html',
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        }),
        new CopyWebpackPlugin([
           { from: 'src/static', to: 'static' }  
        ])
    ]
};