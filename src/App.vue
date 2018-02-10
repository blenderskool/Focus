<template>
  <div id="app">
    <h1 class="title">Focus</h1>
    <h4 class="subtitle">Developed by <a href="https://github.com/blenderskool" target="_blank">Akash Hamirwasia</a></h4>
    <br>
    <input type='text' maxlength="45" v-on:keydown.enter="addNewItem">
    <br>
    <div class="todo">
      <div v-for="item in data.todo" :key="item">
        <todo :title="item" state="todo" @removeItem="removeItem" @completeItem="completeItem"></todo>
      </div>
    </div>
    <div class="completed">
      <div v-for="item in data.complete" :key="item">
        <todo :title="item" state="complete" @removeItem="removeItem" @completeItem="completeItem"></todo>
      </div>
    </div>
  </div>
</template>

<script>
import todo from './components/Todo'

export default {
  name: 'App',
  data () {
    return {
      data: {
        todo: [],
        complete: []
      }
    }
  },
  components: {
    todo
  },
  created: function () {
    if (localStorage.getItem('app.akash.focus')) {
      this.data = JSON.parse(localStorage.getItem('app.akash.focus'))
    }
  },
  methods: {
    addNewItem: function (e) {
      this.data.todo.unshift(e.target.value)
      e.target.value = ''
      this.updateLocalStorage()
    },
    removeItem: function (item, state) {
      if (state === 'todo') {
        this.data.todo.splice(this.data.todo.indexOf(item), 1)
      } else {
        this.data.complete.splice(this.data.complete.indexOf(item), 1)
      }
      this.updateLocalStorage()
    },
    completeItem: function (item, state) {
      if (state === 'todo') {
        this.removeItem(item, 'todo')
        this.data.complete.unshift(item)
      } else {
        this.removeItem(item, 'complete')
        this.data.todo.unshift(item)
      }
      this.updateLocalStorage()
    },
    updateLocalStorage: function () {
      localStorage.setItem('app.akash.focus', JSON.stringify(this.data))
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

input {
  outline: none;
  border: none;
  width: 55%;
  padding: 15px 25px;
  font-size: 16px;
  border-radius: 3px;
  opacity: 0.8;
  transition: all 0.3s ease;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
}
input:focus {
  opacity: 1;
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
  width: 70px;
  background-color: #E4FAEB;
  color: #0ACD47;
}
button.primary:hover {
  color: #E4FAEB;
  background-color: #0ACD47;
}
button.danger {
  background-color: #FFDFDD;
  color: #F16A62;
}
button.danger:hover {
  color: #FFDFDD;
  background-color: #F16A62;
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

.todo:empty:after {
  content: 'You have completed everything!';
}

.todo:after, .completed:after {
  display: block;
  color: rgba(255, 255, 255, 0.8);
}

.completed {
  margin-top: 30px;
}
.completed:before {
  content: '';
  width: 100px;
  height: 1px;
  margin-bottom: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  display: inline-block;
}
.completed:empty:after {
  content: "You haven't completed anything";
}
.completed button.primary {
  color: #E4FAEB;
  background-color: #0ACD47;
}
.completed button.primary:hover {
  background-color: #E4FAEB;
  color: #0ACD47;
}

#app {
  text-align: center;
  padding: 7vh 0;
  user-select: none;
  min-height: 86vh;
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
}
#app::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: url(https://source.unsplash.com/collection/1501932/1600x900);
  background-size: cover;
  background-position: center center;
  z-index: -1;
}

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  input {
    width: 70%;
  }

  #app {
    padding: 5vh 0;
    height: 90vh;
  }
}
</style>
