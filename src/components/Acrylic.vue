<template>
  <div class="acrylic-container">
    <div class="child">
      <slot />
    </div>
    <div class="acrylic" />
  </div>
</template>

<script>
export default {
  name: 'Acrylic'
}
</script>

<style scoped>
  .acrylic-container {
    position: relative;
    overflow: hidden;
    z-index: 0;
  }

  .acrylic {
    position: absolute !important;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    clip: rect(auto, auto, auto, auto);
    /* overflow: hidden; */
    z-index: -1;
  }
  .acrylic::before {
    content: '';
    position: fixed;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    background: url(https://source.unsplash.com/collection/1501932);
    /* background-attachment: fixed; */
    background-size: cover;
    background-position: center center;
    z-index: -3;
    pointer-events: none;
    filter: blur(10px) saturate(1.2) brightness(0.7);
  }
  .acrylic::after {
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

</style>
