<template>
  <div id="app">
    <h1 class="title">Focus</h1>
    <h4 class="subtitle">Developed by <a href="https://github.com/blenderskool" target="_blank">Akash Hamirwasia</a></h4>
    <br>
    <!-- <div class="acrylic input-wrapper">
      <input type='text' maxlength="45" v-on:keydown.enter="addNewItem">
    </div> -->
    <button v-if="activeCollection !== null" @click="activeCollection = null">Back</button>
    <br>
    <div v-if="activeCollection !== null && data.collections[activeCollection].tasks.length">
      <tasks />
    </div>
    <collections
      v-else-if="activeCollection === null"
      @openCollection="loadCollection"
      @newCollection="createCollection"
    />
    <transition name="fade" mode="out-in" v-else>
      <span style="display: none" class="help" :key="updateTip" v-html="tip"></span>
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
      tip: 'Start by entering a text and pressing <span class="border">Enter</span>',
      updateTip: false // Causes transition when updated
    }
  },
  components: {
    tasks,
    collections
  },
  created: function () {
    const tips = [
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
      const data = JSON.parse(localStorage.getItem('app.akash.focus'));
      this.todo = data.todo;
      this.complete = data.complete;
    }

    /**
     * Help tips shown after 7s with fade transition;
     */
    setInterval(() => {
      if (this.todo.length || this.complete.length) return;

      const index = tips.indexOf(this.tip);
      this.tip = tips[index == tips.length-1 ? 0 : index+1];
      this.updateTip = !this.updateTip;
    }, 7000);
  },
  methods: {
    addNewItem: function (e) {
      this.todo.unshift(e.target.value)
      e.target.value = ''
      this.updateLocalStorage()
    },
    removeItem: function (task) {
      const tasks = this.data.collections[this.activeCollection].tasks;
      tasks.splice(tasks.indexOf(task), 1);
      // this.updateLocalStorage()
    },
    completeItem: function (task) {
      task.completed = !task.completed;
      // this.updateLocalStorage();
    },
    createCollection(title) {
      this.data.collections.push({
        title: title,
        tasks: []
      });
    },
    loadCollection(id) {
      console.log(id);
      this.activeCollection = id;
    },
    updateLocalStorage: function () {
      localStorage.setItem('app.akash.focus', JSON.stringify({todo: this.todo, complete: this.complete}))
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
  padding: 15px 25px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: transparent;
  background-color: rgba(230, 230, 230, 0.4);
}
input:focus {
  background-color: rgba(230, 230, 230, 0.65);
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
  margin-bottom: 50px;
}

.todo {
  list-style: none;
  margin: 0;
  padding: 0;
}
.todo:empty:after {
  content: 'You have completed everything!';
}

.todo:after, .completed:after {
  display: block;
  color: rgba(255, 255, 255, 0.8);
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
  padding: 7vh 0;
  user-select: none;
  min-height: 86vh;
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
  /* background: url(https://source.unsplash.com/collection/1501932); */
  background: url(https://source.unsplash.com/random);
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  z-index: -2;
}

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  input {
    width: 70%;
  }

  #app {
    padding: 5vh 0;
    min-height: 90vh;
  }
  
  span.help {
    font-size: 18px;
  }
  span.help .border {
    font-size: 16px;
  }
}
</style>
