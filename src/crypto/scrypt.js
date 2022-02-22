import Scrypt from 'scrypt-js';

// tested with second test vector from: http://www.tarsnap.com/scrypt/scrypt.pdf
const scrypt = async function (scryptObject){
  const N = 32768, r = 8, p = 1;
  const blockSize = 32;
  const passwordEncoded = new TextEncoder().encode(scryptObject.password);
  console.log('starting');
  Scrypt.scrypt(passwordEncoded, scryptObject.salt, N, r, p, blockSize, (progress) => {
    console.log(progress)
    scryptObject.progress = progress;
  }).then((key) => {
    console.log({key})
    scryptObject.kek = key;
    scryptObject.running = false;
    scryptObject.progress = 0;
  });
}

export { scrypt };
