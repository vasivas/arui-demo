const path = require('path');

const webpack = require('webpack');


const {
    DefinePlugin,
    DllReferencePlugin
} = webpack;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ReactLoadablePlugin = require('@7rulnik/react-loadable/webpack').ReactLoadablePlugin;


const create = ( root = process.cwd() ) => ( {
    name: 'client',
    mode: 'development',
    target: 'web',
    context: path.resolve( root, 'src' ),
    watch: true,
    entry: {
        client: path.join( root, 'src', 'index.tsx' )
    },
    output: {
        publicPath: "/static/",
        path: path.join( root, 'dest' ),
        filename: '[name].js',
        chunkFilename: "[name].js",
        libraryTarget: "umd2",
        globalObject: "this"
    },
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".css", ".json", ".svg" ],
        modules: [ "node_modules" ],
        alias: {
            'react-loadable':'@7rulnik/react-loadable',


            /** part of definitions is in base dev config */
        }
    },
    externals: {},
    devtool: 'cheap-inline-module-source-map',
    node: {
        fs: 'empty'
    },
    module: {
        noParse: /\.json$/,
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
                        }
                    }
                ],
                include: [ path.join( root, 'src' ) ],
                exclude: [ /node_modules/, /\*\.spec.(ts|tsx)$/ ]
            },
            {
                test: /\.json$/,
                use: 'json-loader',
                include:[path.join(root,'dest')],
                exclude: [ /node_modules/ ]
            },
            {
                test:/\.svg$/,
                use:[
                    // {loader:'svg-loader'},
                    {
                        loader:'file-loader',
                        options:{
                            name: '[name].[ext]',
                            publicPath: 'static/'
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        // new DllReferencePlugin({
        //     context: path.join(root, 'dest'),
        //     manifest: require('../../dest/root.dll.manifest.json'),
        //     sourceType: 'umd2',
        // }),
        new DefinePlugin( {
            'process.env': {
                NODE_ENV: JSON.stringify( 'development' )
            }
        } ),

        new MiniCssExtractPlugin( {
            filename: "[name].css",
            chunkFilename: "[id].css"
        } ),
        // new ReactLoadablePlugin({
        //     filename:path.join(root,'dest','loadable.manifest.json')
        // }),


    ]
} );


module.exports = create()