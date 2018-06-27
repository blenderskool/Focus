import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

return new Vuex.Store({
  state: {
    collections: [
      {
        title: 'To do',
        tasks: [
          {
            title: 'Hello World',
            completed: false,
            id: 23
          },
          {
            title: 'Quack',
            completed: true,
            id: 20
          },
          {
            title: 'Quack 2',
            completed: false,
            id: 39
          }
        ]
      },
      {
        title: 'Notes',
        tasks: [
          {
            title: 'Note 1',
            completed: true,
            id: 28
          },
          {
            title: 'Note 2',
            completed: true,
            id: 10
          }
        ]
      },
      {
        title: 'Calendar',
        tasks: [
          {
            title: 'Task 1',
            completed: false,
            id: 93
          }
        ]
      },
      {
        title: 'School',
        tasks: []
      }
    ],
    activeCollection: null,
  },
  getters: {
    tasks: (state, completed) => {
      return state.collections[state.activeCollection].tasks.filter(task => {
        if (completed)
          return task.completed;
        else
          return !task.completed;
      });
    },
  }
});