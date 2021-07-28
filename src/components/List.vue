<template>
  <ul class="todo-main">
    <Item v-for="(todo, index) in todos" :key="todo.id" :todo="todo" :index="index"></Item>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Item from "@/components/Item.vue";

export default defineComponent({
  name: "List",
  components: {
    Item,
  },
  props:['todos']
})
</script>

<style scoped>
.todo-main {
  margin-left: 0;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0;
}

.todo-empty {
  height: 40px;
  line-height: 20px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>