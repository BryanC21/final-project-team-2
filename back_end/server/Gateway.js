const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const port = 4000;
const apiProxy = httpProxy.createProxyServer();

// const wsProxy = httpProxy.createProxyServer({
//     target: process.env.WEBSOCKET_HOST || 'http://localhost:6000',
//     ws: true,
// });

//have to do this so entire app doesn't crash
apiProxy.on('error', (err, req, res)=>{
    console.log(err);
    res.status(500).send('Proxy error');
});

// wsProxy.on('error', (err, req, socket) =>{
//     console.log(err);
//     console.log('ws failed')
//     socket.end();
// });

const apiServerHost = process.env.APISERVER_HOST || 'http://localhost:3000';
app.all('/*', (req, res) => {
    const options = {
        target: apiServerHost,
    }
    apiProxy.web(req, res, options);
});

// const webSocketServerHost = process.env.WEBSOCKET_HOST || 'http://localhost:8080/websocket';
// app.all('/websocket*',(req, res) => {
//     console.log('incoming ws');
//     const options = {
//         target: webSocketServerHost,
//     }
//     apiProxy.web(req,res,options)
// });

app.listen(port,() => console.log(`proxy listening to ${port}`));