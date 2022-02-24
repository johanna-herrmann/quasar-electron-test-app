import Scrypt from 'scrypt-js';

// tested with second test vector from: http://www.tarsnap.com/scrypt/scrypt.pdf
const scrypt = async function (keyData){
  const N = 32768, r = 8, p = 1;
  const blockSize = 32;
  const passwordEncoded = new TextEncoder().encode(keyData.password);
  console.log('starting');
  Scrypt.scrypt(passwordEncoded, keyData.salt, N, r, p, blockSize, (progress) => {
    console.log(progress)
    keyData.progress = progress;
  }).then((key) => {
    console.log({key})
    keyData.kek = key;
    keyData.running = false;
    keyData.progress = 0;
  });
}

export { scrypt };
