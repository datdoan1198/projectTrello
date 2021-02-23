<template>
  <div id="app">
    <BaseAdminLayout v-if="isLogin"/>
    <BaseLoginLayout v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseAdminLayout from './layout/BaseAdminLayout.vue'
import BaseLoginLayout from './layout/BaseLoginLayout.vue'

export default {
  name: "App",
  components: {
    BaseAdminLayout,
    BaseLoginLayout,
  },
  computed: {
    ...mapState('login', [
      'isLogin'
    ])
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  position: relative;
  background-image: url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/5957498b9c5e6f9ef359c6ac2d0ceb43/photo-1599551528722-6b6d968512a2.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
#app {
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
