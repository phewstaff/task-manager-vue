<template>
  <div>
    <h2>Task List</h2>
    <ul class="list-group mb-4">
      <li class="list-group-item" v-for="task in tasks" :key="task.id">
        <div class="d-flex justify-content-between align-items-center">
          <div>{{ task.title }}</div>
          <div>
            <button class="btn btn-danger btn-sm" @click="deleteTask(task.id)">
              Delete
            </button>
            <router-link
              class="btn btn-primary btn-sm ml-2"
              :to="`/edit/${task.id}`"
            >
              Edit
            </router-link>
          </div>
        </div>
      </li>
    </ul>

    <router-link class="btn btn-success mt-3" to="/create"
      >Create Task</router-link
    >
  </div>
</template>

<script>
export default {
  name: "TaskList",
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },

  methods: {
    deleteTask(taskId) {
      this.$store.dispatch("deleteTask", taskId);
    },
  },
};
</script>
