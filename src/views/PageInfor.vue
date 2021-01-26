<template>
    <div class="pageInfor">
        <div class="headerInfor">
            <div class="style-headerInfor">
                <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
                <div>
                    Full Name
                </div>
            </div>
        </div>
        <div class="infor">
            Quản lý thông tin cá nhân
        </div>
        <div class="infor">
            Quản lý Tài khoản mật khẩu
        </div>  
        <div class="infor">
            Quản lý thông tin cá nhân
        </div>  
         <div class="infor">
            Quản lý Tài khoản mật khẩu
        </div>  
    </div>
</template>

<script>
export default {
    name: "pageInfor",
    data () {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        }
    }
}
</script>

<style lang="scss">
.pageInfor {
    position: relative;
    overflow-y: auto;
    outline: none;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100vh;
    .headerInfor {
        display: flex;
        justify-content: center;
        font-size: 25px;
        padding: 32px;
        background-color: #f4f5f7;
        .style-headerInfor {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px 0px;
            .block {
                margin-right: 15px;
            }
        }
    }
    .infor {
        background-color: white;
        text-align: center;
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 50px;
        height: 60vh;
    }
}
</style>