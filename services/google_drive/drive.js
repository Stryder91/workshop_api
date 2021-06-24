const notifyPlugin = require('../notify_plugin');

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
          // Notify the plugin that the folder was created
          notifyPlugin('Folder was created into the google drive with id : ' + file.id);
        }
    });
}

// If we want to create a file into a folder we need the folder id
// var folderId = '0BwwA4oUTeiV1TGRPeTVjaWRDY1E';

function appendFileToFolder(folderId, nameOfFile) {
    var fileMetadata = {
      'name': nameOfFile,
      parents: [folderId]
    };
    var media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream('files/'+nameOfFile)
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
        // Notify the plugin that the file was inserted into the folder
        notifyPlugin('File was added to folder ' + folderId + ' in google drive with id : ' + file.id);
      }
    });
}

module.exports = {
    createFolder: createFolder,
    appendFileToFolder: appendFileToFolder
}