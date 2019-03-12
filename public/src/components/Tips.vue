<template>
  <transition name="fade" mode="out-in">
    <span class="help" :key="updateTip" v-html="tip"></span>
  </transition>
</template>

<script>
export default {
  name: 'Tips',
  data() {
    return {
      tip: 'Start by entering some text and pressing <span class="border">Enter</span>',
      updateTip: false // Causes transition when updated,
    }
  },
  created() {
    const tips = [
      'Create collections to organize your tasks',
      'All the tasks are saved for future',
      'Stay focused and work towards your goal',
      'Remove your old tasks using the trash icon',
      'By completing a task you are one step ahead towards your goal',
      'Start by entering some text and pressing <span class="border">Enter</span>'
    ];

    /**
     * Help tips shown after 7s with fade transition
     */
    setInterval(() => {
      const index = tips.indexOf(this.tip);
      this.tip = tips[index == tips.length-1 ? 0 : index+1];
      this.updateTip = !this.updateTip;
    }, 7000);
  }
}
</script>

<style scoped>
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
  /* Transition Animations */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>

<style>
  span.help .border {
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 3px;
    padding: 2px 5px;
    display: inline-block;
    margin: 8px 5px;
    font-size: 18px;
  }
</style>
