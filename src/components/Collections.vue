<template>
  <div class="collections">
    <card
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
import card from './Card';

export default {
  name: 'Collections',
  components: {
    card
  },
  computed: {
    collections() {
      return this.$store.state.collections;
    }
  },
  methods: {
    openCollection(id) {
      window.history.pushState({id}, null, `./?collection=${id}`);
      this.$store.commit('loadCollection', id);
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
