let setRefreshListing = () => {};
let ws;
let wsResolver;
let currentWSChats;
let setWSChats;
let setWSForceUpdater;
let forceUpdaterCounter = 1;

const wsPromise = new Promise((resolver) => {
    wsResolver = resolver;
})

export function initWS() {
    ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
        wsResolver()
        ws.onmessage = (event) => {
            console.log(event.data)
            const parsedData = JSON.parse(event.data)
            if(parsedData.type === 'updateListing'){
                setRefreshListing(true);
            }
            if(parsedData.type === 'sendInquiry'){
                const exisitingChat = currentWSChats.find((chat) => {return chat.listingId === parsedData.listingID && chat.userId === parsedData.senderID})
                if (exisitingChat){
                  exisitingChat.messages.push({
                    message: parsedData.message,
                    createdAt: parsedData.createdAt
                  })
                }else{
                  currentWSChats.push({
                    listingId: parsedData.listingID,
                    userId: parsedData.senderID,
                    messages: [{
                      message: parsedData.message,
                      createdAt: parsedData.createdAt
                    }]
                  })
                }
                setWSChats(currentWSChats);
                setWSForceUpdater(forceUpdaterCounter ++)
            }
        };
    };
};

export function setRefreshListingWS(setStateFunc){
    setRefreshListing = setStateFunc; 
};

export function setChatsWS(currentChats, setChats, setForceUpdater){
    currentWSChats = currentChats;
    setWSChats = setChats;
    setWSForceUpdater = setForceUpdater;
};

export async function setWSUserID(userID){
    await wsPromise
    ws.send(JSON.stringify({ type: 'setUserID', userID: userID }));
};


