<template>
  <div>
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input class="form-control" type="text" v-model="task.title" required />
      </div>
      <button class="btn btn-primary" type="submit">
        {{ submitButtonText }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "TaskForm",
  data() {
    return {
      task: {
        id: "",
        title: "",
      },
    };
  },

  computed: {
    formTitle() {
      return this.$route.params.id ? "Edit Task" : "Create Task";
    },
    submitButtonText() {
      return this.$route.params.id ? "Update Task" : "Add Task";
    },
  },

  created() {
    this.fetchTask();
  },

  beforeRouteUpdate(to, from, next) {
    this.fetchTask();
    next();
  },

  methods: {
    fetchTask() {
      if (this.$route.params.id) {
        const taskId = this.$route.params.id;
        const task = this.$store.state.tasks.find(
          (t) => t.id.toString() === taskId
        );
        if (task) {
          this.task = { ...task };
        }
      }
    },

    submitForm() {
      if (this.$route.params.id) {
        this.$store.dispatch("updateTask", this.task);
      } else {
        this.task.id = Date.now();
        this.$store.dispatch("addTask", this.task);
      }
      this.$router.push("/");
    },
  },
};
</script>
