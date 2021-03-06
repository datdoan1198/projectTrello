<template>
  <div id="app">
    <BaseAdminLayout v-if="isLogin"/>
    <BaseLoginLayout v-else />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import BaseAdminLayout from './layout/BaseAdminLayout.vue'
import BaseLoginLayout from './layout/BaseLoginLayout.vue'
import axios from 'axios'

export default {
  name: "App",
  components: {
    BaseAdminLayout,
    BaseLoginLayout,
  },
  computed: {
    ...mapState('login', [
      'isLogin',
      'isAuthenticated'
    ])
  },
  methods:{
    ...mapMutations('login', ['changeLoginStatus'])
  },
  mounted() {
      axios({
        method: 'get',
        url: 'http://vuecourse.zent.edu.vn/api/auth/me',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then((response) => {
        this.changeLoginStatus({
          isAuthenticated: true,
          authUser: response.data,
        })
      }).catch((error) => {
        if (error.response.status === 401) {
          this.changeLoginStatus({
            isAuthenticated: false,
            authUser: {},
          })
          localStorage.removeItem('access_token')
          if (this.$router.currentRoute.name !== 'Login') {
            this.$router.push({ name: 'Login' })
          }
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
