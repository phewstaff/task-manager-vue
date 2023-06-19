import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import App from "./App.vue";
import TaskList from "./components/TaskList.vue";
import TaskForm from "./components/TaskForm.vue";

Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  { path: "/", component: TaskList },
  { path: "/create", component: TaskForm },
  { path: "/edit/:id", component: TaskForm },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

const store = new Vuex.Store({
  state: {
    tasks: [],
  },

  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },

    initializeTasks(state, tasks) {
      state.tasks = tasks;
    },
  },

  actions: {
    addTask({ commit }, task) {
      commit("addTask", task);
    },

    deleteTask({ commit }, taskId) {
      commit("deleteTask", taskId);
    },

    updateTask({ commit }, updatedTask) {
      commit("updateTask", updatedTask);
    },

    initializeTasks({ commit }) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      commit("initializeTasks", tasks);
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
