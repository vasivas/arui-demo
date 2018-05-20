const path = require('path');

const clientWebpackConfig = require( './webpack.client.config' );
const serverWebpackConfig = require( './webpack.server.config' );


module.exports = [
    clientWebpackConfig.create( process.cwd() ),
    serverWebpackConfig.create( process.cwd() ),
];
