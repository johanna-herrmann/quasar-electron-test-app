<template>
  <div>
    <h1>Tests</h1>

    <h3>Database</h3>
    <button @click="add()">Add Item</button> (Adds an item (incrementing_id and binary content starting with byte 7B))<br>
    <button @click="getLast()" v-if="created">Get last Item</button> (Gets the recent created item)

    <h3>File Access (Direct)</h3>
    <button @click="writeAFile()">Write</button> (Writes a test file with timestamp as content)<br>
    <button @click="readAFile()" v-if="written">Read</button> (Gets the recent written file content)

  </div>

  <!-- this was the original template content -->
  <!--router-view /-->
</template>
<script>
import { defineComponent } from "vue";
import { addItem, getItem } from "./storage/storage";
import { readFile, writeFile } from "./files/fileAccess";

let item = 0;
const timestamp = new Date().getTime();

const successWriteCallback = (data) => {
  //is data always undefined?
  console.log(data);
};

const successReadCallback = (data) => {
  // from uint8Array to string (is data always uint8Array?)
  const content = new TextDecoder().decode(data);
  console.log(data);
  console.log(content);
  alert(content);
};

const errorCallback = (error) => {
  console.error(error);
};

export default defineComponent({
  name: "App",
  data: ()=>{
    return {
      created: false,
      written: false
    };
  },
  methods: {
    add(){
      addItem(`item_${timestamp}_${++item}`);
      this.created = true;
    },
    getLast(){
      getItem(`item_${timestamp}_${item}`);
    },
    writeAFile(){
      const content = new Date().getTime();
      writeFile('./lastAccess.txt', content.toString(), successWriteCallback, errorCallback);
      this.written = true;
    },
    readAFile(){
      readFile('./lastAccess.txt', successReadCallback, errorCallback);
    }
  }
});
</script>
