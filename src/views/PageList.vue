<template>
    <div class="pageList">
        <div class="a">
            <draggable class="dragArea" :list="data" item-key="id" :animation="108" @change="changeDirectorie">
                <div class="list" v-for="(list, index) in data" :key="list.id">
                    <div class="tag">
                        <div class="list-header">
                            <div title="Thay đổi tên danh sách">
                                <h2 ref="text" @click="getInput(index)" class="tagHeader">
                                    {{ list.title }}
                                </h2>
                                <textarea @keydown.enter="changeTitle(index, list.id)" ref="textarea" maxlength="512" class="list-textarea" style="overflow: hidden; word-wrap: break-word;height: 28px;" v-model="list.title"></textarea>
                            </div>
                            <span title="Xóa danh sách" @click="showModalDeleteDirectory(list.id)" class="icon">
                                <i class="el-icon-delete"></i>
                                <!-- <div class="list-task">
                                    <el-button @click="showModalDeleteDirectory(list.id)" type="danger" icon="el-icon-delete" circle></el-button>
                                </div> -->
                            </span>
                            
                        </div>
                        <div ref="tagMain" class="tagMain">
                            <draggable class="sdsdsd" :list="list.cards" item-key="id" :animation="108" group="todo" :id="list.id"  @end="changeCard">
                            <div class="style-content" v-for="(card, indexCart) in list.cards" :key="card.id" :id="card.id">
                                <div :ref="getNameRef(index, indexCart)" class="content">
                                    <div class="list-card-labels">
                                        <div class="labels" v-for="(label, indexLabel) in card.labels" :key="indexLabel" >
                                            <span class="card-label" :style="{ backgroundColor: label.color }">
                                                <span class="label-text" >{{ label.name }}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div @click="showModalCart(card.id)">
                                        {{ card.title }}
                                    </div>
                                    <div class="badges">
                                        <div title="Chuyển trạng thái hoàn thành cho thẻ" v-if="card.deadline" :style="{backgroundColor: checkColor(card.status)}" class="deline margin-badges" @click="changeStatus(card.deadline, card.id, card.status)">
                                            <span :style="{color: checkColorText(card.status)}" >
                                                <i :style="{color: checkColorText(card.status)}" class="iconAfter el-icon-time"></i>
                                                <i v-if="card.status == 3" class="iconBefore el-icon-check"></i>
                                                <i :style="{color: checkColorText(card.status)}" v-else class="iconBefore el-icon-close"></i>
                                                {{ formatDate(card.deadline) }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div title="Xem chi tiết thẻ" ref="editLabel" class="edit-label" @click="showModal(index, indexCart, card.id)">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                            </draggable>
                            <div ref="showCreateLabel" class="createLabel" style="display: none">
                                <div class="">
                                    <div class="content createLabel-text">
                                        <textarea @keyup.enter="addLabel(list.id, list.cards, index)" ref="tileLabel" placeholder="Nhập tiêu đề cho thẻ này..."></textarea>
                                    </div>
                                    <div class="createLabel-button">
                                        <div class="buttonCreate">
                                            <el-button type="success" @click="addLabel(list.id, list.cards, index)">Thêm Mới</el-button>
                                            <el-link icon="el-icon-close" @click="hiddenCreateLabel(index)"></el-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div title="Thêm thể mới" ref="hiddenCreateLabel" class="tagFooder">
                            <div  @click="showCreateLabel(index)" style="display:block">
                                <i class="el-icon-plus"></i>
                                <span>Thêm thẻ khác</span>
                            </div>
                        </div>
                    </div>
                </div>
            </draggable>
            <div class="style-createList">
                <div class="createList">
                    <form action="">
                        <div title="Thêm mới danh sách" v-if="show" @click="show = !show" class="placeholder">
                            <i class="el-icon-plus"></i>
                            <span>Thêm danh sách khác</span>
                        </div>
                        <input @keyup.enter="addlist()" v-else type="text" ref="titlList" placeholder="Nhập tiêu đề danh sách...">
                        <transition name="fade">
                            <div v-if="!show" class="buttonCreate">
                                <el-button type="success" @click="addlist()">Thêm Mới</el-button>
                                <el-link icon="el-icon-close" @click="show = !show"></el-link>
                            </div>
                        </transition>
                    </form>
                </div>
            </div>
        </div>
        <div class="moe" :style="{display: showQuickCard}">
            <span class="close-card-quick" @click="closeCardQuick()" >
                <i class="el-icon-close"></i>
            </span>
            <div class="quick-card-edit" :style="{top: top + 'px', left: left + 'px', width: width + 'px'}">
                <div class="card-quick" :style="{width: width + 'px'}">
                    <div class="card-quick-detail">
                        <div class="list-card-labels">
                            <div class="labels" v-for="(label, indexLabel) in card.labels" :key="indexLabel" >
                                <span class="card-label" :style="{ backgroundColor: label.color }"></span>
                            </div>
                        </div>
                        <textarea @keydown.enter="updateCard()" ref="cardQuick" v-model="card.title"></textarea>
                        <div class="badges">
                            <div v-if="card.deadline" :style="{backgroundColor: checkColor(card.status)}" class="deline margin-badges" @click="changeStatus(card.deadline, card.id, card.status)">
                                <span :style="{color: checkColorText(card.status)}" >
                                    <i :style="{color: checkColorText(card.status)}" class="iconAfter el-icon-time"></i>
                                    <i v-if="card.status == 3" class="iconBefore el-icon-check"></i>
                                    <i :style="{color: checkColorText(card.status)}" v-else class="iconBefore el-icon-close"></i>
                                        {{ formatDate(card.deadline) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <el-button @click="updateCard()" type="success">Lưu</el-button>
                <div class="card-editor">
                    <span title="Xem chi tiết thẻ" class="card-editor-quick" @click="showModalCart(card.id)">
                        <span class="el-icon-postcard"></span>
                        <span class="card-editor-text">Mở Thẻ</span>
                    </span>
                    <span title="Hiển thị chi tiết nhãn" @click="showModalLabel('label')" ref="label" class="card-editor-quick">
                        <span class="el-icon-discount"></span>
                        <span class="card-editor-text">Chỉnh sửa nhãn</span>
                    </span>
                    <span title="Đặt lại thời gian hết hạn" class="card-editor-quick deadline">
                        <div class="input-deline" >
                            <el-date-picker
                            v-model="card.deadline"
                            type="datetime"
                            placeholder="Select date and time"
                            @change="setTimeForCard">
                            </el-date-picker>
                        </div>
                        <span class="el-icon-alarm-clock"></span>
                        <span class="card-editor-text">Ngày hết hạn</span>
                    </span>
                    <!-- <span class="card-editor-quick">
                        <span class="el-icon-right"></span>
                        <span class="card-editor-text">Di chuyển</span>
                    </span> -->
                    <span title="Xóa thẻ" @click="showModalDeleteCard()" class="card-editor-quick">
                        <span class="el-icon-delete"></span>
                        <span class="card-editor-text">Xóa</span>
                    </span>
                </div>
            </div>
        </div>
        <div v-if="isShowModalMain"  class="sss" style="display: block">
            <div class="window-overlay" >
                <Main />
            </div>
        </div>
        <div v-if="showLabel" class="table-label" :style="{left: leftLabel + 'px'}">
            <Label />
        </div>
        <div v-if="isShowModalFile" class="modal-file" :style="{left: leftFile + 'px', top: topFile + 'px'}">
            <ModalFile />
        </div>
        <div v-if="idShowWork" class="modal-file" :style="{left: leftFile + 'px', top: topFile + 'px'}">
            <ModalWork />
        </div>
        <el-dialog
        title="Xóa"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>Có chắc chắn muốn xóa danh sách này?</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">Đóng</el-button>
            <el-button type="primary" @click="deleteDirectory()">Xác nhận</el-button>
        </span>
        </el-dialog>
        <el-dialog
        title="Xóa"
        :visible.sync="centerDialogVisibleCart"
        width="30%"
        center>
        <span>Có chắc chắn muốn xóa thẻ này?</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisibleCart = false">Đóng</el-button>
            <el-button type="primary" @click="deleteCard()">Xác nhận</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import Label from "../components/Lable"
import { mapMutations, mapState } from 'vuex'
import Main from '../components/modal/Main'
import draggable from 'vuedraggable'
import ModalFile from '../components/ModalFile'
import ModalWork from '../components/ModalWork'
import api from '../api'
import moment from 'moment';

export default {
    name: "pageList",
    components: {
        Main,
        Label,
        draggable,
        ModalFile,
        ModalWork
    },
    data () {
        return {
            centerDialogVisibleCart: false,
            centerDialogVisible: false,
            show: true,
            showAddList: false,
            top:'',
            left: '',
            width:'',
            showQuickCard: 'none',
            listId: 0,
            cardId: 0,
            color: 'white',
        }
    },
    computed: {
        ...mapState('home', [
            'data',
            'isShowModalMain',
            'card',
            'topLabel',
            'leftLabel',
            'showLabel',
            'topFile',
            'leftFile',
            'isShowModalFile',
            'isEditFile',
            'idShowWork'
        ])
    },
    mounted () {
        // api.getList().then((response) => {
        //     if (response) {
        //         this.setList(response.data.data)
        //     }
        // })  
    },
    methods: {
        ...mapMutations('home', [
            'addList',
            'allLabel',
            'showModalMain',
            'closeModalMain',
            'getcar',
            'setList',
            'setCard',
            'updateTblLabel',
            'setLabel'
        ]),
        formatDate(val){
            return moment(val).lang('vi').format('Do MMMM');
        },
        formatTime(val){
            return moment(val).lang('vi').startOf('hour').fromNow(); 
        },
        changeDirectorie(e){
            let newIndex = e.moved.newIndex
            let idDirectory = e.moved.element.id
            let data = {
                'index': newIndex
            }
            api.changeIndexDirectorie(data, idDirectory).then((response) => {
                if (response) {
                    this.getDirectories();
                }
            })
            
        },
        changeCard(event){
            if (event.from === event.to) {
                let data = {
                    'index': event.newIndex,
                }
                api.changeIndexCard(data, event.clone.getAttribute('id')).then((response) => {
                    if (response) {
                        this.getDirectories();
                    }
                })
            } else {
                let data = {
                    'index': event.newIndex,
                    'directory_id': event.to.getAttribute('id'),
                }
                api.changeIndexCardFromDirectory(data, event.clone.getAttribute('id')).then((response) => {
                    if (response) {
                        this.getDirectories();
                    }
                })
            }
        },
        getInput(index){
            this.$refs.text[index].style.display = 'none';
            this.$refs.textarea[index].style.display = 'block';
            this.$refs.textarea[index].focus();
        },
        changeTitle(index, id){
            this.$refs.text[index].style.display = 'block';
            this.$refs.textarea[index].style.display = 'none';
            this.$refs.textarea[index].blur();
            let title = this.$refs.textarea[index].value;
            let data = {
                title: title,
            }
            api.updateDirectorie(data, id).then((response) => {
                if (response) {
                    this.getDirectories();
                }
            })
        },
        showCreateLabel(index){
            this.$refs.showCreateLabel[index].style.display = 'block';
            this.$refs.hiddenCreateLabel[index].style.display = 'none';
            this.$refs.tagMain[index].scrollTop = this.$refs.tagMain[index].scrollHeight;
            this.$refs.tagMain[index].style.maxHeight = '82vh';
        },
        hiddenCreateLabel(index){
            this.$refs.showCreateLabel[index].style.display = 'none';
            this.$refs.hiddenCreateLabel[index].style.display = 'block';
            this.$refs.tagMain[index].style.maxHeight = '77vh';
        },
        getDirectories(){
            api.getList().then((response) => {
                if (response) {
                    this.setList(response.data.data)
                }
            })
        },
        addlist(){
            let title = this.$refs.titlList.value;
            if (title.length !== 0) {
                let data = {
                        title: title,
                        index: this.data.length + 1
                }
                api.createDirectorie(data).then((response) => {
                    if (response) {
                        this.getDirectories();
                    }
                })
                this.$refs.titlList.value = '';
            } else {
                this.$message({
                    message: 'Tiêu đề không được để trống',
                    type: 'warning'
                });
            }
        },
        addLabel(idDirectory, cards, index){
            let title = this.$refs.tileLabel[index].value;
            if (title.length !== 0) {
                let data = {
                    title: title,
                    index: cards.length,
                    directory_id: idDirectory
                }
                api.createCard(data).then((response) => {
                    if (response) {
                        this.getDirectories();
                    }
                })
                this.$refs.tileLabel[index].value = '';
            } else {
                this.$message({
                    message: 'Tên thẻ không được để trống',
                    type: 'warning'
                });
            }
        },
        updateCard(){
            let title = this.$refs.cardQuick.value
            if (title.length != 0) {
                let data = {
                    title: title
                }
                api.updateCard(data, this.card.id).then((response) => {
                    if (response) {
                        this.getDirectories();
                    }
                })
                this.showQuickCard = 'none  ';
            } else {
                this.$message({
                    message: 'Tên thẻ không được để trống',
                    type: 'warning'
                });
            }
        },
        showModal(indexList, indexCart, cardId){
            let refName = indexList + '' +  indexCart;
            let left = this.$refs.[refName][0].getBoundingClientRect().left;
            let top = this.$refs.[refName][0].getBoundingClientRect().top;
            let width = this.$refs.[refName][0].clientWidth;
            this.top = top;
            this.left = left;
            this.width = width;
            this.showQuickCard = 'block';
            this.getcard(cardId);
            this.$refs.cardQuick.focus();
            this.closeModalMain();
        },
        closeCardQuick(){
            this.showQuickCard = 'none';
        },
        showModalCart(cardId){
            api.getCardDetail(cardId).then((response) => {
                    if (response) {
                        this.setCard(response.data.data)
                    }
                })
            this.showModalMain();
            this.showQuickCard = 'none';
        },
        showModalLabel(refName){
            let left = this.$refs.[refName].getBoundingClientRect().left;
            let data = {
                'left': left,
            }
            console.log(data)
            this.updateTblLabel(data);
            this.getLabels();
        },
        getLabels(){
            api.getLabels().then((response) => {
                    if (response) {
                        this.setLabel(response.data.data)
                    }
                })
        },
        getNameRef(indexList,indexCart){
            return indexList + '' +  indexCart;
        },
        showModalDeleteDirectory(idList){
            this.centerDialogVisible = true;
            this.listId = idList;
        },
        deleteDirectory(){
            api.destroyDirectorie(this.listId).then(() => {
                this.getDirectories();
            })
            this.listId = 0;
            this.centerDialogVisible = false;
        },
        showModalDeleteCard(){
            this.centerDialogVisibleCart = true;
        },
        deleteCard(){
            api.destroyCard(this.card.id).then(() => {
                this.getDirectories();
            })
            this.centerDialogVisibleCart = false;
            this.showQuickCard = 'none';
        },
        checkColor(status){
            let color = '';
            if (status == 0) {
                color = "white";
            } else if (status == 1){
                color = '#ec9488';
            } else if (status == 2) {
                color = '#f1d737';
            } else {
                color = '#61bd4f';
            }
            return color
        },
        checkColorText(status){
            let color = '';
            if (status == 0) {
                color = "#2c3e50";
            }
            return color
        },
        checkStatus(time){
            let status = 0;
            let dateNow = moment().format('YYYY-MM-DD');
            if (time < dateNow) {
                status = 1;
            } else if (moment(time).format('YYYY-MM-DD') == dateNow) {
                status = 2;
            }
            return status;
        },
        getcard(cardId){
            api.getCardDetail(cardId).then((response) => {
                if (response) {
                    this.setCard(response.data.data)
                }
            })
        },
        changeStatus(time, idCard, statusCard){
            let status = 3;
            if (statusCard == 3) {
                let deadTime = moment(time).lang('vi').format('YYYY-MM-DD HH:mm:ss');
                status = this.checkStatus(deadTime);
            }
            let data = {
                status: status
            }
            api.changeStatusForCard(data, idCard).then(() => {
                this.getDirectories();
                this.getcard(idCard);
            })
        },
        setTimeForCard(val){
            if (val) {
                let date = moment(val).lang('vi').format('YYYY-MM-DD HH:mm:ss');
                let data = {
                    deadline: date
                }
                api.changeDelineForCard(data, this.card.id).then((response) => {
                    if (response) {
                        this.getDirectories();
                        this.getcard(this.card.id);
                    }
                })
                // setTimeout(() => {
                //     if (this.card.status != 3) {
                //         alert(this.card.status)
                //         this.changeStatus(val);
                //     } 
                // }, 500);
            }
        },
        // getCountFile(idCard){
        //     api.getCardDetail(idCard).then((response) => {
                // console.log(response.data.data.files.length)
                // return response.data.data.files.length;
                // if (response.data.data.files.length == 0) {
                //     return true
                // } else {
                //     return true
                // }
            // })
        // }
    },
    watch: {
        card(){
            this.deadline = this.card.deadline
        }
    } 
}
</script>

<style lang="scss">
.pageList {
    @mixin buttonCreate {
        margin-bottom: 8px;
        button {
            padding: 8px 12px;
            border-radius: 2px;
            margin-right: 4px;
        }
        a {
            color: #6b778c;
            height: 32px;
            line-height: 32px;
            width: 32px;
            font-size: 24px;
            border-bottom: 0px;
        }
        a:hover {
            color: #172b4d; 
        }
        a:hover:after {
            border-bottom: 0px;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    position: relative;
    max-width: 100vw;
    max-height: 91vh;
    flex-grow: 1;
    .a {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 8px;
        padding-bottom: 8px;
        overflow-x: scroll;
        overflow-y: hidden;
        min-height: 91vh;
        .dragArea{
            display: flex;
            justify-content: flex-start;
        .list {
            max-width: 20vw;
            min-width: 20vw;
            max-height:89vh;
            margin-left: 8px;
            border-radius: 3px;
            .tag {
                width: 100%;
                background-color: #ebecf0;
                max-height: 89vh;
                border-radius: 3px;
                .list-header {
                    padding: 10px 8px;
                    min-height: 20px;
                    padding-right: 20px;
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    .tagHeader {
                        display: block;
                        font-weight: 600;
                        font-size: 14px;
                        padding: 5px 8px;
                        margin: -4px 0px;
                        cursor: pointer;
                    }
                    .list-textarea {
                        background: transparent;
                        resize: none;
                        width: 100%;
                        padding: 4px 8px;
                        min-height: 20px;
                        max-height: 256px;
                        margin: -4px 0px;
                        font-weight: 600;
                        border-radius: 3px;
                        overflow: hidden;
                        overflow-wrap: break-word;
                        line-height: 20px;
                        border: none;
                        box-sizing: border-box;
                        transition-property: background-color,border-color,box-shadow;
                        transition-duration: 85ms;
                        transition-timing-function: ease;
                        display: none;
                        outline: none;
                        font-size: 14px;
                        font-family: Avenir, Helvetica, Arial, sans-serif;
                    }
                    .list-textarea:focus {
                        background-color: #fff;
                        box-shadow: inset 0 0 0 2px #0079bf;
                    }
                    .icon{
                        position: relative;
                        border-radius: 2px;
                        cursor: pointer;
                        i{
                            padding: 3px 6px 3px 6px;
                        }
                        .list-task{
                            z-index: 10000000;
                            position: absolute;
                            padding: 10px;
                            border-radius: 3px;
                            background-color: white;
                            box-shadow: 0 1px 0 rgba(9,30,66,.25);
                            top: 150%;
                            display: flex;
                            justify-content: center;
                            visibility: hidden;
                            opacity: 0;
                            button {
                                padding: 5px;
                            }
                            transition: all 0.3s;
                        }
                    }
                    .icon:hover{
                        color: #172b4d;
                        background-color: rgba(9,30,66,.08);
                    }
                    .icon:hover .list-task{
                        visibility: visible;
                        opacity: 1;
                        top: 100%;
                    }
                }
                .tagMain {
                    margin: 0p 4px;
                    padding: 0px 8px;
                    max-height: 77vh;
                    overflow: auto;
                    .style-content {
                        position: relative;
                        .content {
                            margin-bottom: 8px;
                            padding: 6px 8px 2px;
                            background-color: #fff;
                            border-radius: 3px;
                            box-shadow: 0 1px 0 rgba(9,30,66,.25);
                            min-height: 24px;
                            .list-card-labels {
                                overflow: auto;
                                .labels {
                                    width: 100%;
                                    .card-label {
                                        float: left;
                                        font-size: 12px;
                                        font-weight: 700;
                                        margin: 0 4px 4px 0;
                                        min-width: 40px;
                                        text-shadow: none;
                                        width: auto;
                                        height: 16px;
                                        line-height: 16px;
                                        padding: 0 8px;
                                        max-width: 198px;
                                        border-radius: 4px;
                                        color: white;
                                        display: flex;
                                        justify-content: center;                       
                                    }
                                }
                            }
                            // dd
                            .badges{
                                display: flex;
                                font-size: 14px;
                                margin-top: 5px;
                                .margin-badges{
                                    margin: 0px 4px 4px 0px;
                                    padding: 3px 5px;
                                    span{
                                        i {
                                            color: #6b778c;
                                        }
                                    }
                                }
                                .deline{
                                    cursor: pointer;
                                    border-radius: 3px;
                                    color: white;
                                    span{
                                        i{
                                            margin-right: 2px;
                                            color: white;
                                        }
                                        .iconBefore{
                                            display: none;
                                        }
                                    }
                                }
                                .deline:hover .iconBefore{
                                    display: inline-block;
                                }
                                .deline:hover .iconAfter{
                                    display: none;
                                }
                            }
                            
                        }
                        .edit-label {
                                    background-color: #f4f5f7;
                                    background-clip: padding-box;
                                    background-origin: padding-box;
                                    border-radius: 3px;
                                    opacity: 0.8;
                                    padding: 4px;
                                    position: absolute;
                                    right: 2px;
                                    top: 2px;
                                    visibility: hidden;
                                    z-index: 4888880;
                                    color: black;
                                    height: 20px;
                                    font-size: 16px;
                                    line-height: 20px;
                                    width: 20px;
                                }
                        .edit-label:hover {
                            background-color:#ebecf0;
                            opacity: 1;
                        }
                    }
                    .style-content:hover .edit-label {
                        visibility: visible;
                    }
                    .createLabel {
                        .createLabel-text {
                            background-color: #fff;
                            border-radius: 3px;
                            box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
                            cursor: pointer;
                            display: block;
                            margin-bottom: 8px;
                            max-width: 300px;
                            min-height: 20px;
                            position: relative;
                            text-decoration: none;
                            z-index: 0;
                            padding: 6px 8px 2px;

                            textarea{
                                overflow: hidden;
                                overflow-wrap: break-word;
                                resize: none;
                                height: 54px;
                                font-family: Avenir, Helvetica, Arial, sans-serif;
                                border-radius: 3px;
                                display: block;
                                line-height: 20px;
                                outline: none;
                                box-sizing: border-box;
                                color: #172b4d;
                                margin-bottom: 4px;
                                max-height: 162px;
                                min-height: 54px;
                                background: none;
                                border: none;
                                box-shadow: none;
                                padding: 0;
                                font-size: 14px;
                                width: 100%;
                            }
                        }
                        .createLabel-button {
                            .buttonCreate {
                                @include buttonCreate
                            }
                        }
                    }
                }
                .tagMain::-webkit-scrollbar {
                    width: 10px;
                }
                .tagMain::-webkit-scrollbar-track {
                    background: #d9dbe2; 
                    border-radius: 8px;
                }
                .tagMain::-webkit-scrollbar-thumb {
                    background: #bec3cd;
                    border-radius: 8px;
                }
                .tagFooder {
                    min-height: 38px;
                    max-height: 38px;
                    div {
                        width: 80%;
                        border-radius: 3px;
                        color: #5e6c84;
                        display: block;
                        flex: 1 0 auto;
                        margin: 2px 0 8px 8px;
                        padding: 4px 8px;
                        position: relative;
                        text-decoration: none;
                        -webkit-user-select: none;
                        user-select: none;
                        font-family: Avenir, Helvetica, Arial, sans-serif;
                        box-sizing: none;
                        font-size: 14px;
                        i {
                            height: 20px;
                            font-size: 14px;
                            line-height: 20px;
                            width: 20px;
                        }
                    }
                    div:hover {
                        background-color: rgba(9,30,66,.08);
                        color: #172b4d;
                    }
                }
            }
        }   
        }
        .style-createList {
            max-width: 20vw;
            min-width: 20vw;
            margin-left: 8px;
            .createList {
                min-height: 32px;
                height: auto;
                padding: 4px;
                border-radius: 3px;
                background-color: rgba(255, 255, 255, 0.47);
                .placeholder {
                    color: #172b4d;
                    cursor: pointer;
                    padding: 8px 8px;
                    font-size: 14px;
                    i {
                        margin-right: 2px;
                    }
                }
                input {
                    width: 100%;
                    box-sizing: border-box;
                    border-radius: 3px;
                    line-height: 20px;
                    padding: 6px 12px;
                    outline: none;
                    border: none;
                    color: #172b4d;
                    background-color: #fff;
                    box-shadow: inset 0 0 0 2px #0079bf;
                    display: block;
                    margin: 0;
                    font-size: 14px;
                }
                .buttonCreate {
                    margin-top: 8px;
                    @include buttonCreate;
                    display: block;
                }
            }
            
        }
    }
    .a::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    // .a::-webkit-scrollbar-track {
    //     background: #000000bf; 
    // }
    .a::-webkit-scrollbar-thumb {
        background: #6c7e8b;
        border-radius: 8px;
    }
    .moe {
        background: rgba(0,0,0,.6);
        bottom: 0;
        color: #fff;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 10;
        .close-card-quick{
            color: hsla(0,0%,100%,.6);
            padding: 9px;
            position: absolute;
            right: 0;
            top: 0;
            height: 32px;
            line-height: 32px;
            width: 32px;
            font-size: 24px;
            transition-property: transform,color;
            transition-duration: .15s;
        }
        .close-card-quick:hover {
            color: white;
        }
        .quick-card-edit {
            position: absolute;
            cursor: pointer;
            .card-quick{
                background-color: #fff;
                border-radius: 3px;
                box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
                cursor: pointer;
                display: block;
                margin-bottom: 8px;
                max-width: 300px;
                min-height: 20px;
                position: relative;
                text-decoration: none;
                color: #172b4d;
                .card-quick-detail{
                    overflow: hidden;
                    padding: 6px 8px 2px;
                    position: relative;
                    z-index: 10;
                    .list-card-labels {
                        overflow: auto;
                        .labels {
                            width: 100%;
                            .card-label {
                                float: left;
                                font-size: 12px;
                                font-weight: 700;
                                height: 8px;
                                line-height: 100px;
                                margin: 0 4px 4px 0;
                                max-width: 40px;
                                min-width: 40px;
                                padding: 0;
                                text-shadow: none;
                                width: auto;
                                border-radius: 10px;
                            }
                        }
                    }
                    textarea {
                        overflow: hidden;
                        overflow-wrap: break-word;
                        resize: none;
                        height: 90px;
                        padding: 0;
                        margin: -1px;
                        width: 100%;
                        border-radius: 3px;
                        display: block;
                        line-height: 20px;
                        box-sizing: border-box;
                        outline: none;
                        border: none;
                    }
                    .badges{
                        display: flex;
                        font-size: 14px;
                        margin-top: 5px;
                        .margin-badges{
                            margin: 0px 4px 4px 0px;
                            padding: 3px 5px;
                            span{
                                i {
                                    color: #6b778c;
                                }
                            }
                        }
                        .deline{
                            cursor: pointer;
                            border-radius: 3px;
                            color: white;
                                span{
                                    i{
                                        margin-right: 2px;
                                        color: white;
                                    }
                                .iconBefore{
                                    display: none;
                                }
                            }
                        }
                        .deline:hover .iconBefore{
                            display: inline-block;
                        }
                        .deline:hover .iconAfter{
                            display: none;
                        }
                    }
                }
            }
            button {
                padding-left: 24px;
                padding-right: 24px;
                background-color: #5aac44;
                box-shadow: none;
                border: none;
                color: #fff;
            }
            button:hover {
                background: #85ce61;
            }
            .card-editor {
                position: absolute;
                left: 100%;
                top: 0;
                width: 240px;
                color: #fff;
                font-size: 14px;
                line-height: 20px;
                font-weight: 400;
                .card-editor-quick{
                    background: rgba(0,0,0,.6);
                    border-radius: 3px;
                    clear: both;
                    color: #e6e6e6;
                    display: block;
                    float: left;
                    margin: 0 0 4px 8px;
                    padding: 6px 12px 6px 8px;
                    transition: margin 0.3s;
                    .card-editor-text {
                        margin-left: 4px;
                    }
                }
                .deadline{
                    position: relative;
                    .input-deline {
                        position: absolute;
                        top: -10px;
                        left: 0;
                        z-index: 1000;
                        opacity: 0;
                    }
                }
                .card-editor-quick:hover {
                    margin: 0 0 4px 16px;
                }
            }
        }
    }
    .window-overlay{
        align-items: flex-start;
        background-color: rgba(0,0,0,.64);
        height: 100%;
        display: flex;
        justify-content: center;
        left: 0;
        overflow-y: auto;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 20;
    }
    .table-label {
        z-index: 1000;
        position: absolute;
        width: 300px;
        z-index: 30;
        top: 0;
        left: 0;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
    }
     .modal-file {
        z-index: 1000;
        position: absolute;
        width: 300px;
        z-index: 30;
        top: 0;
        left: 0;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
    }
    .el-dialog__wrapper{
        .el-dialog{
            .el-dialog__header{
                display: flex;
                justify-content: center;
                span{
                    color: #f46c6c;
                    font-size: 25px;
                }
            }
            .el-dialog__body{
                span{
                    font-size: 16px;
                }
            }
        }
    }
}
</style>