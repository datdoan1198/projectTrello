<template>
    <div class="modalFile">
        <div class="btn-edit">
            <div class="header-label">
                <span v-if="isEditFile" class="text-header">Chỉnh sửa tệp đính kèm</span>
                <span v-else class="text-header">Bạn có muốn xóa tệp đính kèm?</span>
                <span @click="close()" class="icon-close-label">
                    <i class="el-icon-close"></i>
                </span>
            </div>
            <div class="content-label-create">
                <div v-if="isEditFile" class="name-label">
                    <span>Liên kết tên</span>
                    <input v-model="nameFile" class="search-label" type="text" placeholder="Tên nhãn...">
                </div>
                <div v-else class="labels">
                    <span>Tập tin đính kèm sẽ bị xoá vĩnh viễn và bạn sẽ không thể hoàn tác.</span>
                </div>
                <div v-if="isEditFile" class="input-label">
                    <el-button @click="updateFile()" type="success">cập nhật</el-button>
                </div>
                <div v-else class="input-delete">
                    <el-button style="width:100%" @click="deleteFile()" type="danger">Xóa</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import api from '../api'
export default {
    name: "modalFile",
    computed:{
        ...mapState('home', [
            'isEditFile',
            'idFile',
            'idCard',
            'nameFile' 
        ])
    },
    data () {
        return {
        }
    },
    methods:{
        ...mapMutations('home', [
            'closeModalFile',
            'setCard',
            'setList',
        ]),
        close(){
            this.closeModalFile();
        },
        getcard(cardId){
            api.getCardDetail(cardId).then((response) => {
                if (response) {
                    this.setCard(response.data.data)
                }
            })
        },
        getDirectories(){
            api.getList().then((response) => {
                if (response) {
                    this.setList(response.data.data)
                }
            })
        },
        updateFile(){
            let data = {
                'name': this.nameFile,
            }
            api.updateFile(data, this.idFile).then(() => {
                this.getDirectories();
                this.getcard(this.idCard);
                this.nameFile = '';
                this.closeModalFile();
            })
        },
        deleteFile(){
            api.destroyFile(this.idFile).then(() => {
                this.getDirectories();
                this.getcard(this.idCard);
                this.closeModalFile();
            })
        }
    }
    
}
</script>

<style lang="scss">
    .modalFile{
        position: absolute;
        background-color: white;
        width: 304px;
        z-index: 100;
        .header-label{
            height: 40px;
            position: relative;
            margin-bottom: 8px;
            text-align: center;
            .text-header{
                box-sizing: border-box;
                color: #5e6c84;
                display: block;
                line-height: 40px;
                border-bottom: 1px solid rgba(9,30,66,.13);
                margin: 0 12px;
                overflow: hidden;
                padding: 0 32px;
                position: relative;
                text-overflow: ellipsis;
                white-space: nowrap;
                z-index: 1;
            }
            .icon-preve-label{
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                color: #6b778c;
                padding: 10px 12px 10px 8px;
                z-index: 40;
            }
            .icon-close-label{
                position: absolute;
                cursor: pointer;
                top: 0;
                right: 0;
                color: #6b778c;
                padding: 10px 12px 10px 8px;
                z-index: 40;
            }
        }
        .content-label-create {
            overflow-x: hidden;
            overflow-y: auto;
            padding: 0 12px 12px;
            .name-label{
                span{
                    color: #5e6c84;
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: .04em;
                    line-height: 16px;
                    margin-top: 16px;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin: 0 0 8px;
                }
                .search-label{
                    margin: 4px 0 12px;
                    width: 100%;
                    outline: none;
                    border: none;
                    box-shadow: inset 0 0 0 2px #dfe1e6;
                    background-color: #fafbfc;
                    box-sizing: border-box;
                    -webkit-appearance: none;
                    border-radius: 3px;
                    display: block;
                    line-height: 20px;
                    padding: 8px 12px;
                }
                .search-label:focus{
                    background-color: #fff;
                    box-shadow: inset 0 0 0 2px #0079bf;
                }
            }
            .labels{
                margin-top: 12px;
                h4 {
                    color: #5e6c84;
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: .04em;
                    line-height: 16px;
                    margin-top: 16px;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin: 0 0 8px;
                }
                .label-color{
                    .color{
                        cursor: pointer;
                        float: left;
                        height: 32px;
                        line-height: 32px;
                        margin: 0 8px 8px 0;
                        padding: 0;
                        width: 48px;
                        background-color: #61bd4f;
                        border-radius: 4px;
                        color: #fff;
                        display: block;
                        text-align: center;
                        max-width: 100%;
                        overflow: hidden;
                        position: relative;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        transition: opacity 0.3s;
                    }
                    .color:hover{
                        opacity: .7;
                    }
                    
                }
            }
            .input-label{
                clear: both;
                content: "";
                display: table;
                display: flex;
                justify-content: space-between;
            }
            .input-delete{
                padding-top: 15px;
            }
        }
    }
</style>