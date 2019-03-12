<template>
  <div>

    <acrylic class="input-wrapper">
      <input
        type="text"
        maxlength="45"
        :placeholder="`Enter a task in ${collection.name}`"
        v-model="taskName"
        v-on:keydown.enter="createTask"
      >
    </acrylic>
    <br>
    <div class="tasks">
      <div class="wrapper">
        <acrylic class="list" v-if="todo.length">
          <ul>
            <task
              v-for="task in todo"
              :task="task"
              :key="task.id"
              @toggle="toggle"
              @remove="remove"
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
            @toggle="toggle"
            @remove="remove"
          />
        </ul>
      </acrylic>
      <span v-else-if="!completed.length && todo.length">
        You haven't completed anything!
      </span>
      <tips v-if="!todo.length && !completed.length" />
    </div>
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
  props: ['collection'],
  data() {
    return {
      tasks: [],
      taskName: ''
    }
  },
  computed: {
    todo() {
      return this.tasks.filter(task => !task.is_complete);
    },
    completed() {
      return this.tasks.filter(task => task.is_complete);
    }
  },
  methods: {
    toggle(id) {
      /**
       * Gets the task with the given id
       * and toggles it between completed-uncompleted state
       */
      const task = this.tasks.find(task => task.id === id);
      task.is_complete = !task.is_complete;
    },
    remove(id) {
      /**
       * Get the array index of the task using the given id and remove it
       * from the tasks array
       */
      this.tasks.splice(this.tasks.findIndex(task => task.id === id), 1);
    },
    createTask() {
      if (!this.taskName) return;

      fetch('http://localhost:3000/tasks/add', {
        method: 'POST',
        body: JSON.stringify({
          task: this.taskName,
          collection: this.collection.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.tasks.push(data);

        this.taskName = '';
      })
      .catch(err => console.log(err));

    }
  },
  created() {
    
    fetch('http://localhost:3000/tasks?collection='+this.collection.id)
    .then(res => res.json())
    .then(data => {
      this.tasks = data;
    })
    .catch(err => {
      console.log(err);
    });

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
    border-radius: 8px;
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