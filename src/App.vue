<template>
  <div>
    <h1>Tests</h1>

    <h3>Database</h3>
    <button @click="add()">Add Item</button> (Adds an item (incrementing_id and binary content starting with byte 7B))<br>
    <button @click="getLast()" v-if="created">Get last Item</button> (Gets the recent created item)

    <h3>File Access (Direct)</h3>
    <button @click="writeAFile()">Write</button> (Writes a test file with timestamp as content)<br>
    <button @click="readAFile()" v-if="isWritten()">Read</button> (Gets the recent written file content)
    <div v-if="isMobile()" >
      <input type="checkbox" v-model="specialFolder">
      <span v-if="isAndroid()">Save to external SD Card</span>
      <span v-if="isIos()">Save in iCloud-synchronized directory</span>
    </div>

    <h3>File Access (HTML5 API)</h3>
    <input type="checkbox" v-model="filesSelection.multiple" @click="resetFileSelection()"> Multiple Choice<br>
    <input v-bind:id="filesSelection.inputId" type="file" v-bind:multiple="filesSelection.multiple"><br>
    <button @click="readFiles()">Read files</button> (Shows name, type, size and content)<br>
    <textarea v-bind:id="filesSelection.outputId" placeholder="outputs will appear here"></textarea>

    <h3>JWT</h3>
    <div>
      <button @click="create()">Create Token</button> (creates a RSA signed token with random sub in payload)
    </div>
    <div v-if="jwtObject.created">
      <button @click="verify()">Verify Token</button> (verifies recently created token)
    </div>
    <div v-if="jwtObject.created">
      <button @click="invalidateTokenPayload()">Invalidate Payload</button> (makes the recently created token payload invalidate)
    </div>
    <div v-if="jwtObject.created">
      <button @click="invalidateTokenAlgo()">Invalidate Algorithm</button> (sets algo to none, which should be evaluated to invalid token)
    </div>
    <div v-if="jwtObject.created">
      Token: {{jwtObject.token}}<br>
      decoded header: {{JSON.stringify(jwtObject.decoded.header)}}<br>
      decoded payload: {{JSON.stringify(jwtObject.decoded.payload)}}
    </div>

    <h3>Crypto</h3>
    Some nice crypto features

    <h4>Scrypt</h4>
    <label>Input: <input type="text" v-model="scryptObject.password"></label><br>
    <button v-bind:disabled="scryptObject.running" @click="genSaltAndKek()">Create salt &amp; KEK</button> (Creates random salt & KEK (Key encryption key) based on given password, via Scrypt)<br>
    salt: {{base64Encode(scryptObject.salt)}}<br>
    progress:
    <span v-if="scryptObject.running">
      <progress v-bind:value="scryptObject.progress" max="1">{(scryptObject.progress * 100).toFixed(1)} %</progress>
    </span>
    <br>
    KEK: {{base64Encode(scryptObject.kek)}}
    <br><br><br>
  </div>

  <!-- this was the original template content -->
  <!--router-view /-->
</template>
<script>
import { defineComponent } from "vue";
import {Platform} from "quasar";
import { addItem, getItem } from "./storage/storage";
import { readFile, writeFile } from "./files/nativeFileAccess";
import { readSelectedFiles } from "./files/html5FileAccess";
import { createToken, verifyToken, invalidatePayload, invalidateAlgo } from "./jwt/jwt";
import { Base64 } from 'js-base64';
import { getRandomBytes } from './crypto/random';
import { scrypt } from './crypto/scrypt';

let item = 0;
const timestamp = new Date().getTime();

const successWriteCallback = (data) => {
  //is data always undefined?
  console.log(data);
};

const successReadCallback = (data) => {
  console.log(data);
  alert(data);
};

const errorCallback = (error) => {
  console.error(error);
};

export default defineComponent({
  name: "App",
  data: ()=>{
    return {
      created: false,
      written: false,
      writtenSpecial: false,
      specialFolder: false,
      filesSelection: {
        inputId: 'filesInput',
        outputId: 'output',
        multiple: false
      },
      jwtObject: {
        created: false,
        token: '',
        decoded: ''
      },
      scryptObject: {
        password: '',
        salt: '',
        kek: '',
        progress: 0,
        running: false
      }
    };
  },
  methods: {
    base64Encode(data){
      return Base64.fromUint8Array(data)
    },
    add(){
      addItem(`item_${timestamp}_${++item}`);
      this.created = true;
    },
    getLast(){
      getItem(`item_${timestamp}_${item}`);
    },
    writeAFile(){
      const content = new Date().getTime();
      writeFile('lastAccess.txt', content.toString(), successWriteCallback, errorCallback, this.specialFolder);
      if(Platform.is.desktop || !this.specialFolder){
        this.written = true;
      } else {
        this.writtenSpecial = true;
      }
    },
    readAFile(){
      readFile('lastAccess.txt', successReadCallback, errorCallback, this.specialFolder);
    },
    isMobile(){
      return Platform.is.mobile;
    },
    isAndroid(){
      return Platform.is.android;
    },
    isIos(){
      return Platform.is.ios;
    },
    isWritten(){
      return (Platform.is.desktop || !this.specialFolder) ? this.written : this.writtenSpecial;
    },
    readFiles(){
      readSelectedFiles(this.filesSelection);
    },
    resetFileSelection(){
      document.querySelector(`#${this.filesSelection.inputId}`).value='';
      document.querySelector(`#${this.filesSelection.outputId}`).value='';
    },
    create(){
      createToken(this.jwtObject);
    },
    verify(){
      verifyToken(this.jwtObject.token);
    },
    invalidateTokenPayload(){
      invalidatePayload(this.jwtObject);
    },
    invalidateTokenAlgo(){
      invalidateAlgo(this.jwtObject);
    },
    genSaltAndKek(){
      this.scryptObject.running = true;
      this.scryptObject.progress = 0;
      this.scryptObject.kek = '';
      this.scryptObject.salt = getRandomBytes(32);
      scrypt(this.scryptObject);
    }
  }
});
</script>
