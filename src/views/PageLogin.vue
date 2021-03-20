<template>
    <div class="loginForm">
        <LoginForm v-if="isLogin" @uploadRest="changeFormReset" @changeIsRegister="changeFormResgiste"/>
        <ResetForm v-if="formReset" @upload="changeFormLogin" />
        <ResgisteForm v-if="formResgist" @changeIsLogin="changeFormLogin" @uploadRegister="changeFormLogin" />
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import ResetForm from '../components/ResetForm'
import ResgisteForm from '../components/resgisterForm'

export default {
    components: {
        LoginForm,
        ResetForm,
        ResgisteForm
    },
    name:"loginForm",
    data () {
        return {
            isLogin:true,
            formReset: false,
            formResgist: false,
        }
    },
    methods: {
        changeFormLogin (data) {
            this.isLogin = data;
            this.formResgist = false;
            this.formReset = false;
        },
        changeFormReset (data) {
            this.formReset = data;
            this.formResgist = false;
            this.isLogin = false;
        },
        changeFormResgiste(data){
            this.formResgist = data;
            this.formReset = false;
            this.isLogin = false;
        }
    }
}
</script>

<style>

</style>