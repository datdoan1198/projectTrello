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
        <div title="Thay đổi ảnh phông nền" @click="showEditLayout()" ref="showEditLayout" class="btn-show-layout">
            <span class="el-icon-menu"></span>
        </div>
        <div ref="editLayout" class="box-update-layout">
            <div class="header">
                <span class=""></span>
                <h3>Thay đổi phông nền</h3>
                <span @click="closeImage()" class="el-icon-close"></span>
            </div>
            <div class="images">
                <el-row>
                    <el-col :span="12" class="image" v-for="(image, index) in images" :key="index">
                        <img @click="addImage(image)" :src="image" alt="">
                    </el-col>
                </el-row>
            </div>
        </div>
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
            images:[
                'https://anhdepblog.com/wp-content/uploads/2018/07/hinh-nen-luffy-one-piece-27.jpg',
                'https://i.pinimg.com/originals/3a/3c/ab/3a3cabd94347cf64dade52882308c780.jpg',
                'https://i.pinimg.com/originals/c3/86/2d/c3862d44112f1ba8a8a7c4836c65af2a.jpg',
                'https://img2.thuthuatphanmem.vn/uploads/2018/11/25/anh-dep-lol-cho-may-tinh_030637773.jpg',
                'https://bloggame.net/uploads/worigin/2020/03/28/hinhnenlienminhhuyenthoai4k15e7ec3c27825c_5a75a1d905dd7a01d068e5fcba4fc69a.jpg',
                'https://bloggame.net/uploads/worigin/2020/03/28/hinhnenlienminhhuyenthoai4k85e7ec3c0e0801_f1daf91f01a1d876ac237292271f7fb8.jpg',
                'https://genk.mediacdn.vn/2018/7/17/akali-1531816888068561277720.jpg',
                'https://camnang24h.net/wp-content/uploads/2019/03/hinh-nen-tuong-Akali-trong-lien-minh-huyen-thoai.jpg',
                'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg',
                'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2133x1600/3d9e98339baa20724041eb9ff10cbe1f/photo-1612207595828-3cc4bea65669.jpg',
                'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2401x1600/18118c7f715f43db1a943776015aeea2/photo-1614273657090-70f34021e963.jpg',
                'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2398x1600/c7b07b99ec5c0b34dda6f2df0a10d07e/photo-1604135745600-bc4e7e64e605.jpg',
                'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/87c866845e85114dd95a117fcf82afce/photo-1609342122563-a43ac8917a3a.jpg'
            ]
            
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
            'setList',
            'changeImage'
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
        },
        showEditLayout() {
            this.$refs.editLayout.classList.remove('deactive');
            this.$refs.editLayout.classList.add('active');
        },
        addImage (url) {
            this.changeImage(url);
        },
        closeImage () {

            this.$refs.editLayout.classList.remove('active');
            this.$refs.editLayout.classList.add('deactive');
        }
    },
}
</script>

<style lang="scss">

.baseAdminLayout{
    // body {
    //     position: relative;
    //     background-image: url("https://data.1freewallpapers.com/download/winter-snow-branches-fence-winter-landscape-1366x768.jpg") ;
    //     background-position: center;
    //     background-repeat: no-repeat;
    //     background-size: cover;
    //     height: 100vh;
    //     width: 100vw;
    //     overflow: hidden;
    // }
    position: relative;
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
    .box-update-layout{
        padding: 15px;
        width: 20vw;
        height: 100vh;
        background-color: #ebecf0;
        position: absolute;
        top: 0;
        right: -25vw;
        overflow: auto;
        .header{
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid rgba(9,30,66,.13);;
        }
        .images {
            .image{
                padding: 5px;
                height: 100px;
                overflow: hidden;
                border-radius: 8px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    cursor: pointer;
                    transform:scale(1, 1);
                    transition: all 0.5s; 
                }
                img:hover{
                    transform: scale(1.5, 1.5);
                }
            }
        }
    }
    .box-update-layout::-webkit-scrollbar {
        width: 10px;
    }
    .box-update-layout::-webkit-scrollbar-track {
        background: #d9dbe2; 
        border-radius: 8px;
    }
    .box-update-layout::-webkit-scrollbar-thumb {
        background: #bec3cd;
        border-radius: 8px;
    }
    @keyframes example2 {
        from {right: 0vw;}
        to {right: -25vw;}
    }
    .active{
        animation-name: example;
        animation-duration: 1s;
        right: 0;
    }
    @keyframes example {
        from {right: -25vw;}
        to {right: 0vw;}
    }
    .deactive{
        animation-name: example2;
        animation-duration: 1s;
        right: -25vw;
    }
    .btn-show-layout {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.47);
        top: 86vh;
        right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s;
    }
    .btn-show-layout:focus .box-update-layout{
        visibility: visible;
    }
    .btn-show-layout:hover{
        background-color: #ebecf0;
    }
}
.dropdown{
    a{
        text-decoration: none;
    }
}
</style>