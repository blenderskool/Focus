<template>
  <div>
    <ul>
      <li v-for="(task, i) in todo" :key="task.id">
        <task
          :title="task.title"
          :completed="task.completed"
          @removeItem=""
        />
      </li>
    </ul>
    <ul>
      <li v-for="(task, i) in completed" :key="task.id">
        <task
          :title="task.title"
          :completed="task.completed"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import task from './Task';

export default {
  name: 'TasksList',
  components: {
    task
  },
  computed: {
    todo: function() {
      return this.$store.getters.tasks;
    },
    completed: function() {
      return this.$store.getters.tasks(true);
    }
  }
}
</script>

<style scoped>
</style>