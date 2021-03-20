import axios from 'axios'
import store from "../store";
import router from "../router";
// Lấy ra các biến cần thiết: base url, token
const baseUrl = process.env.VUE_APP_BASE_URL;
const token = localStorage.getItem('access_token');
// Tạo instance của axios
export const apiAxios = axios.create({
    baseURL:`${baseUrl}/api`,
    headers: {
        post: {
            'Content-Type': 'application/json'
        },
        common: {
            'Authorization': `Bearer ${token}`
        }
    }
})
// Xử lý logout khi response 401
apiAxios.interceptors.response.use(undefined, (error) => {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && router.currentRoute.name !== 'Login') {
      store.commit('login/updateLoginStatus', false)
      store.commit('login/updateAuthUser', {})
      localStorage.removeItem('access_token')
      return router.push({name: 'Login'})
    }
  }
})
// Khai báo các request sử dụng trong hệ thống
export default {
    getAuthUser () {
        return apiAxios({
            method: 'get',
            url: '/auth/me'
        })
    },
    register (data) {
        return apiAxios({
            method: 'post',
            url: 'auth/register',
            data: data
        })
    },
    login (data) {
        return apiAxios({
            method: 'post',
            url: 'auth/login',
            data: data
        })
    },
    getList () {
        return apiAxios({
            method: 'get',
            url: '/directories',
        })
    },
    createDirectorie (data) {
        return apiAxios({
            method: 'post',
            url: '/directories',
            data: data,
        })
    },
    updateDirectorie (data, id) {
        return apiAxios({
            method: 'put',
            url: '/directories/' + id,
            data: data,
        })
    },
    destroyDirectorie(id){
        return apiAxios({
            method: 'delete',
            url: '/directories/' + id,
        })
    },
    changeIndexDirectorie(data, id){
        return apiAxios({
            method: 'put',
            url: '/directories/' + id + '/index',
            data: data,
        })
    },
    createCard (data) {
        return apiAxios({
            method: 'post',
            url: '/cards',
            data: data,
        })
    },
    updateCard (data, id) {
        return apiAxios({
            method: 'put',
            url: '/cards/' + id,
            data: data,
        })
    },
    destroyCard(id){
        return apiAxios({
            method: 'delete',
            url: '/cards/' + id,
        })
    },
    changeIndexCard(data, id){
        return apiAxios({
            method: 'put',
            url: '/cards/' + id + '/index',
            data: data,
        })
    },
    changeIndexCardFromDirectory(data, id){
        return apiAxios({
            method: 'put',
            url: '/cards/' + id + '/directory',
            data: data,
        })
    },
    getCardDetail(id){
        return apiAxios({
            method: 'get',
            url: '/cards/' + id
        })
    },
    addLebelForCard(data, id){
        return apiAxios({
            method: 'post',
            url: '/cards/' + id + '/label',
            data: data,
        })
    },
    getLabels(q){
        return apiAxios({
            method: 'get',
            url: '/labels',
            params: q,
        })
    },
    updateLabel(data, id){
        return apiAxios({
            method: 'put',
            url: '/labels/' + id,
            data: data,
        })
    },
    destroyLabel(id){
        return apiAxios({
            method: 'delete',
            url: '/labels/' + id,
        })
    },
    destroyLabelForCard(data, id){
        return apiAxios({
            method: 'delete',
            url: '/cards/'+ id +'/detach-labels',
            data: data,
        })
    },
    acceptLabelForCard(data, id){
        return apiAxios({
            method: 'post',
            url: '/cards/'+ id +'/attach-labels',
            data: data,
        })
    },
    changeDelineForCard(data, id){
        return apiAxios({
            method: 'put',
            url: '/cards/'+ id +'/change-status-deadline',
            data: data,
        })
    },
    changeStatusForCard(data, id){
        return apiAxios({
            method: 'put',
            url: '/cards/'+ id +'/change-status',
            data: data,
        })
    },
    uploadFileForCard(data, id){
        return apiAxios({
            method: 'post',
            url: '/cards/'+ id +'/upload-file',
            data: data,
        })
    },
    updateFile(data, id){
        return apiAxios({
            method: 'put',
            url: '/files/'+ id,
            data: data,
        })
    },
    destroyFile(id){
        return apiAxios({
            method: 'delete',
            url: '/files/'+ id,
        })
    },
    createWork(data){
        return apiAxios({
            method: 'post',
            url: '/check-lists',
            data: data
        })
    },
    updateWork(data, id){
        return apiAxios({
            method: 'put',
            url: '/check-lists/' + id,
            data: data
        })
    },
    destroyWork(id){
        return apiAxios({
            method: 'delete',
            url: '/check-lists/' + id,
        })
    },
    createChidrenWork(data){
        return apiAxios({
            method: 'post',
            url: '/check-list-childs',
            data: data
        })
    },
    updateChidrenWork(data, id){
        return apiAxios({
            method: 'put',
            url: '/check-list-childs/' + id,
            data: data
        })
    },
    destroyChidrenWork(id){
        return apiAxios({
            method: 'delete',
            url: '/check-list-childs/' + id
        })
    },
    changeStatusChidrenWork(data, id){
        return apiAxios({
            method: 'put',
            url: '/check-list-childs/' + id + '/change-status',
            data: data
        })
    },
    updateUser(data){
        return apiAxios({
            method: 'post',
            url: '/users',
            data: data
        })
    },
    updatePassWord(data){
        return apiAxios({
            method: 'put',
            url: '/users/password',
            data: data
        })
    }
}