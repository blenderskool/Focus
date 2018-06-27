<template>
  <div class="tasks">
    <div class="wrapper">
      <ul class="acrylic" v-if="todo.length">
        <task
          v-for="task in todo"
          :task="task"
          :key="task.id"
        />
      </ul>
      <span v-else>
        Nothing left todo!
      </span>
    </div>
    <ul class="acrylic" v-if="completed.length">
      <task
        v-for="task in completed"
        :task="task"
        :key="task.id"
      />
    </ul>
    <span v-else>
      You haven't completed anything!
    </span>
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
      return this.$store.getters.tasks();
    },
    completed: function() {
      return this.$store.getters.tasks(true);
    }
  }
}
</script>

<style scoped>

  .tasks {
    text-align: center;
  }

  .wrapper {
    position: relative;
  }
  .wrapper::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    left: 45%;
    right: 45%;
    background-color: rgba(255, 255, 255, 0.5);
  }

  ul {
    list-style: none;
    padding: 0;
    width: 55%;
    display: inline-block;
    border-radius: 3px;
    position: relative;
  }

  ul >>> li:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  span {
    color: rgba(255, 255, 255, 0.8);
    margin: 25px 0;
    display: inline-block;
  }

  @media only screen and (max-width : 600px) {
    ul {
      width: 80%;
    }

    .wrapper::after {
      left: 40%;
      right: 40%;
    }
  }

</style>