export default {
    namespaced: true,
    state: {
        isLogin: true,
        isAuthenticated: false,
        authUser: {},
    },
    getters: {

    },
    mutations: {
        changeIsLogin (state){
            state.isLogin = !state.isLogin;
        },
        changeLoginStatus (state, data) {
            state.isAuthenticated = data.isAuthenticated
            state.authUser = data.authUser
        }
    },
}