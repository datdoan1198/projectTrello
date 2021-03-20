export default {
    namespaced: true,
    state: {
        isAuthenticated: false,
        authUser: {},
    },
    getters: {
        // 
    },
    mutations: {
        // changeIsLogin (state){
            
        //     if (!state.isAuthenticated) {
        //         state.isLogin = false;
        //     } else {
        //         state.isLogin = true;
        //     }
        // },
        updateLoginStatus (state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated
        },
        updateAuthUser (state, authUser) {
            state.authUser = authUser
        },
    },
}