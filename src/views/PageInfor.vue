<template>
    <div class="pageInfor">
        <el-card class="headerInfor">
            <div class="style-headerInfor">
                <div v-if="authUser.avatar" class="block"><el-avatar :size="50" :src="'http://vuecourse.zent.edu.vn/storage/users/' + authUser.avatar"></el-avatar></div>
                <div v-else class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
                <div>
                    {{ authUser.name }}
                </div>
            </div>
            <div class="box-style">
                <el-row>
                    <el-col :span="24">
                        <div class="box-header style-infor">
                            <div class="title">Thông  tin cá nhân</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <div class="upload">
                            <div class="style-image">
                                <input style="opacity:0" ref="inputFile" type="file" accept="image/*" @change="onChangeUpload">
                                <img v-if="authUser.avatar" @click="thisFileUpload()" :src="'http://vuecourse.zent.edu.vn/storage/users/' + authUser.avatar" alt="">
                                <img v-else @click="thisFileUpload()" :src="circleUrl" alt="">
                                <div v-if="isImg" class="image-file">
                                    <img :src="imageLocal" alt="">
                                </div>
                            </div>
                            <div v-if="isImg" class="aa">
                                <div class="btn-x">
                                    <div class="icon">
                                        <i class="el-icon-close" @click="close()"></i>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <el-card class="box-main">
                            <el-row class="form">
                                <el-col :span="24">
                                    <div class="btn-style style-infor">
                                        <div class="label">Họ và Tên <span class="red">*</span></div>
                                        <el-input placeholder="Nhập họ và tên" v-model="name"></el-input>
                                        <span ref="errorName" class="error"></span>
                                    </div>
                                    <div class="btn-style style-infor">
                                        <div class="label">Email <span class="red">*</span></div>
                                        <el-input placeholder="Nhập email" v-model="authUser.email" :disabled="true"></el-input>
                                        <span ref="errorEmail" class="error"></span>
                                    </div>
                                </el-col>
                            </el-row>
                            <div class="btn-infor">
                                <el-button @click="updateInfoForSeller()" type="primary" plain><i class="el-icon-circle-check"></i> Lưu lại</el-button>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div class="box-style">
                <el-row>
                    <el-col :span="24">
                        <div class="box-header style-infor">
                            <div class="title">Đổi mật khẩu</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <div class="box-header style-infor">
                            <div class="title"></div>
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <el-card class="box-main">
                            <el-row class="form">
                                <el-col :span="24">
                                    <div class="btn-style style-infor">
                                        <div class="label">Mật khẩu mới <span class="red">*</span></div>
                                        <el-input placeholder="Nhập mật khẩu mới" v-model="passWorkNew" show-password></el-input>
                                        <span ref="errorNewPW" class="error"></span>
                                    </div>
                                    <div class="btn-style style-infor">
                                        <div class="label">Xác nhận mật khẩu <span class="red">*</span></div>
                                        <el-input placeholder="Nhập lại mật khẩu mới" v-model="passWorkConfirm" show-password></el-input>
                                        <!-- <div class="tip">Gồm 6 hoặc 8 kí tự, gồm số, chữ viết hoa, chữ thường</div> -->
                                        <span ref="errorNewPWC" class="error"></span>
                                    </div>
                                </el-col>
                            </el-row>
                            <div class="btn-infor">
                                <el-button @click="updatePassWordForSeller()" type="primary" plain><i class="el-icon-circle-check"></i> Thay đổi mật khẩu</el-button>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import api from '../api'
