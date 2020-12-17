const WebSocket = require('ws');
const redis = require('redis');
const wsServer = new WebSocket.Server({port: 8080});
const client = redis.createClient({host: 'redis-13037.c60.us-west-1-2.ec2.cloud.redislabs.com', port: 13037});

//connects to redis 
client.auth('GHSahP3jPWAUKoW459YE71UjkMzhRz6O', function(err, response){
    client.subscribe('updateListing');
    client.subscribe('sendInquiry');
    client.on('message', (channel, message) => {
        const jsonMessage =  JSON.parse(message);
        console.log("Message recieved on channel " + channel + " : " + message);
        if(jsonMessage.type === 'updateListing'){
            wsServer.clients.forEach((wsclient) => {
                wsclient.send(message)
            });
        }
        if(jsonMessage.type === 'sendInquiry'){
            console.log(userMapping)
            if(userMapping[jsonMessage.recieverID]){
                userMapping[jsonMessage.recieverID].send(message);
            }
        }
    });
});


const userMapping = {}

//when client connects to ws server
wsServer.on('connection', (wsinstance) => {
  wsinstance.on('message',(data) => {
    console.log( 'Websocket server recieved ' + data)
    const parsedData = JSON.parse(data);
    if(parsedData && parsedData.userID){
        userMapping[parsedData.userID] = wsinstance;
    };
  });
});

