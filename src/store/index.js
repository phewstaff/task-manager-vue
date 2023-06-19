import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const TASKS_STORAGE_KEY = "tasks";

export default new Vuex.Store({
  state: {
    tasks: [],
  },

  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
    },

    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
    },

    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
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
      const tasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) || [];
      commit("initializeTasks", tasks);
    },
  },
});
