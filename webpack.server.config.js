const path = require('path');

const webpack = require('webpack');


const {
    DefinePlugin,
    DllReferencePlugin
} = webpack;

const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const create = ( root = process.cwd() ) => ( {
    name: 'server',
    mode: 'development',
    target: 'node',
    context: path.resolve( root, 'src' ),
    entry: {
        server: path.join( root, 'src', 'server.tsx' )
    },
    output: {
        publicPath:'/',
        path: path.join( root, 'dest' ),
        filename: '[name].js',
        chunkFilename: "[name].js",
        libraryTarget: "commonjs2",
        globalObject: "this"
    },
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".css", ".json", ".svg" ],
        modules: [ "node_modules" ],
        alias: {
        }
    },
    externals: [
        nodeExternals({
            whitelist:[
                /arui-feather\/.*/
            ]
        }),
    ],
    devtool: 'cheap-inline-module-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                ],
                include:[path.join(root,'node_modules','arui-feather')]
            },
            {
                test: /(\.ts|\.tsx)$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.join( root,'tsconfig.server.json' )
                        }
                    }
                ],
                include: [ path.join( root ), path.join(root,'node_modules','arui-feather') ],
                exclude: [ /node_modules/, /\*\.spec.(ts|tsx)$/, './src/client.tsx' ]
            },
            {
                test:/\.svg$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name: '[name].[ext]'
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new DefinePlugin( {
            'process.env': {
                NODE_ENV: JSON.stringify( 'development' )
            }
        } ),

        new MiniCssExtractPlugin( {
            filename: "[name].css",
            chunkFilename: "[id].css"
        } ),
    ]
} );


module.exports = {create};
