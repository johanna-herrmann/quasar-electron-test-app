import {Platform} from "quasar";

document.addEventListener('deviceready', () => {
  if(!Platform.is.android){
    return;
  }
  cordova.plugins.diagnostic.getExternalSdCardDetails(function(details){
    details.forEach(function(detail){
      if(detail.canWrite && detail.freeSpace > 100000){
        cordova.file.externalSdCardDirectory = detail.filePath;
      }
    });
  }, function(error){
    console.error(error);
  });
});

const getPathForMobile = function(specialFolder) {
  const folders = {
    android: [
      //despite the name 'externalDataDirectory' this is the internal storage accessible from any file manager
      //path: <INTERNAL>/Android/data/<APP-ID>/files/
      //example: <INTERNAL>/Android/data/de.markherrmann.testapp/files/
      cordova.file.externalDataDirectory, // content: 1645116500946

      //this is the true external sd storage (set at the beginning of this file in the event listener function)
      //path: <EXTERNAL>/Android/data/<APP-ID>/files/
      //example: <EXTERNAL>/Android/data/de.markherrmann.testapp/files/
      cordova.file.externalSdCardDirectory// content: 1645116519784
    ],
    ios: [
      cordova.file.documentsDirectory+'NoCloud/', //does it work?
      cordova.file.documentsDirectory // does it work?
    ]
  }
  const platform = Platform.is.android ? 'android' : 'ios';
  const folderIndex = specialFolder ? 1 : 0;
  return folders[platform][folderIndex];
}

const readFileMobile = function(filename, successCallback, errorCallback, specialFolder) {
  const path = getPathForMobile(specialFolder);
  console.log(path);
  window.resolveLocalFileSystemURL(path, function (dirEntry){
    dirEntry.getFile(filename, {create: true, exclusive: false}, function(fileEntry) {
      fileEntry.file(function (file) {
        const reader = new FileReader();
        reader.onloadend = function() {
          console.log("Successful file read: " + this.result);
          console.log(fileEntry.fullPath + ": " + this.result);
          successCallback(this.result);
        };
        reader.readAsText(file, 'UTF-8');
      }, errorCallback);
    }, errorCallback);
  }, function(err){console.error(err)});
}

const writeFileMobile = function(filename, content, successCallback, errorCallback, specialFolder) {
  const path = getPathForMobile(specialFolder);
  console.log(path);
  window.resolveLocalFileSystemURL(path, function (dirEntry){
    dirEntry.getFile(filename, {create: true, exclusive: false}, function(fileEntry) {
      fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function() {
          console.log("Successful file write...");
          successCallback('success');
        };
        fileWriter.onerror = function (e) {
          console.error("Failed file write: " + e.toString());
        };
        const dataObj = new Blob([content], { type: 'text/plain' });
        fileWriter.write(dataObj);
      });
    }, errorCallback);
  });
}

const readFile = function(filename, successCallback, errorCallback, specialFolder) {
  if(Platform.is.desktop){
    window.electronApi.readFile('./'+filename, successCallback, errorCallback);
  } else {
    readFileMobile(filename, successCallback, errorCallback, specialFolder);
  }
};

const writeFile = function(filename, content, successCallback, errorCallback, specialFolder) {
  if(Platform.is.desktop){
    window.electronApi.writeFile('./'+filename, content, successCallback, errorCallback);
  } else {
    writeFileMobile(filename, content, successCallback, errorCallback, specialFolder);
  }
};

export { readFile, writeFile };
