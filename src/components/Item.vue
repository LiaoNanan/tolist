<template>
  <li @mouseenter="mouseHandler(true)" @mouseleave="mouseHandler(false)" :style="{backgroundColor:bgColor, color:myColor}">
    <label>
      <input type="checkbox" v-model="upStatus"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-if="isShow" @click="del">删除</button>
  </li>
</template>

<script lang="ts">
import {computed, defineComponent, inject, ref} from "vue";
import {Todo} from "@/types/todo";

export default defineComponent({
  name: "Item",
  props: {
    todo:{
      type: Object as ()=> Todo,
      required:true
    },
    index:{
      type: Number,
      required:true
    }
  },
  setup(props){
    const bgColor = ref('white');
    const myColor = ref('black');
    const isShow = ref(false);
    const mouseHandler = (flag:boolean)=> {
      if (flag){
        bgColor.value = 'pink';
        myColor.value = 'green';
        isShow.value = true;
      }
      else{
        bgColor.value = 'white';
        myColor.value = 'black';
        isShow.value = false;
      }
    }

    const updateTodoStatus = inject('updateTodoStatus', Function, true);
    const deleteTodo = inject('deleteTodo', Function, true);

    const del = ()=>{
      if (window.confirm("是否删除该任务")) {
        deleteTodo(props.index);
      }
    }
    const upStatus = computed({
      get(){
        return props.todo.isSelected;
      },
      set(val:boolean){
        updateTodoStatus(props.todo, val);
      }
    })

    return {
      mouseHandler,
      bgColor,
      myColor,
      isShow,
      del,
      upStatus,
    }
  }
})
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li::before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>