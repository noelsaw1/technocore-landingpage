const publicPath = '/';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const WebpackRTLPlugin = require('webpack-rtl-plugin');

const path = require('path');

let conf_core_plugin = {

    entry: {
        main: ['./src/js/index.js', './src/scss/main.scss'],
    },

    output: {
        publicPath: publicPath,
        path: path.resolve(__dirname, `./`),
        filename: 'assets/js/[name].min.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                }
            },

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader", options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    'browsers': ['> 1%', 'last 2 versions']
                                }),
                                require('cssnano')()
                            ],
                            sourceMap: true,
                        }
                    },
                    {loader: "sass-loader", options: {}}
                ]
            },

            {
                test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
                loader: 'file-loader',
                options: {
                    name(file) {
                        return '[hash].[ext]'
                    }
                }
            },

            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            },

            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'glslify-loader',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].min.css',
        }),
        new OptimizeCssAssetsPlugin({
            filename: 'assets/css/[name].min.css',
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {discardComments: {removeAll: true}}],
            },
            canPrint: true
        }),
        new WebpackRTLPlugin({
                filename: 'assets/css/[name].rtl.min.css',
                diffOnly: false,
                minify: true,
            }
        ),
    ],

    watch: true,
};

const export_array = [];

export_array.push(conf_core_plugin);

module.exports = export_array;
