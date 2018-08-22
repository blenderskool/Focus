<template>
  <div class="collections">
    <card
      v-for="(collection, i) in collections"
      :key="i"
      :title="collection.title"
      :subtitle="collection.tasks.length+' tasks'"
      :meter="getMeter(collection.tasks)"
      @click.native="open(i)"
      @contextmenu.native.prevent="contextMenu(i)"
    />

    <context-menu class="noise" ref="ctxMenu">
      <li @click="duplicate">Duplicate</li>
      <li @click="remove">Remove</li>
    </context-menu>

  </div>
</template>

<script>
import contextMenu from 'vue-context-menu';
import card from './Card';

export default {
  name: 'Collections',
  components: {
    card,
    'context-menu': contextMenu
  },
  data() {
    return {
      ctxCollection: -1
    }
  },
  computed: {
    collections() {
      return this.$store.state.collections;
    }
  },
  methods: {
    open(id) {
      window.history.pushState({id}, null, `./?collection=${id}`);
      this.$store.commit('loadCollection', id);
    },
    remove() {
      this.$store.commit('removeCollection', this.ctxCollection);
    },
    duplicate() {
      const active = this.collections[this.ctxCollection];
      this.$store.commit('addCollection', {
        title: active.title,
        tasks: JSON.parse(JSON.stringify(active.tasks)) // Duplicate the tasks list
      })
    },
    contextMenu(id) {
      this.ctxCollection = id;
      this.$refs.ctxMenu.open();
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

<style>
  ul.ctx-menu {
    background-color: rgba(2, 2, 2, 0.85);
    border: none;
    border-radius: 4px;
    color: #fff;
    box-shadow: 0 10px 50px rgba(20, 20, 20, 0.7);
    overflow: hidden;
    padding: 0;
  }
  ul.ctx-menu::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -2;
    pointer-events: none;
    background: url(http://api.thumbr.it/whitenoise-361x370.png?background=ffffff00&noise=626262&density=83&opacity=18);
    background-color: rgba(200, 200, 200, 0.28);
    transition: background-color 0.3s ease;
  }
  ul.ctx-menu li {
    padding: 10px 15px;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  ul.ctx-menu li:hover {
    background-color: rgba(20, 20, 20, 0.5);
  }
  ul.ctx-menu li:not(:last-child) {
    border-bottom: 1px solid #6f6f6f;
  }
</style>

