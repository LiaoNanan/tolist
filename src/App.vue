<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"></Header>
      <List :todos="todos"></List>
      <Footer :todos="todos" :isSelectAll="isSelectAll" :clearAllSelectedTodos="clearAllSelectedTodos"></Footer>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, provide, reactive, toRefs, watch} from "vue";
import Header from "@/components/Header.vue";
import List from "@/components/List.vue";
import Footer from "@/components/Footer.vue";

import {Todo} from './types/todo'
import {saveArray, readArray} from './utils/localStorageUtil'


export default defineComponent({
  name: "App",
  components: {
    Header,
    List,
    Footer,
  },
  setup() {
    const state = reactive<{ todos: Todo[] }>({
      todos: []
    })

    const key = 'todos_key'
    onMounted(()=>{
      setTimeout(()=>{
        state.todos = readArray(key)
      },1000)
    })

    watch(()=>state.todos,(value: Todo [])=>{
      saveArray(key, value as [])
    },{deep:true})

    const addTodo = (todo:Todo)=>{
      state.todos.unshift(todo);
    }

    const updateTodoStatus = (todo:Todo, status:boolean)=>{
      todo.isSelected = status;
    }

    const deleteTodo = (index:number)=>{
      state.todos.splice(index,1);
    }

    provide('updateTodoStatus',updateTodoStatus);
    provide('deleteTodo',deleteTodo);

    const isSelectAll = (status:boolean)=>{
      state.todos.forEach( todo =>{
        todo.isSelected = status;
      });
    }
    const clearAllSelectedTodos = ()=>{
      state.todos = state.todos.filter(todo => !todo.isSelected);
    }


    return {
      ...toRefs(state),
      addTodo,
      isSelectAll,
      clearAllSelectedTodos,
    }
  }
})
</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>