import { Platform } from 'quasar';

let localDb;

export function addItem(id){
  const binary = new Uint8Array(1024*1014);
  binary[0] = 123;
  console.log(new Date().getTime());
  localDb.put({
    _id: id,
    title: `binary entry (id: ${id})`,
    content: binary
  }).then(function (response) {
    console.log(new Date().getTime());
    console.log(response);
    console.log(id);
  }).catch(function (err) {
    console.error(err);
  });
  console.log('in progress');
}

export function getItem(id){
  console.log(new Date().getTime());
  localDb.get(id).then(function (doc) {
    console.log(new Date().getTime());
    console.log(doc.content);
    console.log(doc.title);
    alert(doc.title);
  }).catch(function (err) {
    console.error(err);
  });
}

function getOptions(){
  const location = 'default';
  const options = {
    adapter: 'cordova-sqlite'
  }
  if(Platform.is.android){
    options.location = location;
  }
  if(Platform.is.ios){
    options.iosDatabaseLocation = location;
  }
  return options;
}

function setLocalDb(){
  const PouchDB = require('../unpkg/pouchdb');
  if(Platform.is.desktop){
    localDb = new PouchDB('testAppDatabase', {adapter: 'idb'});
    return;
  }
  document.addEventListener('deviceready', () => {
    cordova.sqlitePlugin = window.sqlitePlugin;
    PouchDB.plugin(require('../unpkg/pouchdb.cordova-sqlite'));
    localDb = new PouchDB('testApp2.db', getOptions());
  });
}

setLocalDb();
