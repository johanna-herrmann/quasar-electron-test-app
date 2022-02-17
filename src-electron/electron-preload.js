/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * WARNING!
 * All code before contextBridge.exposeInMainWorld(...) must be run without any error!
 * Otherwise, the api functions will not be mapped! (because the execution terminates before, without any error report!)
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */

import { contextBridge } from 'electron';
import fs from 'fs';

const runCallback = (successCallback, errorCallback, error, data) => {
  if(error){
    errorCallback(error);
    return;
  }
  successCallback(data);
};

contextBridge.exposeInMainWorld('electronApi', {
  readFile: (path, successCallback, errorCallback) => {
    fs.readFile(path, (error, data) => {
      // from uint8Array to string (is data always uint8Array?)
      const content = new TextDecoder().decode(data);
      runCallback(successCallback, errorCallback, error, content);
    });
  },
  writeFile: (path, content, successCallback, errorCallback) => {
    fs.writeFile(path, content, (error, data) => {
      runCallback(successCallback, errorCallback, error, data);
    });
  }
})
