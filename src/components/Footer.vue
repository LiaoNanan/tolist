<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="selectAll"/>
    </label>
    <span>
      <span>已完成{{count}}</span> / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger" @click="deleteAll">清除已完成的任务</button>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {Todo} from "@/types/todo";

export default defineComponent({
  name: "Footer",
  props:{
    todos:{
      type: Array as ()=> Todo[],
      required: true
    },
    isSelectAll:{
      type: Function,
      required: true
    },
    clearAllSelectedTodos:{
      type: Function,
      required: true
    }
  },

  setup(props){
    const count = computed(()=>{
      return props.todos?.reduce( (pre, todo)=>{ return pre+(todo.isSelected?1:0)} , 0);
    })

    const selectAll = computed({
      get(){
        return count.value>0 && props.todos.length === count.value;
      },
      set(val){
        props.isSelectAll(val);
      }
    })

    const deleteAll = ()=>{
      if (window.confirm("是否清除已完成的任务")) {
        props.clearAllSelectedTodos();
      }
    }

    return {
      count,
      selectAll,
      deleteAll,
    }
  }


})
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}
.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}
.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>