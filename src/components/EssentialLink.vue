<template>
  <q-item>
    <a href="#" @click="getLast()" v-if="created">getLast</a>
    -------
    <a href="#" @click="add()">ADD</a>
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

/* eslint-disable no-undef */
// eslint thinks "electronApi" is undefined

let item = 0;
const timestamp = new Date().getTime();

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
    }
  }
});


</script>
