<template>
    <div class="baseAdminLayout">
        <header> 
            <div class="style-background">
                <div>
                    <!-- <span><i class="el-icon-s-home"></i></span> -->
                </div>
                <img class="logo-product" style="cursor: pointer" @click="goHome()" src="https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.ac67523ad250b82d5ab7.gif" alt="">
                <el-dropdown class="">
                    <div v-if="authUser.avatar" class="block"><el-avatar :size="30" :src="'http://vuecourse.zent.edu.vn/storage/users/' + authUser.avatar"></el-avatar></div>
                    <div v-else class="block"><el-avatar :size="30" :src="circleUrl"></el-avatar></div>
                    <el-dropdown-menu slot="dropdown" class="dropdown">
                        <router-link to="/infor">
                            <el-dropdown-item>Thông tin tài khoản</el-dropdown-item>
                        </router-link>
                        <el-dropdown-item divided @click.native="clickMe">
                            Đăng xuất
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </header>
        <main>
            <router-view/>
        </main>
    </div>
</template>

<script>
import {mapState, mapMutations } from 'vuex'
import api from '../api'
export default {
    name: "baseAdminLayout",
    data () {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        }
    },
    computed: {
        ...mapState('login', [
            'isAuthenticated',
            'authUser'
        ]),
    },
    methods: {
        ...mapMutations('home', [
            'setList'
        ]),
        ...mapMutations('login', [
            'updateLoginStatus',
            'updateAuthUser'
        ]),
        async clickMe () {
            localStorage.removeItem('access_token')
            localStorage.removeItem('vuex')
            this.updateLoginStatus(false)
            this.updateAuthUser({})
            if (this.$router.currentRoute.name !== 'Login') {
            await this.$router.push({ name: 'Login' })
            }
        },
        getDirectories(){
            api.getList().then((response) => {
                if (response) {
                    this.setList(response.data.data)
                }
            })
        },
        goHome () {
            this.$router.push({ name: 'Home' })
        }
    },
}
</script>

<style lang="scss">

.baseAdminLayout{
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
    width: 100%;
    header {
        max-height: 40px;
        background-color: #808080d9;
        min-height: 40px;
        overflow: hidden;
        .style-background {
            padding: 4px;
            display: flex;
            justify-content: space-between;
            .logo-product {
                margin-top: 5px;
                width: 7%;
                max-height: 20px;
            }
            .block {
                display: flex;
                justify-content: center;
                img {
                    width: 100%;
                    object-fit: cover;
                }
            }
            button {
                background-color: #ffffff;
                border: none;
                color: black;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
            }
            .el-dropdown{
                a {
                    text-decoration: none;
                }
            }
        }
    }
}
.dropdown{
    a{
        text-decoration: none;
    }
}
</style>