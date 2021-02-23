export default {
    namespaced: true,
    state: {
        isLogin: true,
    },
    getters: {

    },
    mutations: {
        changeIsLogin (state){
            state.isLogin = !state.isLogin;
        }
    },
}