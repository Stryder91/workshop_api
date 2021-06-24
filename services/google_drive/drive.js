const notifyPlugin = require('../notify_plugin');
const {google} = require('googleapis');

const auth = require('./driveLogin');

// Il faut pouvoir passer l'auth depuis driveLogin 
// => mais 
const drive = google.drive({version: 'v3'});

function createFolder() {
    var fileMetadata = {
        'name': 'Invoices',
        'mimeType': 'application/vnd.google-apps.folder'
    };
    auth.authorize(
        drive.files.create({
            resource: fileMetadata,
            fields: 'id'
          }, function (err, file) {
              if (err) {
                  // Handle error
                  console.error(err);
                } else {
                    // Notify the plugin that the folder was created
                console.log("coucou")
                notifyPlugin('Folder was created into the google drive with id : ' + file.id);
                return 'Folder created.';
            }
        })
    );
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

// Pour changer de fichier entre plusieurs dossiers 
function moveFileBetweenFolders() {
    // Retrieve the existing parents to remove
    drive.files.get({
        fileId: fileId,
        fields: 'parents'
    }, function (err, file) {
        if (err) {
            // Handle error
            console.error(err);
        } else {
            // Move the file to the new folder
            var previousParents = file.parents.join(',');
            drive.files.update({
                fileId: fileId,
                addParents: folderId,
                removeParents: previousParents,
                fields: 'id, parents'
            }, function (err, file) {
                if (err) {
                    // Handle error
                } else {
                    notifyPlugin('File was moved from ' + previousParents + ' to ' + addParents );
                }
            });
        }
    });
    
}
module.exports = { createFolder, appendFileToFolder, moveFileBetweenFolders }