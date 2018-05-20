import * as express from "express";
import * as morgan from "morgan";

import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

import { App } from "./App";


const app = express();

app.use(morgan('dev'));
app.use('/static',express.static('dest'));


app.use( '*', ( request, response ) => {
    let markup = ReactDOMServer.renderToString( <App /> );

    response.send( `
        <!DOCTYPE html>
        <html>
            <head>
                <base href="dest/">
                <meta charset="UTF-8">
                <title>arui-demo</title>
                <link rel="stylesheet" href="/static/client.css">
            </head>
            <body>
                <div id="root">${ markup }</div>
                <script src="/static/client.js"></script>
            </body>
        </html>
    ` );
} );


app.listen( '3000', () => {
    console.info( `[EXPRESS] Start` );
} );