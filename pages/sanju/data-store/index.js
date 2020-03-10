const populateDataTable = () => {
    const dataTable = document.getElementById("data-table");
    fetchFiles().then(files => {
        console.log(files[0]);
        for (var i = 0; i < files.length; i++) {
             var file = files[i];
            var row = dataTable.insertRow(i+1);
            row.insertCell(0).innerHTML = i+1;
            var name = row.insertCell(1);
            name.innerHTML = file.name;
            var id = row.insertCell(2);
            id.innerHTML = file.id;
            
            var dateCreated = row.insertCell(3);
            dateCreated.innerHTML = file.dateCreated;

        }
    });
}