export default {
    name: "pageInfor",
    computed: {
      ...mapState('login', [
          'authUser',
      ])  
    },
    mounted () {
        this.name = this.authUser.name;
    },
    data () {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            image:'',
            imageLocal: '',
            passWorkNew:'',
            passWorkConfirm:'',
            isImg:false,
            name:'',
        }
    },
    methods:{
        ...mapMutations('login', [
            'updateAuthUser'
        ]),
        thisFileUpload(){
            this.$refs.inputFile.click();
        },
        onChangeUpload(e){
            if (e.target.files.length) {
                this.image = e.target.files[0]
                this.isImg = true;
                this.imageLocal = URL.createObjectURL(this.image);
            }
        },
        close(){
            this.imageLocal = '';
            this.isImg = false;
            this.image = ''; 
        },
        getMe () {
            api.getAuthUser().then((response) => {
                if (response) {
                this.updateAuthUser(response.data)
                }
            })
        },
        updateInfoForSeller () {
            let error = false;
            if (!this.name.length) {
                error = true;
                this.$refs.errorName.innerHTML = 'Tên không được để trống!'
            }
            if (!error) {
                const formData = new FormData();
                formData.append('name', this.name)
                if (this.image != '') {
                    formData.append('avatar', this.image)
                }
                api.updateUser(formData).then(() => {
                    this.getMe();
                    this.isImg = false;
                    this.imageLocal = '';
                    this.$message({message: 'Thay đổi thông tin cá nhân thành công ', type: 'infor'});
                }).catch(() => {
                    this.$message({message: 'Thông tin tài khoản hoặc mật khẩu không chính xác', type: 'error'});
                })
            }
        },
        updatePassWordForSeller () {
            let error = false;
            if (this.passWorkConfirm != this.passWorkNew) {
                error = true;
                this.$refs.errorNewPW.innerHTML = "Mật khẩu mới không trùng khớp";
                this.$refs.errorNewPWC.innerHTML = "Mật khẩu mới không trùng khớp";
            }
            if (this.passWorkNew.length < 6) {
                error = true;
                this.$refs.errorNewPW.innerHTML = "Mật khẩu mới phải có ít nhất 6 ký tự"
            }
            if (this.passWorkConfirm.length < 6) {
                error = true;
                this.$refs.errorNewPWC.innerHTML = "Mật khẩu mới phải có ít nhất 6 ký tự"
            }
            if (!this.passWorkNew.length) {
                error = true;
                this.$refs.errorNewPW.innerHTML = "Tên không được để trống!"
            }
            if (!this.passWorkConfirm.length) {
                error = true;
                this.$refs.errorNewPWC.innerHTML = "Tên không được để trống!"
            }
            if (!error) {
                let data = {
                    password: this.passWorkNew,
                    password_confirmation: this.passWorkConfirm,
                }
                api.updatePassWord(data).then(() => {
                    this.passWorkNew = '';
                    this.passWorkConfirm = '';
                    this.$message({message: 'Thay đổi mật khẩu thành công', type: 'success'});
                }).catch(() => {
                    this.$message({message: 'Thông tin tài khoản hoặc mật khẩu không chính xác', type: 'error'});
                })
            }
        }
    },
    watch: {
        name () {
            this.$refs.errorName.innerHTML = ''
        },
        passWorkNew () {
            this.$refs.errorNewPW.innerHTML = ""
        },
        passWorkConfirm () {
            this.$refs.errorNewPWC.innerHTML = ""
        }
    }
}
</script>

<style lang="scss">
.pageInfor {
    .headerInfor {
            position: relative;
            overflow-y: scroll;
            outline: none;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            max-height: 95vh;
        .el-card__body{
            padding: 0;
        }
        .style-headerInfor {
            background-color: #f4f5f7;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px 0px;
            font-size: 24px;
            font-weight: 800;
            .block {
                margin-right: 15px;
                img{
                    width: 100%;
                }
            }
        }
        .box-style{
            margin-bottom: 15px;
            padding: 20px;
            .box-header{
                margin-bottom: 15px;
                .title{
                    color: hsl(205, 32%, 16%);
                    font-size: 18px;
                    margin-bottom: 10px;
                    font-weight: 500;
                }
                .tip{
                    color: #99a6ad;
                    font-size: 14px;
                }
            }
            .box-main{
                .el-card__body{
                    padding: 0;
                    .form{
                        padding: 20px;
                    }
                    .btn-infor{
                        display: flex;
                        justify-content: flex-end;
                        padding: 15px 20px;
                        background-color: #f8f9fa;
                        button{
                            padding: 10px 15px;
                        }
                    }
                }
                .btn-style{
                    margin-bottom: 15px;
                    .label{
                        font-size: 12px;
                        margin-bottom: 10px;
                        color: #3f6079;
                        font-weight: 600;
                        .red{
                            color: #dc3545;
                        }
                    }
                    input{
                        margin-bottom: 3px;
                    }
                    .tip{
                        margin-top: 5px;
                        color: #99a6ad;
                        font-size: 12px;
                    }
                    .error {
                        color: #dc3545;
                        font-size: 12px;
                    }
                }
            }
            .upload{
                position: relative;
                display: flex;
                justify-content: center;
                .style-image{
                    width: 250px;
                    height: 250px;
                    border: 1px solid #EBEEF5;
                    padding: 10px;
                    position: relative;
                    border-radius: 5px;
                    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
                    img{
                        position: relative;
                        width: 250px;
                        height: 250px;
                    }
                    input {
                        position: absolute;
                    }
                    .image-file{
                        position: absolute;
                        background: white;
                        top: 10px;
                        z-index: 10;
                    }
                    .image-file:hover .aa{
                        visibility: visible
                    }
                }
                .aa{
                    visibility: hidden;
                    border: 1px solid burlywood;
                    position: absolute;
                    width: 250px;
                    height: 250px;
                    background: #0000004d;
                    padding: 10px;
                    top: 0;
                    z-index: 20;
                    border-radius: 5px;
                    .btn-x{
                        position: relative;
                        .icon{
                            cursor: pointer;
                            position: absolute;
                            top: -8px;
                            right: -8px;
                            font-size: 20px;
                        }
                    }
                }
            }
            .upload:hover .aa {
                visibility: visible;
            }
        }
    }
    .headerInfor::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    .headerInfor::-webkit-scrollbar-thumb {
        background-color: #c0c4cc;
        border-radius: 8px;
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