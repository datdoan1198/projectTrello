<template>
    <div class="restForm">
        <div class="style_logo">
            <div class="title">LẤY LẠI MẬT KHẨU</div>
            <div class="content">
                Bạn vui lòng nhập email đăng nhập vào ô bên dưới để nhận email hướng dẫn lấy lại mật khẩu.
            </div>
        </div>
        <div class="style_input">
            <div class="war-input">
                <input class="sui-input" :style="{ border: color }" placeholder="Email" type="text" v-model="email" >
            </div>
            <div v-if="this.errorEmail != '' " class="error">
                <svg class="sui-error-message-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
                </svg>
                <span> {{ errorEmail }} </span>
            </div>
        </div>
        <el-button @click="submitFormReset()" class="login">GỬI EMAIL</el-button>
        <div class="callBack">
            <el-button class="returnLoginBtn" @click="backLogin()">
                <span class="contenCallback">
                    <svg class="sui-error-message-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path>
                    </svg>
                    Trở về trang đăng nhập
                </span>
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "restForm",
    data () {
        return {
            email: '',
            errorEmail: '',
            color: '',
        }
    },
    methods: {
        submitFormReset () {
            let error = false;
            this.errorEmail = '';
            this.color = '';
            if (!this.validEmail(this.email)) {
                this.errorEmail = 'Email sai định dạng, vui lòng nhập lại';
                this.color = "1px solid #f54b5e";
                error = true;
            }
            if (this.email.length == 0) {
                this.errorEmail = 'Email không được để trống';
                this.color = "1px solid #f54b5e";
                error = true;
            }
            if (!error) {
                this.$message({
                    message: 'Gửi thành công',
                    type: 'success'
                });
                this.email = "";
            }
        },
        backLogin () {
            this.$emit('upload', false);
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>

<style lang="scss">
.restForm {
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
        flex-direction: column;
        .title {
            font-size: 20px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 40px;
            box-sizing: border-box;
        }
        .content {
            font-size: 14px;
            color: #54657a;
            margin-bottom: 8px;
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
    .callBack {
        margin-top: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 24px;
        .returnLoginBtn {
            color: #0080dd;
            min-width: 32px!important;
            font-size: 14px;
            line-height: 18px;
            background: transparent;
            border-radius: 4px;
            text-transform: none;
            padding: 6px 8px;
            border: 0;
            position: relative;
            align-items: center;
            user-select: none;
            vertical-align: middle;
            justify-content: center;
            text-decoration: none;
                -webkit-tap-highlight-color: transparent;
            overflow: visible;
            touch-action: manipulation;
            .contenCallback {
                width: 100%;
                display: inherit;
                align-items: inherit;
                justify-content: inherit;
                box-sizing: border-box;
                color: #0080dd;
                font-size: 14px;
                line-height: 18px;
                background: transparent;
                border-radius: 4px;
                text-transform: none;
                border: 0;
                cursor: pointer;
                margin: 0;
                display: inline-flex;
                outline: 0;
                padding: 0;
                position: relative;
                align-items: center;
                user-select: none;
                border-radius: 0;
                vertical-align: middle;
                justify-content: center;
                text-decoration: none;
                background-color: transparent;
                -webkit-appearance: none;
                -webkit-tap-highlight-color: transparent;
                .sui-error-message-icon {
                    font-size: 1.5rem;
                    margin-right: 4px;
                    fill: currentColor;
                    width: 1em;
                    height: 1em;
                    display: inline-block;
                    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                    flex-shrink: 0;
                    user-select: none;
                    color: #0080dd;
                    box-sizing: border-box;
                    line-height: 18px;
                    text-transform: none;
                }
            }
        }
    }
}
</style>