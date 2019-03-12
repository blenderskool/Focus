<template>
  <div>
    <acrylic class="input-wrapper">
      <input
        type="text"
        maxlength="20"
        placeholder="Enter a collection name"
        v-model="collName"
        v-on:keydown.enter="createCollection"
      >
    </acrylic>
    <br>

    <div class="collections">
      <card
        v-for="collection in collections"
        :key="collection.id"
        :title="collection.name"
        :subtitle="collection.tasks+' tasks'"
        :meter="getMeter(collection)"
        @click.native="open(collection)"
        @contextmenu.native.prevent="contextMenu(collection)"
      />

      <context-menu class="noise" ref="ctxMenu">
        <li @click="duplicate">Duplicate</li>
        <li @click="remove">Remove</li>
      </context-menu>

    </div>

    <tips v-if="!collections.length" />
  </div>
</template>

<script>
import acrylic from './Acrylic';
import contextMenu from 'vue-context-menu';
import card from './Card';
import tips from './Tips';

export default {
  name: 'Collections',
  components: {
    card,
    acrylic,
    tips,
    'context-menu': contextMenu
  },
  data() {
    return {
      ctxCollection: null,
      collName: '',
      collections: []
    }
  },
  methods: {
    open(collection) {
      window.history.pushState({ id: collection.id }, null, `./?collection=${collection.id}`);
      this.$emit('open', collection);
    },
    remove() {

      this.collections.splice(this.collections.findIndex(collection => collection.id === this.ctxCollection.id), 1);

      fetch(`http://localhost:3000/collections/${this.ctxCollection.id}`, {
        method: 'DELETE'
      })
      .catch(err => {
        console.log(err);
      });

    },
    duplicate() {
      const active = this.collections.find(collection => collection.id === this.ctxCollection.id);
      if (!active) return;


    },
    contextMenu(collection) {
      this.ctxCollection = collection;
      this.$refs.ctxMenu.open();
    },
    getMeter(collection) {
      if (collection.tasks === 0) return;

      // Percentage of tasks completed
      return collection.tasks_complete/collection.tasks*100;
    },
    createCollection() {
      if (!this.collName) return;

      fetch('http://localhost:3000/collections/add', {
        method: 'POST',
        body: JSON.stringify({
          name: this.collName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        
        this.collections.push(data);
        this.collName = '';
      })
      .catch(err => console.log(err));

    }
  },
  created() {

    fetch('http://localhost:3000/collections/')
    .then(res => res.json())
    .then(data => {
      this.collections = data;
    })
    .catch(err => console.log(err));

    /**
     * Makes use of the history API to provide a routing experience
     */
    window.addEventListener('popstate', (e) => {
      // this.$store.commit('loadCollection', e.state ? e.state.id : e.state);
    });

    /**
     * Change the Beacon call message as it is too big for mobile
     */
    document.getElementsByTagName('beacon-app')[0].callMessage = 'Other work';
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

