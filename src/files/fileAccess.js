import {Platform} from "quasar";

const readFile = (path, successCallback, errorCallback) => {
  if(Platform.is.desktop){
    window.electronApi.readFile(path, successCallback, errorCallback);
  }
};

const writeFile = (path, content, successCallback, errorCallback) => {
  if(Platform.is.desktop){
    window.electronApi.writeFile(path, content, successCallback, errorCallback);
  }
};

export { readFile, writeFile };
