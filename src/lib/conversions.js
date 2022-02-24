import { Base64 } from 'js-base64';

const uint8ToBase64 = function (uint8){
  return Base64.fromUint8Array(uint8);
};

const hexToUint8 = function(hex){
  if((hex.length % 2) !== 0){
    hex = `0${hex}`;
  }
  const bytes = new Uint8Array(Math.ceil(hex.length / 2));
  for (let i = 0; i < bytes.length; i++){
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
};

export { uint8ToBase64, hexToUint8 };
