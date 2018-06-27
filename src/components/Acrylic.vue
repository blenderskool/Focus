<template>
  <div class="acrylic card">
    <span class="meter" v-if="meter" :style="{width: meter+'%'}" />
    <i v-if="icon" :class="'icon '+icon" :style="{color}"></i>
    <div class="info">
      <div class="title">{{ title }}</div>
      <div class="subtitle">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Acrylic',
  props: ['icon', 'title', 'subtitle', 'color', 'meter']
}
</script>

<style>
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
    /* background: url(https://source.unsplash.com/collection/1501932); */
    background: url(https://source.unsplash.com/random);
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

  .card {
    width: 100px;
    height: 100px;
    display: inline-flex;
    flex-direction: column;
    align-items: left;
    padding: 20px;
    color: #ffffff;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .card .icon {
    font-size: 22px;
    margin-top: 0;
    margin-bottom: auto;
  }
  .card .info {
    margin-bottom: 0;
    margin-top: auto;
    text-align: left;
  }
  .card .info .subtitle {
    font-size: 11px;
    color: rgba(220, 220, 220, 0.85);
    margin-top: 10px;
  }
  .card .meter {
    position: absolute;
    top: 0;
    height: 3px;
    left: 0;
    background-color: orange;
    opacity: 1;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }
  
  .card:hover {
    box-shadow: 0 10px 50px rgba(20, 20, 20, 0.7);
  }
  .card:hover::after {
    background-color: rgba(243, 243, 243, 0.45);
  }
</style>
