<template>
    <div class="baseAdminLayout">
        <header> 
            <div class="style-background">
                <img src="../assets/images/ZimCore Quiver.png" alt="">
                
                <el-dropdown>
                    <div class="block"><el-avatar :size="31" :src="circleUrl"></el-avatar></div>
                    <el-dropdown-menu slot="dropdown">
                        <router-link to="/infor">
                        <el-dropdown-item> Thông tin tài khoản </el-dropdown-item>
                        </router-link>
                        <el-dropdown-item divided class="login">
                            <el-button @click="clickMe()"> Đăng xuất </el-button>
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
import { mapMutations } from 'vuex'
export default {
    name: "baseAdminLayout",
    data () {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        }
    },
    methods: {
        ...mapMutations('login', [
            'changeIsLogin',
        ]),
        clickMe () {
           this.changeIsLogin();
           this.$router.push('/login')
        }
    }
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
            img {
                width: 10%;
                max-height: 32px;
            }
            .block {
                display: flex;
                justify-content: center;
                img {
                    width: 100%;
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
        }
    }
    
}
</style>