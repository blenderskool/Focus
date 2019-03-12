<template>
  <li class="item" :class="{completed: task.is_complete}">
    <button class="primary" v-on:click="toggleTask">
      <i class="icon ion-ios-checkmark" v-if="task.is_complete" />
    </button>
    <span class="name">{{ task.task }}</span>
    <div class="buttons">
      <button class="danger" v-on:click="removeTask">
      <i class="icon ion-md-trash" />
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: Object
  },
  methods: {
    removeTask() {
     
      this.$emit('remove', this.task.id);
      fetch(`http://localhost:3000/tasks/${this.task.id}`, {
        method: 'DELETE'
      })
      .catch(err => console.log(err));

    },
    toggleTask() {
      
      this.$emit('toggle', this.task.id);
      fetch(`http://localhost:3000/tasks/${this.task.id}/update`, {
        method: 'POST'
      })
      .catch(err => console.log(err));

    }
  }
}
</script>

<style scoped>
.item {
  padding: 12px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background-color: transparent;
  color: #ffffff;
  transition: background-color .3s ease;
}
.item:hover {
  background-color: rgba(243, 243, 243, 0.25);
}
.item .buttons {
  margin-left: auto;
}

.name {
  max-width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 25px;
}

.completed .name {
  text-decoration: line-through;
}
.completed button.primary {
  font-size: 24px;
  display: inline-block;
}
.completed button.primary ion-icon {
  position: relative;
  top: -4px;
  left: -4px;
}


button {
  outline: none;
  border: none;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0;
  background-color: transparent;
}
button.primary {
  border: 2px solid #ebebeb;
  color: #ebebeb;
}
button.primary .icon {
  font-size: 26px;
  position: relative;
  top: -7px;
}

button.danger {
  width: 35px;
  height: 35px;
  color: rgba(243, 243, 243, 0.8);
  font-size: 20px;
}
button.danger:hover {
  color: #fff;
  background-color: rgba(255, 241, 241, 0.3);
}

@media only screen and (max-width : 600px) {
  .name {
    max-width: 60%;
  }
}
</style>
