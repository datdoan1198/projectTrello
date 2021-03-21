<template>
  <div id="app" :style="{backgroundImage: image}">
    <BaseAdminLayout v-if="isAuthenticated"/>
    <BaseLoginLayout v-else />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import BaseAdminLayout from './layout/BaseAdminLayout.vue'
import BaseLoginLayout from './layout/BaseLoginLayout.vue'
import api from './api'

export default {
  name: "App",
  components: {
    BaseAdminLayout,
    BaseLoginLayout,
  },
  computed: {
    ...mapState('login', [
      'isAuthenticated'
    ]),
    ...mapState('home', [
      'image'
    ])
  },
  data () {
    return {
      // image: 'url("https://i.pinimg.com/originals/c3/86/2d/c3862d44112f1ba8a8a7c4836c65af2a.jpg")'  
    }
  },
  methods:{
    ...mapMutations('home', [
      'setList'
    ]),
    ...mapMutations('login', [
      'updateLoginStatus', 
      'updateAuthUser',
    ])
  },
  mounted() {
    api.getAuthUser().then((response) => {
        if (response) {
          this.updateAuthUser(response.data)
        }
    })
    api.getList().then((response) => {
      if (response) {
        this.setList(response.data.data)
      }
    })
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
  background-size: cover;
  // height: 100vh;
  // width: 100vw;
  overflow: hidden;
}
#app {
  background-position: 50%;
  background-size: cover;
  height: 100vh;
  top: 0;
  left: 0;
      overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
