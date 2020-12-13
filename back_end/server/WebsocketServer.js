const WebSocket = require('ws');
const redis = require('redis');
const wsServer = new WebSocket.Server({port: 8080});
const client = redis.createClient({host: 'redis-13037.c60.us-west-1-2.ec2.cloud.redislabs.com', port: 13037});


client.auth('GHSahP3jPWAUKoW459YE71UjkMzhRz6O', function(err, response){
    client.subscribe('updateListing');
    client.on('message', () => {
        wsServer.clients.forEach((wsclient) => {
            wsclient.send('updateListing')
        });
    });
});

wsServer.on('connection', (ws) => {
    console.log('Connected');
});

const userMapping = {}

wsServer.on('connection', (wsinstance) => {
  wsinstance.on('message',(data) => {
    console.log(data)
   // userMapping[message.userId] = wsinstance
  });
});

/* client.on('message',(a ,message) => {
  const wsinstance = userMapping[message.userId]
  if (wsinstance) {
    wsinstance.send(message.message)
  }
})

*/