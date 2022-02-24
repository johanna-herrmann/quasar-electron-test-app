// values produced by these functions were tested in another application which is tested by test vectors

import forge from "node-forge";
import { hexToUint8 } from "src/lib/conversions";

const wrapKey = function(keyData){
  const key = forge.random.getBytesSync(32);
  const kek = forge.util.createBuffer(keyData.kek, 'raw');
  const iv = forge.util.createBuffer(keyData.salt.slice(0, 12), 'raw');
  const cipher = forge.cipher.createCipher('AES-GCM', kek);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(key));
  cipher.finish();
  const ciphertext = cipher.output.toHex();
  const tag = cipher.mode.tag.toHex();
  keyData.wrappedKey = hexToUint8(`${ciphertext}${tag}`);
  const test = "";
}

const unwrapKey = async function(keyData){
  const encryptedKey = forge.util.createBuffer(keyData.wrappedKey.slice(0, 32), 'raw');
  const tag = forge.util.createBuffer(keyData.wrappedKey.slice(32, 48), 'raw');
  const kek = forge.util.createBuffer(keyData.kek, 'raw');
  const iv = forge.util.createBuffer(keyData.salt.slice(0, 12), 'raw');
  const cipher = forge.cipher.createDecipher('AES-GCM', kek);
  cipher.start({ iv, tag });
  cipher.update(encryptedKey);
  const passed = cipher.finish();
  if(passed){
    keyData.key = hexToUint8(cipher.output.toHex());
  } else {
    console.log('this would happen if wrapped key was tampered with or the password was wrong')
  }
}

export { wrapKey, unwrapKey };
