<template>
    <div class="style-label">
        <div class="main-label" ref="mainLabel">
            <div class="header-label">
                <span class="text-header">Nhãn</span>
                <span @click="closeTblLabel()" class="icon-close-label">
                    <i class="el-icon-close"></i>
                </span>
            </div>
            <div class="content-label">
                <input v-model="searchLabel" class="search-label" type="text" placeholder="Tìm nhãn...">
                <div class="labels">
                    <h4>Nhãn</h4>
                    <div class="label">
                        <div class="box-label" v-for="(label, index) in labels" :key="index" >
                            <div class="style-lable" :style="{backgroundColor: label.color }" @click="destroyLabelForCard(label.id)">
                                {{ label.name }}
                                <span v-for="(item, indexCard) in card.labels" :key="indexCard">
                                    <span v-if="item.color == label.color && item.name == label.name">
                                        <i  id="icon" class="el-icon-check"></i>
                                    </span>
                                </span>
                            </div>
                            <span class="icon" @click="editLabel(label.id, label.name, label.color)">
                                <i class="el-icon-edit"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="input-label">
                    <button @click="showModalCreate()"> Tạo nhãn mới </button>
                </div>
            </div>
        </div>
        <div class="modelCreate" ref="modalCreate">
            <div class="header-label">
                <span v-if="!isDelete" class="text-header">Tạo nhãn mới</span>
                <span v-else class="text-header"> Bạn muốn xoá nhãn? </span>
                <span @click="preveTblLabel()" class="icon-preve-label">
                    <i class="el-icon-arrow-left"></i>
                </span>
                <span @click="closeTblLabel()" class="icon-close-label">
                    <i class="el-icon-close"></i>
                </span>
            </div>
            <div v-if="!isDelete" class="content-label-create">
                <div class="name-label">
                    <span>Tên</span>
                    <input v-model="nameLabel" class="search-label" type="text" placeholder="Tên nhãn...">
                </div>
                <div class="labels">
                    <h4>Chọn màu</h4>
                    <div class="label-color">
                        <span @click="addColor('#61bd4f')" ref="#61bd4f" class="color" :style="{backgroundColor: '#61bd4f'}"></span>
                        <span @click="addColor('#f2d600')" ref="#f2d600" class="color" :style="{backgroundColor: '#f2d600'}"></span>
                        <span @click="addColor('#ff9f1a')" ref="#ff9f1a" class="color" :style="{backgroundColor: '#ff9f1a'}"></span>
                        <span @click="addColor('#eb5a46')" ref="#eb5a46" class="color" :style="{backgroundColor: '#eb5a46'}"></span>
                        <span @click="addColor('#c377e0')" ref="#c377e0" class="color" :style="{backgroundColor: '#c377e0'}"></span>
                        <span @click="addColor('#0079')" ref="#0079" class="color" :style="{backgroundColor: '#0079'}"></span>
                        <span @click="addColor('#00c2e0')" ref="#00c2e0" class="color" :style="{backgroundColor: '#00c2e0'}"></span>
                        <span @click="addColor('#51e898')" ref="#51e898" class="color" :style="{backgroundColor: '#51e898'}"></span>
                        <span @click="addColor('#ff78cb')" ref="#ff78cb" class="color" :style="{backgroundColor: '#ff78cb'}"></span>
                        <span @click="addColor('#344563')" ref="#344563" class="color" :style="{backgroundColor: '#344563'}"></span>
                        <span @click="addColor('#b3bac5')" ref="#b3bac5" class="color" :style="{backgroundColor: '#b3bac5'}"></span>
                    </div>
                </div>
                <div class="input-label">
                    <el-button v-if="!isUpdate" @click="createLabel(card.id)" type="success">Tạo mới</el-button>
                    <el-button v-else @click="updatelabel(card.id)" type="success">Lưu</el-button>
                    <el-button v-if="isUpdate"  @click="isDelete = true" type="danger">Xóa</el-button>
                </div>
            </div>
            <div v-else class="content-label-create">
                <div class="labels">
                    <span>Thao tác này sẽ gỡ nhãn khỏi tất cả các thẻ và xoá lịch sử của nó. Bạn sẽ không thể hoàn tác.</span>
                </div>
                <div  class="input-delete">
                    <el-button style="width:100%" @click="deleteLabel(card.id)" type="danger">Xóa</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import api from '../api'
