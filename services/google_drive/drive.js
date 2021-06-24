function createFolder() {
    var fileMetadata = {
        'name': 'Invoices',
        'mimeType': 'application/vnd.google-apps.folder'
      };
      drive.files.create({
        resource: fileMetadata,
        fields: 'id'
      }, function (err, file) {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          console.log('Folder Id: ', file.id);
          // Notify the plugin that the folder was created
        }
    });
}

// If we want to create a file into a folder we need the folder id
var folderId = '0BwwA4oUTeiV1TGRPeTVjaWRDY1E';

function appendFileToFolder(folderId) {
    var fileMetadata = {
      'name': 'photo.jpg',
      parents: [folderId]
    };
    var media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream('files/photo.jpg')
    };
    drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    }, function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log('File Id: ', file.id);
        // Notify the plugin that the file was inserted into the folder
      }
    });
}