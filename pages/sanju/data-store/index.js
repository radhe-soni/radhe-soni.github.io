const fetchFilesIn = appFolder => fetchFiles().then(files => files.filter(file => file.parents))
.then(files => files.filter(file => file.parents[0]==appFolder.id));
const populateFileDetails = files => {
    const dataTable = document.getElementById("data-table");
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var row = dataTable.insertRow(i + 1);
        row.insertCell(0).innerHTML = i + 1;
        var name = row.insertCell(1);
        name.innerHTML = file.name;
        var id = row.insertCell(2);
        id.innerHTML = file.id;

        var createdTime = row.insertCell(3);
        createdTime.innerHTML = file.createdTime;

    }
}
const populateDataTable = () => {
    getAppFolder().then(fetchFilesIn).then(populateFileDetails);
}