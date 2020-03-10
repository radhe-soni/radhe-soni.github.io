

const intializeGAPIClient = () => gapi.load('client:auth2', initClient);


function initClient() {
    var gAuth = new GoogleAuth();
    gapi.client.init({
        apiKey: gAuth.API_KEY,
        clientId: gAuth.CLIENT_ID,
        discoveryDocs: gAuth.DISCOVERY_DOCS,
        scope: gAuth.SCOPES,
    }).then(() => processSignIn(gAuth), function (error) {
        console.error(JSON.stringify(error, null, 2));
    });
}
function processSignIn(gAuth) {
    gapi.auth2.getAuthInstance().isSignedIn.listen(gAuth.updateSigninStatus);

    // Handle the initial sign-in state.
    gAuth.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
}