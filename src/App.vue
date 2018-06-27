<template>
  <div id="app">
    <h1 class="title">Focus</h1>
    <h4 class="subtitle">Developed by <a href="https://github.com/blenderskool" target="_blank">Akash Hamirwasia</a></h4>
    <br>
    <div class="acrylic input-wrapper">
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
    </div>
    <br>
    <div v-if="activeCollection !== null">
      <tasks />
    </div>
    <collections v-else-if="activeCollection === null" />
    <transition name="fade" mode="out-in" v-if="!collections.length">
      <span class="help" :key="updateTip" v-html="tip"></span>
    </transition>
  </div>
</template>

<script>
import tasks from './components/TasksList'
import collections from './components/Collections'

export default {
  name: 'App',
  data () {
    return {
      collName: '',
      taskName: '',
      tip: 'Start by entering some text and pressing <span class="border">Enter</span>',
      updateTip: false // Causes transition when updated,
    }
  },
  components: {
    tasks,
    collections
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
  created: function () {
    const tips = [
      'Create collections to organize your tasks',
      'All the tasks are saved for future',
      'Stay focused and work towards your goal',
      'Remove your old tasks using the trash icon',
      'By completing a task you are one step ahead towards your goal',
      'Start by entering some text and pressing <span class="border">Enter</span>'
    ]

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
     * Help tips shown after 7s with fade transition
     */
    setInterval(() => {
      if (this.collections.length) return;

      const index = tips.indexOf(this.tip);
      this.tip = tips[index == tips.length-1 ? 0 : index+1];
      this.updateTip = !this.updateTip;
    }, 7000);
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
        this.$store.commit('addCollection', this.collName);
        this.collName = '';
      }
    }
  }
}
</script>

<style>
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
    border-radius: 3px;
    margin-bottom: 50px;
    display: inline-block;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
  }

  input {
    outline: none;
    border: none;
    width: 100%;
    color: #fff;
    padding: 15px 25px;
    font-size: 16px;
    transition: all 0.3s ease;
    background-color: transparent;
    background-color: rgba(230, 230, 230, 0.15);
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

  span.help {
    font-size: 20px;
    display: inline-block;
    margin: 7vh 30px;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
  }
  span.help:hover {
    color: #fff;
  }
  span.help .border {
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 3px;
    padding: 2px 5px;
    display: inline-block;
    margin: 8px 5px;
    font-size: 18px;
  }


  /* Transition Animations */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  #app {
    text-align: center;
    padding: 3.5vh 0;
    user-select: none;
    min-height: 93vh;
    position: relative;
    background-color: rgba(0, 0, 0, 0.45);
  }
  #app::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: url(https://source.unsplash.com/collection/1501932);
    background-size: cover;
    background-attachment: fixed;
    background-position: center center;
    z-index: -2;
  }

  .acrylic {
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(46, 46, 46, 0.4);
  }
  .acrylic::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    background: url(https://source.unsplash.com/collection/1501932);
    background-size: cover;
    background-attachment: fixed;
    background-position: center center;
    z-index: -1;
    pointer-events: none;
    filter: blur(10px) saturate(1.5);
  }
  .acrylic::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background-color: rgba(243, 243, 243, 0.28);
    transition: background-color 0.3s ease;
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
