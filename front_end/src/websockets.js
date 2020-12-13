let setRefreshListing = () => {};
export function initWS() {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'setUserID', userID: 1 }));
        ws.onmessage = (event) => {
            console.log(event.data)
            setRefreshListing(true);
        };
    };
};

export function setRefreshListingWS(setStateFunc){
    setRefreshListing = setStateFunc; 
};


