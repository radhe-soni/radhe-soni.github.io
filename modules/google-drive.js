const listFiles = () => {
    fetchFiles().then(files => logFiles(files));
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
const fetchFiles = () => {
    return gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name, mimeType,parents, createdTime)"
    }).then(response => response.result.files);
}
var APP_FOLDER;
const findFile = fileName => fetchFiles().then(files => files.find(file => file.name == fileName))
    .then(file => {
        console.log(file);
        return file;
    });
const createFolder = (folderName, parentId) => {
    console.info("Creating folder " + folderName, parentId);
    var request = {
        'name': folderName,
        'mimeType': 'application/vnd.google-apps.folder',
        "parents": [parentId]
    };
    gapi.client.request({
        'path': 'https://www.googleapis.com/drive/v3/files/',
        'method': 'POST',
        'body': request

    }).then(function (file, err) {
        console.info("response recieved");
        if (err) {
            alert("App folder could not be created. See console for more logs.")
            console.error(err);
        } else {
            APP_FOLDER = file;
            console.log('App folder created ', file);
        }
    });
}

function createAppFolder() {
    console.log("creating app folder");
    const appFolderName = 'biller-app';
    findFile(appFolderName).then(file => {
        if (!file) {
            console.log("app folder not found creating");
            createFolder(appFolderName);
        }
        else {
            console.log("app folder already exist.", file);
            APP_FOLDER = file;
        }
    });
}

function createMonthFolder() {
    console.log("creating app folder");
    const folderName = new Date().getMonthName();
    findFile(folderName).then(file => {
        if (!file) {
            console.log(folderName + "folder not found creating");
            if (APP_FOLDER)
                createFolder(folderName, APP_FOLDER.id);
            else {
                console.error("app folder does not exists.");
            }
        }
        else {
            console.log(folderName + " folder already exist.");
        }
    });
}