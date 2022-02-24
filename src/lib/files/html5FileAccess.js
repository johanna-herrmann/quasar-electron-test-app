
const readFile = function (file, index, outputId){
  const fileReader = new FileReader();
  fileReader.onloadend = function(data) {
    const {name, type, size} = file;
    const content = data.target.result;
    const line = JSON.stringify({index, name, size, type, content});
    document.querySelector(`#${outputId}`).value += line+'\r\n';
  }
  fileReader.readAsText(file, 'utf-8');
}

const readSelectedFiles = function ({inputId, outputId, multiple}){
  const input = document.querySelector(`#${inputId}`);
  const files = input.files;
  let index = 0;
  for(const file of files){
    readFile(file, index, outputId);
    index++;
    if(!multiple){
      break;
    }
  }
}

export { readSelectedFiles }
