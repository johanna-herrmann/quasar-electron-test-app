import forge from 'node-forge';
import jwtDecode from 'jwt-decode';
import { publicKeyPem, privateKeyPem } from "./keyPair";


// noinspection JSUnresolvedVariable (inspection bug?)
const pki = forge.pki;
// noinspection JSUnresolvedVariable (inspection bug?)
const md = forge.md;

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript#answer-1349426
const generateRandomSub = function(){
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  const charactersLength = characters.length;
  let result = '';
  for ( let i = 0; i < 11; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const encodePart = function (plain){
  return window.btoa(plain)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

const decodePart = function (encoded){
  let urlDecoded = encoded
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const equalMarksNeeded = urlDecoded.length % 4;
  for(let i = 1; i <= equalMarksNeeded; i++){
    urlDecoded += '=';
  }
  return window.atob(urlDecoded);
}

const createToken = function (jwtObject){
  const privateKey = pki.privateKeyFromPem( privateKeyPem );
  const header = {
    alg: "RS256",
    typ: 'JWT'
  };
  const payload = {
    sub: generateRandomSub()
  };
  const encodedHeader = encodePart(JSON.stringify(header));
  const encodedPayload = encodePart(JSON.stringify(payload));
  const sha256 = md.sha256.create();
  sha256.update(`${encodedHeader}.${encodedPayload}`, 'raw');
  // noinspection SpellCheckingInspection
  const signature = privateKey.sign(sha256, "RSASSA-PKCS1-V1_5");
  const encodedSignature = encodePart(signature);
  jwtObject.token = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  jwtObject.decoded = { header, payload };
  jwtObject.created = true;
}

const verifyToken = function (token){
  const publicKey = pki.publicKeyFromPem( publicKeyPem );
  const header = jwtDecode(token, {header:true});
  const payload = jwtDecode(token, {header:false});
  if('RS256' !== header.alg){
    alert('NOT valid\nreason: invalid algorithm');
    return;
  }
  const signature = decodePart(token.split('.')[2]);
  const sha256 = md.sha256.create();
  sha256.update(`${token.split('.')[0]}.${token.split('.')[1]}`, 'raw');
  const valid = publicKey.verify(sha256.digest().bytes(), signature);
  if(valid){
    alert('VALID\nsub: ' + payload.sub);
    return;
  }
  alert('NOT valid\nreason: invalid signature');
}

const invalidatePayload = function (jwtObject){
  const token = jwtObject.token;
  const header = token.split('.')[0];
  const signature = token.split('.')[2];
  // noinspection SpellCheckingInspection
  const invalidPayload = 'eyJzdWIiOiJpbnZhbGlkQSJ9';
  const invalidToken = `${header}.${invalidPayload}.${signature}`;
  console.log({invalidToken});
  jwtObject.token = invalidToken;
  jwtObject.decoded = {
    header: jwtDecode(invalidToken, {header:true}),
    payload: jwtDecode(invalidToken, {header:false})
  };
}

const invalidateAlgo = function (jwtObject){
  const token = jwtObject.token;
  const payload = token.split('.')[1];
  const signature = token.split('.')[2];
  // noinspection SpellCheckingInspection
  const invalidHeader = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0';
  const invalidToken = `${invalidHeader}.${payload}.${signature}`;
  console.log({invalidToken});
  jwtObject.token = invalidToken;
  jwtObject.decoded = {
    header: jwtDecode(invalidToken, {header:true}),
    payload: jwtDecode(invalidToken, {header:false})
  };
}

export { createToken, verifyToken, invalidatePayload, invalidateAlgo };
