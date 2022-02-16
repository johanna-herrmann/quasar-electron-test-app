<template>
  <q-item>
    <a href="#" @click="getLast()" v-if="created">getLast</a>
    -------
    <a href="#" @click="add()">ADD</a>
    -------
    <a href="#" @click="writeAFile()">write file</a>
    -------
    <a href="#" @click="readAFile()">read file</a>
    <q-item clickable tag="a" target="_blank" :href="link">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>
          {{ caption }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { addItem, getItem } from "../storage/storage";
import { readFile, writeFile } from "../files/fileAccess";

/* eslint-disable no-undef */
// eslint thinks "electronApi" is undefined

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
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
  data: ()=>{
    return {
      created: false
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
    },
    readAFile(){
      readFile('./lastAccess.txt', successReadCallback, errorCallback);
    }
  }
});


</script>
