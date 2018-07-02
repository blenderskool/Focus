import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function getTask(state, taskID) {
  /**
   * Returns a task based on the taskID
   */
  const tasks = state.collections[state.activeCollection].tasks;
  const task = tasks.filter(task => task.id === taskID);

  return task;
}

function updateStorage(data) {
  /**
   * Stores the data in localStorage
   */
  localStorage.setItem('app.akash.focus', JSON.stringify(data));
}

export default new Vuex.Store({
  state: {
    collections: [],
    activeCollection: null,
  },
  getters: {
    activeCollection: state => {
      /**
       * Only collection data is returned. Additional task data must be requested
       * separately
       */
      const collection = {...state.collections[state.activeCollection]};
      collection.tasks = undefined;

      return collection;
    },
    tasks: state => completed => {
      /**
       * Returns todo, completed tasks in active collection
       */
      return state.collections[state.activeCollection].tasks.filter(task => {
        if (completed)
          return task.completed;
        else
          return !task.completed;
      });
    }
  },
  mutations: {
    setStorage: (state, data) => {
      state.collections = data;
    },
    loadCollection: (state, id) => {
      state.activeCollection = id;
    },
    addCollection: (state, title) => {
      /**
       * Creates a new collection
       */
      state.collections.push({
        title,
        tasks: []
      });

      updateStorage(state.collections);
    },
    addTask: (state, title) => {
      /**
       * Adds a task to the active collection
       */
      const tasks = state.collections[state.activeCollection].tasks;

      tasks.unshift({
        title: title,
        completed: false,
        id: Math.random().toString(36).substring(7)
      });

      updateStorage(state.collections);
    },
    toggleTask: (state, taskID) => {
      /**
       * Toggles the state of the task based on the taskID parameter
       */
      const task = getTask(state, taskID);

      if (task.length) {
        task[0].completed = !task[0].completed;
        updateStorage(state.collections);
      }
    },
    removeTask: (state, taskID) => {
      /**
       * Removes a task from the active collection
       */
      const tasks = state.collections[state.activeCollection].tasks;
      const task = getTask(state, taskID);

      if (task.length) {
        tasks.splice(tasks.indexOf(task[0]), 1);
        updateStorage(state.collections);
      }
    }
  }
});