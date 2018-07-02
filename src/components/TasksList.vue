<template>
  <div class="tasks">
    <div class="wrapper">
      <acrylic class="list" v-if="todo.length">
        <ul>
          <task
            v-for="task in todo"
            :task="task"
            :key="task.id"
          />
        </ul>
      </acrylic>
      <span v-else-if="!todo.length && completed.length">
        Nothing left todo!
      </span>
    </div>
    <acrylic class="list" v-if="completed.length">
      <ul>
        <task
          v-for="task in completed"
          :task="task"
          :key="task.id"
        />
      </ul>
    </acrylic>
    <span v-else-if="!completed.length && todo.length">
      You haven't completed anything!
    </span>
    <tips v-if="!todo.length && !completed.length" />
  </div>
</template>

<script>
import acrylic from './Acrylic'
import tips from './Tips'
import task from './Task'

export default {
  name: 'TasksList',
  components: {
    task,
    tips,
    acrylic
  },
  computed: {
    todo() {
      return this.$store.getters.tasks();
    },
    completed() {
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
  .wrapper:not(:empty):after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    left: 45%;
    right: 45%;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .list {
    display: inline-block;
    width: 55%;
    margin: 15px 0;
    border-radius: 3px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
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
    .list {
      width: 80%;
    }

    .wrapper::after {
      left: 40%;
      right: 40%;
    }
  }

</style>