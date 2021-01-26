<template>
    <div class="loginForm">
        <LoginForm v-if="!formReset" @uploadRest="changeFormReset"/>
        <ResetForm v-else @upload="changeFormReset" />
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import ResetForm from '../components/ResetForm'
export default {
    components: {
        LoginForm,
        ResetForm
    },
    name:"loginForm",
    data () {
        return {
            formReset: false,
        }
    },
    methods: {
        changeFormReset (data) {
            this.formReset = data;
        }
    }
}
</script>

<style>

</style>