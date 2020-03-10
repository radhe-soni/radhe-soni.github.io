//571585322594-1ie352b02b1amf5enje5umgk9epu6ulp.apps.googleusercontent.com
//PAenxUmVtX1x2u9B9H1inrJJ

// Client ID and API key from the Developer Console
var CLIENT_ID = '571585322594-1ie352b02b1amf5enje5umgk9epu6ulp.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCYHWsUCqDL2mSRZCYH0OtlNvGeK00EnCQ';
var ACCESS_TOKEN = 'ya29.a0Adw1xeVI7T3QIFFgkvUjy9_M7OEkKG22Y73F6o-qPmAYypUaOHXuNGXdGw_5DURXitD6n-bdRL0dDpuyUSqSYeOBlpawyNikPfqQuqTSYFo-MA-hizWj9IZLlu2WX7cQaU9xN4CddcQwrDub6i3988kKCXKvGYpyn2Y'
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    "https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive.file';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
var createButton = document.getElementById('create_button');
/**
 *  On load, called to load the auth2 library and API client library.
 */
const handleClientLoad = () => gapi.load('client:auth2', initClient);

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        createButton.style.display = 'block';
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        createButton.style.display = 'none';
    }
}

const handleAuthClick = (event) => gapi.auth2.getAuthInstance().signIn();

const handleSignoutClick = (event) => gapi.auth2.getAuthInstance().signOut();
/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

function listFiles() {
    gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name)"
    }).then(function (response) {
        appendPre('Files:');
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.name + ' (' + file.id + ')');
            }
        } else {
            appendPre('No files found.');
        }
    });
}