export default {
name:"Label",
data(){
    return{
        nameLabel:'',
        colorLabel:'',
        isUpdate: false,
        idLabel:'',
        isDelete: false,
        searchLabel: '',
    }
},
computed:{
    ...mapState('home', [
        'labels',
        'card'
    ])
},
methods:{
    ...mapMutations('home', [
        'closeLabel',
        'setCard',
        'setList',
        'setLabel'
    ]),
    preveTblLabel(){
        this.$refs.mainLabel.style.display = "block";
        this.$refs.modalCreate.style.display = "none";
        this.nameLabel = '';
        this.isDelete = false;
        if (document.getElementById("iconx")) {
            document.getElementById("iconx").remove();
        }
    },
    closeTblLabel(){
        this.closeLabel();
    },
    addColor(color){
        if (document.getElementById("iconx")) {
            document.getElementById("iconx").remove();
        }
        this.colorLabel = color;
        this.$refs.[color].innerHTML = '<i id="iconx" class="el-icon-check"></i>';
    },
    showModalCreate(){
        this.$refs.mainLabel.style.display = "none";
        this.$refs.modalCreate.style.display = "block";
        this.isUpdate = false;
        this.nameLabel = '';
        if (document.getElementById("iconx")) {
            document.getElementById("iconx").remove();
        }
    },
    getcard(cardId){
        api.getCardDetail(cardId).then((response) => {
            if (response) {
                this.setCard(response.data.data)
            }
        })
    },
    getLists(){
        api.getList().then((response) => {
            if (response) {
                this.setList(response.data.data)
            }
        })
    },
    getLabels(val){
        let q = {
            q: val
        }
        api.getLabels(q).then((response) => {
            if (response) {
                this.setLabel(response.data.data)
            }
        })
    },
    createLabel(idCard){
        let error = false;
        if (!this.colorLabel) {
            error = true;
            this.$message({message: 'Chưa có mã màu!', type: 'error'});
        }
        if (!this.nameLabel) {
            error = true;
            setTimeout(() => {
                this.$message({message: 'Chưa có tên nhãn!', type: 'error'});
            }, 500);
        }
        this.card.labels.forEach((label) => {
            if (label.color == this.colorLabel && label.name == this.nameLabel ) {
                error = true;
            }
        });
        if (!error) {
            let data = {
                'name': this.nameLabel,
                'color': this.colorLabel,
            }
            api.addLebelForCard(data, idCard).then((response) => {
                if (response) {
                    this.getcard(idCard)
                }
                this.getLists();
                this.getLabels(this.searchLabel);
            })
        }
        this.$refs.mainLabel.style.display = "block";
        this.$refs.modalCreate.style.display = "none";
        this.nameLabel = '';
        this.colorLabel = '';
        if (document.getElementById("iconx")) {
            document.getElementById("iconx").remove();
        }
    },
    destroyLabelForCard(idLabel){
        let data = {
            'label_id': idLabel,
        }
        let idCard = this.card.id;
        let doesExist = this.card.labels.find(label => label.id == idLabel);
        if (doesExist) {
            api.destroyLabelForCard(data, idCard).then(() => {
                this.$message({message: 'Gỡ nhãn thành công', type: 'error'});
                this.getcard(idCard);
                this.getLists();
                this.getLabels(this.searchLabel);
            })
        } else {
            api.acceptLabelForCard(data, idCard).then(() => {
                this.$message({message: 'Thêm nhãn thành công', type: 'success'});
                this.getcard(idCard);
                this.getLists();
                this.getLabels(this.searchLabel);
            })
        }
    },
    editLabel(idLabel, nameLabel, colorLabel){
        this.$refs.mainLabel.style.display = "none";
        this.$refs.modalCreate.style.display = "block";
        this.isUpdate = true;
        this.nameLabel = nameLabel;
        this.idLabel = idLabel;
        this.colorLabel = colorLabel;
        this.$refs.[colorLabel].innerHTML = '<i id="iconx" class="el-icon-check"></i>';
    },
    updatelabel(idCard){
        if (this.nameLabel && this.colorLabel) {
            let data = {
                name: this.nameLabel,
                color: this.colorLabel
            }
            api.updateLabel(data, this.idLabel).then(() => {
                this.$message({message: 'Sửa thành công', type: 'success'});
                this.getcard(idCard);
                this.getLists();
                this.getLabels(this.searchLabel);
                this.$refs.mainLabel.style.display = "block";
                this.$refs.modalCreate.style.display = "none";
                if (document.getElementById("iconx")) {
                    document.getElementById("iconx").remove();
                }
            })
        } else {
            if (!this.nameLabel) {
                this.$message({message: 'Bạn chưa nhập tên nhãn!', type: 'error'});
            }
            if (!this.colorLabel) {
                setTimeout(() => {
                   this.$message({message: 'Bạn chưa chọn mã màu!', type: 'error'}); 
                }, 500);
            }
            
        }
    },
    deleteLabel(idCard){
        api.destroyLabel(this.idLabel).then(() => {
            this.$message({message: 'Xóa nhãn thành công', type: 'success'});
            this.getcard(idCard);
            this.getLists();
            this.getLabels(this.searchLabel);
            this.$refs.mainLabel.style.display = "block";
            this.$refs.modalCreate.style.display = "none";
            if (document.getElementById("iconx")) {
                document.getElementById("iconx").remove();
            }
            this.nameLabel = '';
            this.colorLabel = '';
            this.isDelete = false;
        })
    }
},
watch: {
    searchLabel(val){
        this.getLabels(val);
    }
}

}
</script>

