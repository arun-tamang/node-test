const fs = require('fs');
const path = require('path');

const handleError = require('./handleError');
const logResults = require('./logResults');

let directory = process.argv[2];

function walk(dir, done) {
  let foundFiles = [];
  let foundFolders = [];
  fs.readdir(dir, function (err, fileList) {
    if (err) {
      return done(err);
    }

    let numFiles = fileList.length;

    if (numFiles < 1) {
      return done(null, foundFiles, foundFolders);
    }

    fileList.forEach(function (file) {
      file = path.resolve(dir, file);

      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          foundFolders = foundFolders.concat(file);
          walk(file, function (err, fls, fldrs) {
            foundFiles = foundFiles.concat(fls);
            foundFolders = foundFolders.concat(fldrs);
            if ((--numFiles) < 1) done(null, foundFiles, foundFolders);
          });
        } else {
          foundFiles.push(file);
          if ((--numFiles) < 1) done(null, foundFiles, foundFolders);
        }
      });
    });
  });
};

walk(directory, function (err, files, folders) {
  if (err) {
    console.log('Error: ');
    handleError(err.code);
    return;
  }
  
  logResults(files, folders);
});
