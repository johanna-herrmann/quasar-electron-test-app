const localDb = getDb();

export function addItem(id){
  const binary = new Uint8Array(10*1024*1014);
  binary[0] = 123;
  localDb.put({
    _id: id,
    title: `binary entry (id: ${id})`,
    content: binary
  }).then(function (response) {
    console.log(response);
    console.log(id);
  }).catch(function (err) {
    console.error(err);
  });
  console.log('in progress');
}

export function getItem(id){
  localDb.get(id).then(function (doc) {
    console.log(doc.content);
  }).catch(function (err) {
    console.error(err);
  });
}

function getDb(){
  if((typeof electronStorage) !== 'undefined'){
    // electron context
    return electronStorage.getLocal();
  }
  // cordova context
  return {put(obj){alert(obj)}, get(id){alert(id)}};
}
