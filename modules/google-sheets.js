function createSheet(title, callback) {
  // [START sheets_create]
  gapi.client.sheets.spreadsheets.create({
    properties: {
      title: title
    }
  }).then((response) => {
    // [START_EXCLUDE silent]
    callback(response);
    console.log('Spreadsheet ID: ' + response.result.spreadsheetId);
    // [END_EXCLUDE]
  });
  // [END sheets_create]
}
function listMajors() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Class Data!A2:E',
    }).then(function (response) {
        var range = response.result;
        if (range.values.length > 0) {
            appendPre('Name, Major:');
            for (i = 0; i < range.values.length; i++) {
                var row = range.values[i];
                // Print columns A and E, which correspond to indices 0 and 4.
                appendPre(row[0] + ', ' + row[4]);
            }
        } else {
            appendPre('No data found.');
        }
    }, function (response) {
        appendPre('Error: ' + response.result.error.message);
    });
}