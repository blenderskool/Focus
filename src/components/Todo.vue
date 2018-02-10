<template>
  <span class="item">
    <span class="name">{{title}}</span>
    <div class="buttons">
      <button class="primary" v-on:click="completeItem(title, state)">
        <i class="fas fa-check"></i>
      </button>
      <button class="danger" v-on:click="deleteItem(title, state)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </span>
</template>

<script>
export default {
  name: 'todo',
  props: ['title', 'state'],
  methods: {
    deleteItem: function (item, state) {
      this.$emit('removeItem', item, state)
    },
    completeItem: function (item, state) {
      this.$emit('completeItem', item, state)
    }
  }
}
</script>

<style>
.item {
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
  padding: 13px 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 55%;
  border-radius: 2px;
  margin: 7px 0;
  background-color: rgba(255, 255, 255, 0.7);
  transition: all 0.4s ease;
}
.item:hover {
  background-color: #ffffff;
}
.item .buttons {
  margin-left: auto;
}

.name {
  max-width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
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