<style lang="scss">
.style-label{
    position: relative;
    .main-label{
        .header-label{
            height: 40px;
            position: relative;
            margin-bottom: 8px;
            text-align: center;
            width: 304px;
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
        .content-label {
            overflow-x: hidden;
            overflow-y: auto;
            max-height: 450px;
            padding: 0 12px 12px;
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
                .label{
                    .box-label{
                        position: relative;
                        padding-right: 36px;
                        .style-lable{
                            border-radius: 3px;
                            cursor: pointer;
                            font-weight: 700;
                            margin: 0 0 4px;
                            min-height: 20px;
                            padding: 6px 12px;
                            position: relative;
                            margin-left: 4px;
                            color: white;
                            font-size: 14px ;
                            line-height: 20px;
                            #icon{
                                float: right;
                            }
                        }
                        .style-lable:hover{
                            box-shadow: -8px 0 #d9b51c;
                        }
                        .icon{
                            border-radius: 3px;
                            padding: 6px;
                            position: absolute;
                            top: 0;
                            right: 0;
                            height: 20px;
                            font-size: 16px;
                            line-height: 20px;
                            width: 20px;
                            color: #42526e;
                        }
                        .icon:hover{
                            background-color: rgba(9,30,66,.08);
                        }
                    }
                }
            }
            .input-label{
                button{
                    width: 100%;
                    outline: none;
                    box-sizing: border-box;
                    -webkit-appearance: none;
                    border-radius: 3px;
                    border: none;
                    display: inline-block;
                    line-height: 20px;
                    margin-bottom: 8px;
                    padding: 6px 12px;
                    text-decoration: none;
                    position: relative;
                    background-color: rgba(9,30,66,.04);
                    box-shadow: none;
                    cursor: pointer;
                    margin: 8px 4px 0 0;
                    text-align: center;
                }
                button:hover {
                    background-color: #eaecef;
                }
            }
        }
        .content-label::-webkit-scrollbar {
            width: 8px;
            height: 10px;
        }
        // .content-label::-webkit-scrollbar-track {
        //     background: #000000bf; 
        // }
        .content-label::-webkit-scrollbar-thumb {
            background: #cfd1d9;
            border-radius: 8px;
        }
    }
    .modelCreate{
        display: none;
        background-color: white;
        position: absolute;
        top: 0;
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
                padding-top: 15px;
            }
            .input-delete{
                padding-top: 15px;
            }
        }
    }
}
</style>