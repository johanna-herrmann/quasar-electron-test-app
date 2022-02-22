
const getRandomBytes = function(size){
  const randomBytes = new Uint8Array(size);
  crypto.getRandomValues(randomBytes);
  return randomBytes;
}

export { getRandomBytes };
