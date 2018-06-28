<template>
  <acrylic class="card">
    <span class="meter" v-if="meter" :style="{width: meter+'%'}" />
    <i v-if="icon" :class="'icon '+icon" :style="{color}"></i>
    <div class="info">
      <div class="title">{{ title }}</div>
      <div class="subtitle">{{ subtitle }}</div>
    </div>
  </acrylic>
</template>

<script>
import acrylic from './Acrylic'

export default {
  name: 'Card',
  props: ['icon', 'title', 'subtitle', 'color', 'meter'],
  components: {
    acrylic
  }
}
</script>

<style>
  .card {
    width: 100px;
    height: 100px;
    color: #ffffff;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 20px;
    display: inline-flex;
    flex-direction: column;
    align-items: left;
  }
  .card .child {
    margin-top: auto;
    margin-bottom: 0;
    text-align: left;
  }
  .card .icon {
    font-size: 22px;
    margin-top: 0;
    margin-bottom: auto;
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
  .card:hover .acrylic::after {
    background-color: rgba(243, 243, 243, 0.45);
  }
</style>
