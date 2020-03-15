const listFiles = () => {
    fetchFiles().then(files => logFiles(files));
};
const logFiles = files => {
    console.log('Files:');
    if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log(file.name + ' (' + file.id + ')' + file.mimeType);
        }
    } else {
        console.log('No files found.');
    }
}
const fetchFiles = parentId => {
    return gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name, mimeType,parents, createdTime)",
        'parents': [parentId]
    }).then(response => response.result.files)
        .catch(response => {
            throw new Error(response.result.error.message);
        });
}
var APP_FOLDER;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
Date.prototype.getMonthName = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return monthNames[this.getMonth()];
};
const findFile = fileName => fetchFiles().then(files => files.find(file => file.name == fileName))
    .then(file => {
        return file;
    });
const createFolder = (folderName, parentId) => {
    console.info("Creating folder " + folderName, parentId);
    var request = {
        'name': folderName,
        'mimeType': 'application/vnd.google-apps.folder',
    };
    if(parentId)
    {
        request.parents = [parentId]
    }
    gapi.client.request({
        'path': 'https://www.googleapis.com/drive/v3/files/',
        'method': 'POST',
        'body': request

    }).then(function (file, err) {
        if (err) {
            alert("App folder could not be created. See console for more logs.")
            console.error(err);
        } else {
            console.log('App folder created ', file);
        }
    });
}

const createFile = (fileName, parentId, mimeType) => {
    if (!mimeType) {
        mimeType = "application/vnd.google-apps.spreadsheet"
    }
    var request = {
        'name': fileName,
        'mimeType': mimeType,
        "parents": [parentId]
    };
    gapi.client.request({
        'path': 'https://www.googleapis.com/drive/v3/files/',
        'method': 'POST',
        'body': request

    }).then(function (file, err) {
        if (err) {
            alert("file could not be created. See console for more logs.")
            console.error(err);
        } else {
            console.log('File created ', file);
        }
    });
}

function createAppFolder() {
    console.log("creating app folder");
    const appFolderName = 'biller-app';
    getAppFolder().then(file => {
        if (!file) {
            console.log("app folder not found creating");
            createFolder(appFolderName);
        }
        else {
            console.log("app folder already exist.", file.name);
            APP_FOLDER = file;
        }
    });
}
function getAppFolder(){
   return findFile('biller-app');
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