<template>
  <div id="app">
    <h1 class="title">Focus</h1>
    <h4 class="subtitle">Developed by <a href="https://github.com/blenderskool" target="_blank">Akash Hamirwasia</a></h4>
    <br>
    <acrylic class="input-wrapper">
      <input
        type="text"
        maxlength="45"
        :placeholder="`Enter a task in ${activeCollData.title.toLowerCase()}`"
        v-model="taskName"
        v-on:keydown.enter="createTask"
        v-if="activeCollection !== null"
      >
      <input
        type="text"
        maxlength="20"
        placeholder="Enter a collection name"
        v-model="collName"
        v-on:keydown.enter="createCollection"
        v-else
      >
    </acrylic>
    <br>
    <div v-if="activeCollection !== null">
      <tasks />
    </div>
    <collections v-else-if="activeCollection === null" />
    <tips v-if="!collections.length" />

    <div class="repo">
      <acrylic>
        <a href="https://github.com/blenderskool/focus" target="_blank">
          <ion-icon name="logo-github" />
        </a>
      </acrylic>
    </div>
  </div>
</template>

<script>
import acrylic from './components/Acrylic'
import tips from './components/Tips'
import tasks from './components/TasksList'
import collections from './components/Collections'

export default {
  name: 'App',
  data () {
    return {
      collName: '',
      taskName: '',
    }
  },
  components: {
    tasks,
    collections,
    acrylic,
    tips
  },
  computed: {
    collections() {
      return this.$store.state.collections;
    },
    activeCollection() {
      return this.$store.state.activeCollection;
    },
    activeCollData() {
      return this.$store.getters.activeCollection;
    }
  },
  created() {
    /**
     * Fetch saved tasks from localStorage
     */
    if (localStorage.getItem('app.akash.focus')) {
      let data = JSON.parse(localStorage.getItem('app.akash.focus'));
      if (data.todo) {
        localStorage.setItem('app.akash.focus', '');
        data = [];
      }

      this.$store.commit('setStorage', data);
    }

    /**
     * Makes use of the history API to provide a routing experience
     */
    window.addEventListener('popstate', (e) => {
      this.$store.commit('loadCollection', e.state ? e.state.id : e.state);
    });

    /**
     * Change the Beacon call message as it is too big for mobile
     */
    document.getElementsByTagName('beacon-app')[0].callMessage = 'Other work';
  },
  methods: {
    createTask() {
      if (this.taskName) {
        this.$store.commit('addTask', this.taskName);
        this.taskName = '';
      }
    },
    createCollection() {
      if (this.collName) {
        this.$store.commit('addCollection', {
          title: this.collName
        });
        this.collName = '';
      }
    }
  }
}
</script>

<style>

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }
  body::-webkit-scrollbar {
    display: none;
  }

  body, button, input {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
  }

  .input-wrapper {
    width: 55%;
    border-radius: 8px;
    margin-bottom: 50px;
    display: inline-block;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.1s ease;
  }
  .input-wrapper:focus-within {
    box-shadow: none;
  }
  .input-wrapper .acrylic::after {
    background-color: rgba(200, 200, 200, 0.1) !important;
  }

  input {
    outline: none;
    border: 1px solid rgba(255, 255, 255, 0.35);
    width: 100%;
    color: #fff;
    padding: 13px 25px;
    font-size: 16px;
    border-radius: 8px;
    background-color: rgba(230, 230, 230, 0);
    transition: all 0.3s ease;
  }
  input::-webkit-input-placeholder {
    color: #efefef;
  }
  input:focus {
    background-color: rgba(230, 230, 230, 0.3);
  }

  h1.title {
    font-weight: 300;
    color: rgba(255, 255, 255, 0.8);
    font-size: 50px;
    margin-bottom: 10px;
    transition: all 0.3s ease;
  }
  h1.title:hover {
    color: #fff;
  }

  h4.subtitle {
    color: rgba(255, 255, 255, 0.75);
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 25px;
  }

  #app {
    text-align: center;
    padding: 3.5vh 0;
    user-select: none;
    min-height: 100vh;
    position: relative;
    background-color: rgba(0, 0, 0, 0.45);
  }
  #app::after {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: url(https://source.unsplash.com/collection/1501932);
    background-size: cover;
    background-position: center center;
    z-index: -5;
  }

  .repo {
    position: fixed;
    top: 8px;
    right: 8px;
    color: #ffffff;
  }
  .repo .acrylic-container {
    border-radius: 100vh;
  }
  .repo a {
    padding: 8px 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all 0.3s ease;
  }
  .repo a:hover {
    background-color: rgba(230, 230, 230, 0.3);
  }


@media only screen and (max-width : 600px) {
  .input-wrapper {
    width: 80%;
  }  
  span.help {
    font-size: 18px;
  }
  span.help .border {
    font-size: 16px;
  }
}
</style>
