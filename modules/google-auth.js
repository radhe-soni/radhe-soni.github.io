
class GoogleAuth {
    constructor() {
        this.authorizeButton = document.getElementById('authorize_button'),
            this.signoutButton = document.getElementById('signout_button'),
            this.createButton = document.getElementById('create_button'),
            this.CLIENT_ID = '571585322594-1ie352b02b1amf5enje5umgk9epu6ulp.apps.googleusercontent.com',
            this.API_KEY = 'AIzaSyCYHWsUCqDL2mSRZCYH0OtlNvGeK00EnCQ',
            // Array of API discovery doc URLs for APIs used by the quickstart
            this.DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
                "https://sheets.googleapis.com/$discovery/rest?version=v4"],
            this.SCOPES = 'https://www.googleapis.com/auth/drive.file';
        this.authorizeButton.onclick = this.handleAuthClick;
        this.signoutButton.onclick = this.handleSignoutClick;
    }
    updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            this.authorizeButton.style.display = 'none';
            this.signoutButton.style.display = 'block';
            this.createButton.style.display = 'block';
        } else {
            this.authorizeButton.style.display = 'block';
            this.signoutButton.style.display = 'none';
            this.createButton.style.display = 'none';
        }
    }

    handleAuthClick = (event) => gapi.auth2.getAuthInstance().signIn();

    handleSignoutClick = (event) => gapi.auth2.getAuthInstance().signOut();
}