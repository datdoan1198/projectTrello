<template>
  <div id="app">
    <BaseAdminLayout v-if="isLogin"  @emitIsLogin="changeIsLogin"/>
    <BaseLoginLayout v-else />
  </div>
</template>

<script>
import BaseAdminLayout from './layout/BaseAdminLayout.vue'
import BaseLoginLayout from './layout/BaseLoginLayout.vue'

export default {
  name: "App",
  components: {
    BaseAdminLayout,
    BaseLoginLayout,
  },
  data () {
    return {
      isLogin: true,
    }
  },
  methods:{
    changeIsLogin (val) {
      this.isLogin = val;
    },
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  position: relative;
  background-image: url("https://data.1freewallpapers.com/download/winter-snow-branches-fence-winter-landscape-1366x768.jpg") ;
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
