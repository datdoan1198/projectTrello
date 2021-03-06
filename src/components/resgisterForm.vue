<template>
    <div class="loginForm">
        <div class="style_logo">
            <img src="" alt="">
        </div>

        <div class="style_input">
            <div class="war-input">
                <input :style="{ border: colorName }" class="sui-input" placeholder="Tên đăng nhập" type="text"  v-model="name" >
            </div>
            <div v-if="this.errorName != '' " class="error">
                <svg class="sui-error-message-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
                </svg>
                <span> {{ errorName }} </span>
            </div>
        </div>

        <div class="style_input">
            <div class="war-input">
                <input :style="{ border: colorEmail }" class="sui-input" placeholder="Email" type="email" v-model="email" >
            </div>
            <div v-if="this.errorEmail != '' " class="error">
                <svg class="sui-error-message-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
                </svg>
                <span> {{ errorEmail }} </span>
            </div>
        </div>
        
        <div class="style_input">
            <div class="war-input">
                <input :style="{ border: colorPW }" class="sui-input" placeholder="Mật khẩu" type="password"  v-model="passWord" >
            </div>
            <div v-if="this.errorPassWord != '' " class="error">
                <svg class="sui-error-message-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
                </svg>
                <span> {{ errorPassWord }} </span>
            </div>
        </div>
        <el-button @click="submitFormRegister()" class="login">Đăng Ký</el-button>        
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
// import _ from 'lodash'

export default {
    name: "loginForm",
    data () {
        return {
            errorName:'',
            errorEmail: '',
            errorPassWord: '',
            name:'',
            email: '',
            passWord: '',
            colorName:'',
            colorPW: '',
            colorEmail: '',
        }
    },
    computed: {
        ...mapState('login', ['isAuthenticated'])
    },
    methods: {
        ...mapMutations('login', [
            'changeIsLogin',
            'changeLoginStatus'
        ]),
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        submitFormRegister(){
            let error = false;
            this.errorEmail = '';
            this.errorPassWord = '';
            this.errorName = '';
            this.colorName = '';
            this.colorPW = '';
            this.colorEmail = '';
            if (this.name.length < 6) {
                this.errorName = 'Tên phải lớn hơn 6 ký tự';
                this.colorName = "1px solid #f54b5e";
                error = true;
            }
            if (this.name.length == 0) {
                this.errorName = 'Tên không được để trống';
                this.colorName = "1px solid #f54b5e";
                error = true;
            }
            if (!this.validEmail(this.email)) {
                this.errorEmail = 'Email sai định dạng, vui lòng nhập lại';
                this.colorEmail = "1px solid #f54b5e";
                error = true;
            }
            if (this.email.length == 0) {
                this.errorEmail = 'Email không được để trống';
                this.colorEmail = "1px solid #f54b5e";
                error = true;
            }
            if (this.passWord.length < 6) {
                error = true;
                this.errorPassWord = 'Mật khẩu phải lớn hơn 6 ký tự';
                this.colorPW = "1px solid #f54b5e";
            }
            if (this.passWord.length == 0) {
                error = true;
                this.errorPassWord = 'Mật khẩu không được để trống';
                this.colorPW = "1px solid #f54b5e";
            }
            if (!error) {
                axios({
                method: 'post',
                url: 'http://vuecourse.zent.edu.vn/api/auth/register',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.passWord,
                },
                }).then(() => {
                    this.$message({
                        message: 'Đăng ký thành công',
                        type: 'success'
                    });
                    this.name = '',
                    this.email = '',
                    this.passWord = '',
                    this.$emit('changeIsLogin', true);
                }).catch(() => {
                    this.$message({
                        message: 'Đăng ký không thành công',
                        type: 'error'
                    });
                })
            }
        }
    },
}
</script>

<style lang="scss">
.loginForm {
    max-width: 444px;
    padding-left: 24px;
    padding-right: 24px;
    width: 100%;
    display: block;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    background: #fff;
    padding: 24px;
    border-radius: 10px;
    .style_logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        img {
            width: 200px;
            vertical-align: middle;
            border-style: none;
            box-sizing: border-box;
        }
    }
    .style_input {
        margin-bottom: 24px;
        .war-input {
            position: relative;
            .sui-input{
                border-radius: 4px;
                height: 50px;
                width: 100%;
                font-size: 14px;
                line-height: 18px;
                color: #253036;
                padding: 12px;
                border: 1px solid #d8e0ea;
                outline: unset;
                overflow: visible;
                margin: 0;
                box-sizing: border-box;
            }
            input:hover {
                border: 1px solid #0080dd;
            }
        }
        .reset {
            display: flex;
            justify-content: flex-end;
            margin-top: 8px;
            button {
                color: #0080dd;
                border: 0px;
                font-size: 14px;
                font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                padding: 6px 8px;
                background-color: #ffffff;
                line-height: 18px;
            }
            button:hover {
                text-decoration: none;
                background-color: rgba(0, 0, 0, 0.04);
                border-radius: 4px;
            }
        }
        .error {
            display: flex;
            align-items: center;
            color: #f54b5e;
            margin-top: 8px;
            font-size: 12px;
            box-sizing: border-box;
            .sui-error-message-icon {
                color: #f54b5e;
                font-size: 12px;
                margin-right: 4px;
                fill: currentColor;
                width: 1em;
                height: 1em;
                display: inline-block;
                transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                flex-shrink: 0;
                user-select: none;
            }
        }
    }
    .login {
        width: 100%;
        height: 50px;
        color: #fff;
        font-size: 14px;
        line-height: 18px;
        background: #0080dd;
        border-radius: 4px;
        text-transform: none;
    }
}
</style>