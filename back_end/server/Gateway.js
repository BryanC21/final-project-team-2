const express = require('express');
const server = require('http');
const httpProxy = require('http-proxy');
const app = express();
const port = 4000;
const appServer = server.createServer(app);
const apiProxy = httpProxy.createProxyServer(app);

const wsProxy = httpProxy.createProxyServer({
    target: process.env.WEBSOCKET_HOST || 'http://localhost:8080',
    ws: true,
});

//have to do this so entire app doesn't crash
apiProxy.on('error', (err, req, res)=>{
    console.log(err);
    res.status(500).send('Proxy error');
});

wsProxy.on('error', (err, req, socket) =>{
    console.log(err);
    console.log('ws failed')
    socket.end();
});

const apiServerHost = process.env.APISERVER_HOST || 'http://localhost:5000';
app.all('/*', (req, res) => {
    const options = {
        target: apiServerHost,
    }
    apiProxy.web(req, res, options);
});

const webSocketServerHost = process.env.WEBSOCKET_HOST || 'http://localhost:8080/websocket';
console.log(`Websocket end Proxies to : ${webSocketServerHost}`);
app.all('/websocket*',(req, res) => {
    console.log('incoming ws');
    const options = {
        target: webSocketServerHost,
    }
    apiProxy.web(req,res,options)
});

appServer.on('upgrade',(req,socket,head) => {
    console.log('upgrade ws here');
    wsProxy.ws(req,socket,head);
})
appServer.listen(port);
console.log(`Gateway started ${port}`);
//app.listen(port,() => console.log(`proxy listening to ${port}`));