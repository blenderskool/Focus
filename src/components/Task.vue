<template>
  <span class="item" :class="{completed}">
    <button class="primary" v-on:click="completeItem">
      <i class="icon ion-checkmark" v-if="completed" />
    </button>
    <span class="name">{{title}}</span>
    <div class="buttons">
      <button class="danger" v-on:click="deleteItem(title, state)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </span>
</template>

<script>
export default {
  name: 'Task',
  props: {
    title: String,
    completed: Boolean
  },
  methods: {
    deleteItem: function (item) {
      this.$emit('removeItem', item)
    },
    completeItem() {
      this.$emit('completeItem')
    }
  }
}
</script>

<style scoped>
.item {
  padding: 8px 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 55%;
  border-radius: 2px;
  margin: 7px 0;
  background-color: transparent;
  color: #ffffff;
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
  color: #0ACD47;
  border: none;
}
.completed .buttons button.primary:hover {
  background-color: #E4FAEB;
  color: #0ACD47;
}


button {
  outline: none;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 2px;
  transition: all 0.3s ease;
  cursor: pointer;
}
button.primary {
  width: 20px;
  height: 20px;
  border: 2px solid #0ACD47;
  background-color: transparent;
  color: #0ACD47;
  display: flex;
  align-items: center;
  justify-content: center;
}
button.primary .icon {
  font-size: 17px;
}

button.danger {
  background-color: #FFDFDD;
  color: #F16A62;
}
button.danger:hover {
  color: #FFDFDD;
  background-color: #F16A62;
}

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .item {
    width: 70%;
  }

  .name {
    max-width: 60%;
  }
}
</style>
