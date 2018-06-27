<template>
  <div class="collections">
    <acrylic
      v-for="(collection, i) in collections"
      :key="i"
      :title="collection.title"
      :subtitle="collection.tasks.length+' tasks'"
      :meter="getMeter(collection.tasks)"
      @click.native="openCollection(i)"
    />
  </div>
</template>

<script>
import acrylic from './Acrylic';

export default {
  name: 'Collections',
  props: ['collections'],
  components: {
    acrylic
  },
  methods: {
    openCollection(id) {
      this.$emit('openCollection', id);
    },
    getMeter(tasks) {
      const completed = tasks.filter(task => task.completed).length;

      if (tasks.length === 0) return;

      return completed/tasks.length*100;
    }
  }
}
</script>

<style scoped>
  .collections {
    display: inline-flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 380px;
  }
  .collections .card {
    margin: 25px;
  }
</style>
