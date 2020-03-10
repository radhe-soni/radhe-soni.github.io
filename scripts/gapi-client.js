const intializeGAPIClient = callbacks => gapi.load('client:auth2', () => initClient(callbacks));

const initClient = (callbacks) => {
    var gAuth = new GoogleAuth();
    gapi.client.init({
        apiKey: gAuth.API_KEY,
        clientId: gAuth.CLIENT_ID,
        discoveryDocs: gAuth.DISCOVERY_DOCS,
        scope: gAuth.SCOPES,
    }).then(() => processSignIn(gAuth),
        error => console.error(JSON.stringify(error, null, 2)))
        .then(() => {
            let index;
            for (index in callbacks) {
                callbacks[index]();
            }
        });
}
function processSignIn(gAuth) {
    console.log("client initialized");
    gapi.auth2.getAuthInstance().isSignedIn.listen(gAuth.updateSigninStatus);

    // Handle the initial sign-in state.
    gAuth.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
}

const handleAuthClick = (event) => gapi.auth2.getAuthInstance().signIn();

const handleSignoutClick = (event) => gapi.auth2.getAuthInstance().signOut();