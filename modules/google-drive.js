const listFiles = () => {
    gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name)"
    }).then(response => logFiles(response.result.files));
};
const logFiles = files => {
    console.log('Files:');
    if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log(file.name + ' (' + file.id + ')');
        }
    } else {
        console.log('No files found.');
    }
}
var APP_FOLDER_ID;
function createAppFolder() {
    var fileMetadata = {
        'name': 'biller-app',
        'mimeType': 'application/vnd.google-apps.folder'
    };
    drive.files.create({
        resource: fileMetadata,
        fields: 'id'
    }, function (err, file) {
        if (err) {
            alert("App folder could not be created. See console for more logs.")
            console.error(err);
        } else {
            APP_FOLDER_ID = file.id;
            console.log('App folder could not be created ', file.id);
        }
    });

}