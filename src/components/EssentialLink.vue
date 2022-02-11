<template>
  <q-item clickable tag="a" target="_blank" :href="link">
    <a href="#" @click="get('item_1')">getFirst</a>
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <a href="#" @click="add()">ADD</a>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { addItem, getItem } from "../storage";
/* eslint-disable no-undef */
// eslint thinks "electronApi" is undefined

let item = 0;

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
  methods: {
    add(){
      addItem(`item_${++item}`)
    },
    get(id){
      getItem(id);
    }
  }
});


</script>
