<template>
    <div class="main">
        <div class="window-wrapper">
            <span class="close-main-modal el-icon-close" @click="closeModalMain()"></span>
            <div class="card-detail-window">
                <div class="window-header">
                    <span class="el-icon-postcard"></span>
                    <div class="window-title">
                        <textarea ref="carTitle" @keydown.enter="changeTitle(card.id)" v-model="card.title" class="card-textaerea"></textarea>
                        <div class="window-header-inline-content">
                            <p>trong danh sách <a href="">{{ card.directory.title }}</a></p>
                        </div>
                    </div>
                </div>
                <div class="window-main">
                    <div class="card-detail-data">
                        <div v-if="card.labels.length != 0" class="card-detail-labels">
                            <h3>NHÃN</h3>
                            <div class="card-detail-labels-list">
                                <span class="card-label" 
                                v-for="(label, indexLabel) in card.labels" :key="indexLabel" 
                                :style="{ backgroundColor: label.color }">
                                    {{ label.name }}
                                </span>
                                <span title="Hiển thị chi tiết nhãn" @click="showLabel('iconLabel')" ref="iconLabel" class="card-detail-item-add-button el-icon-plus"></span>
                            </div>
                        </div>
                        <div title="Đặt thời gian hết hạn" v-if="card.deadline" class="card-detail-due-date" ref="deline">
                            <h3>NGÀY HẾT HẠN</h3>
                            <div class="card-detail-due-date-badge">
                                <input @click="changeStatusDone()" ref="inputDeLine" class="card-detail-badge-due-date-complete-box" type="checkbox">
                                <div class="text-deline">
                                    <div class="input-date">
                                        <el-date-picker
                                            v-model="card.deadline"
                                            type="datetime"
                                            placeholder="Select date and time"
                                            @change="setTimeForCard">
                                        </el-date-picker>
                                    </div>
                                    <div>
                                        <span class="button-link" >{{ formatDate(card.deadline)}}</span>
                                        <span ref="status" class="text-error-date"></span>
                                        <span class="icon"><i class="el-icon-arrow-down"></i></span>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="u-clearfix"></div>
                    </div>
                    <div class="fill-card-detail-desc">
                        <div class="window-module">
                            <div class="window-module-title">
                                <span class="el-icon-s-unfold"></span>
                                <h4>Mô tả</h4>
                                <div v-if="card.description" @click="showDescriptionEdit()" class="editable">
                                    Chỉnh sửa
                                </div>
                            </div>
                            <div class="u-gutter">
                                <div title="Chỉnh sửa mô tả cho thẻ" class="editable">
                                    <div v-if="!isTextDescription" class="description-content" @click="showDescriptionEdit()">
                                        <p v-if="card.description">{{ card.description }}</p>
                                        <div v-else class="default-discription">
                                            Thêm mô tả chi tiết hơn...
                                        </div>
                                    </div>
                                    <div v-else class="description-edit" >
                                        <textarea v-model="card.description" placeholder="Thêm mô tả chi tiết hơn..."></textarea>
                                        <div class="edit-controls">
                                            <el-button @click="updateDescription(card.id)" type="success">Lưu</el-button>
                                            <span @click="isTextDescription = false;" class="icon el-icon-close"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-word" v-if="card.files.length != 0 ">
                        <div class="work">
                            <div class="work-header">
                                <span class="el-icon-paperclip"></span>
                                <h3>Các tập tin đính kèm</h3>
                                <!-- <div class="editable">
                                    Xóa
                                </div> -->
                            </div>
                            <div class="content-file">
                                <div class="box-file" v-for="(file, indexFile) in card.files" :key="indexFile">
                                    <img :src="'http://vuecourse.zent.edu.vn/storage/'+ file.path" alt="">
                                    <div class="content-text">
                                        <p>{{ file.name }} <span class="el-icon-top-right"></span></p>
                                        <span> Đã thêm {{ formatTime(file.created_at)}}</span> - 
                                        <span title="Xóa file" ref="deleteFile" class="btn" @click="deleteFile(file.id, indexFile)">
                                            Xóa
                                        </span> - 
                                        <span title="Chỉnh sửa file" ref="updateFile" class="btn editFile" @click="editFile(file.name, file.id, indexFile)">
                                            Chỉnh sửa
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="card.check_lists.length != 0 " class="box-word">
                        <div class="work" v-for="(work, indexWork) in card.check_lists" :key="indexWork">
                            <div ref="workTitle" class="work-header">
                                <span class="el-icon-edit-outline"></span>
                                <h3 title="Chỉnh sửa việc cần làm" @click="showEditWork(indexWork)">{{ work.title }}</h3>
                                <div title="Xóa việc cần làm" ref="delWork" @click="delWork(work.id, indexWork)" class="editable">
                                    Xóa
                                </div>
                            </div>
                            <div style="display:none" ref="workEdit" class="box-edit-work">
                                <span class="el-icon-edit-outline"></span>
                                <div class="description-edit" >
                                    <textarea class="search-label" ref="contentWork" v-model="work.title"></textarea>
                                    <div class="edit-controls">
                                        <el-button @click="updateWork(work.id, indexWork)" type="success">Lưu</el-button>
                                        <span @click="closeEdit(indexWork)" class="icon el-icon-close"></span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="work.check_list_childs.length != 0" class="pt">
                                <el-progress :stroke-width="8" :color="customColors" :percentage="checkPercentCompleted(work.check_list_childs)"></el-progress>
                            </div>
                            <div class="box-children-work">
                                <div title="Chỉnh sửa chỉ mục" class="work-chidren" v-for="(chidrenWork, indexChildrenWork) in work.check_list_childs" :key="chidrenWork.id">
                                    <div class="check-box">
                                        <input @click="checkStatusChildrenWork(indexWork, indexChildrenWork, chidrenWork.id)" :ref="getNameRef(indexWork, indexChildrenWork)" type="checkbox" :checked="chidrenWork.status ? true : false">
                                    </div>
                                    <div ref="boxChildrenWork" @click="showEditChildrenWork(indexChildrenWork)" class="content-checkbox">
                                        <span>{{ chidrenWork.title }}</span>
                                    </div>
                                    <div style="display:none" ref="editChildrenWork" class="description-edit" >
                                        <textarea class="search-label" ref="contentWork" v-model="chidrenWork.title"></textarea>
                                        <div class="edit-controls">
                                            <el-button @click="updateChildrenWork(chidrenWork.id, chidrenWork.title, indexChildrenWork)" type="success">Lưu</el-button>
                                            <span @click="closeEditChildrenWork(indexChildrenWork)" class="icon el-icon-close"></span>
                                        </div>
                                    </div>
                                    <div ref="delChildrenWork" class="btn-children">
                                        <span @click="deleteChildrenWork(chidrenWork.id)" title="Xóa chỉ mục" class="el-icon-delete"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="u-gutter">
                                <div class="editable">
                                    <div ref="createChildrenWork" class="description-content" >
                                        <el-button @click="showChildrenWork(indexWork)" type="info">Thêm một mục</el-button>
                                    </div>
                                    <div style="display:none" ref="textChildrenWord" class="description-edit" >
                                        <input v-model="titleChidrenWork" class="search-label" type="text" placeholder="Thêm một mục">
                                        <div class="edit-controls">
                                            <el-button @click="createChidlrenWork(work.id)" type="success">Lưu</el-button>
                                            <span @click="closeEdit(indexWork)" class="icon el-icon-close"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="window-sidebar">
                    <div class="window-module">
                        <h3>Thêm vào thẻ</h3>
                        <div >
                            <span title="Thêm mới việc cần làm" ref="work" @click="showModalCreateWork(card.id)" class="slide-tag" >
                                <span class="icon el-icon-notebook-2"></span>
                                <span class="button-link">Việc cần làm</span>
                            </span>
                            <span title="Hiển thị chi tiết nhãn" @click="showLabel('label')" ref="label" class="slide-tag">
                                <span class="icon el-icon-discount"></span>
                                <span class="button-link">Chỉnh sửa nhãn</span>
                            </span>
                            <span title="Đặt thời gian hết hạn" class="slide-tag deline">
                                <div class="input-deline" >
                                    <el-date-picker
                                        v-model="deadline"
                                        type="datetime"
                                        placeholder="Select date and time"
                                        @change="setTimeForCard">
                                    </el-date-picker>
                                </div>
                                <span class="icon el-icon-alarm-clock"></span>
                                <span class="button-link" >Ngày hết hạn</span>
                            </span>
                            <span title="Thêm mới file" class="slide-tag box-file">
                                <div class="input-file">
                                    <input ref="inputFile" type="file" accept="image/*" @change="uploadFile">
                                </div>
                                <span class="icon el-icon-paperclip"></span>
                                <span class="button-link">File đính kèm</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import moment from 'moment';
import api from '../../api'
export default {
name:"Cart",
computed: {
    ...mapState('home', [
        'card',
        'topLabel',
        'leftLabel',
    ]),
},
data () {
    return {
        pickerOptions: {
            shortcuts: [{
                text: 'Today',
                onClick(picker) {
                picker.$emit('pick', new Date());
                }
            }, {
                text: 'Yesterday',
                onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
                }
            }, {
                text: 'A week ago',
                onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
                }
            }]
        },
        isDone:false,
        status: 1,
        idCart: '',
        deadline: '',
        value5: 30,
        isTextDescription: false,
        textDescription: '',
        idFile: 0,
        nameFile:'',
        isEdit:true,
        isShow:false,
        top: '',
        left: '',
        isChidrenWord: false,
        textWork: '',
        isShowEditWork: false,
        titleChidrenWork:'',
        customColors: [
          {color: '#61bd4f', percentage: 10},
          {color: '#f2d600', percentage: 20},
          {color: '#ff9f1a', percentage: 30},
          {color: '#eb5a46', percentage: 40},
          {color: '#0079', percentage: 60},
          {color: '#ff78cb', percentage: 80},
          {color: '#51e898', percentage: 100},
        ]
    }
},
methods: {
    ...mapMutations('home', [
        'closeModalMain',
        'updateTblLabel',
        'setLabel',
        'setCard',
        'setList',
        'updateSizeFile',
        'createWork',
        'deleteWork'
    ]),
    formatDate(val){
        return moment(val).lang('vi').add(1).calendar();
    },
    formatTime(val){
        return moment(val).lang('vi').startOf('hour').fromNow(); 
    },
    close (){
        this.closeModalMain();
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
    changeStatus(time){
        let deadTime = moment(time).lang('vi').format('YYYY-MM-DD HH:mm:ss');
        let status = this.checkStatus(deadTime);
        let data = {
            status: status
        }
        api.changeStatusForCard(data, this.card.id).then(() => {
            this.getDirectories();
            this.getcard(this.card.id);
        })
    },
    getDirectories(){
        api.getList().then((response) => {
            if (response) {
                this.setList(response.data.data)
            }
        })
    },
    getLabels(){
        api.getLabels().then((response) => {
                if (response) {
                    this.setLabel(response.data.data)
                }
            })
    },
    getcard(cardId){
        api.getCardDetail(cardId).then((response) => {
            if (response) {
                this.setCard(response.data.data)
            }
        })
    },
    showLabel(refName){
        let left = this.$refs.[refName].getBoundingClientRect().left;
        let data = {
            'left': left,
            'top': top
        }
        this.updateTblLabel(data);
        this.getLabels();
    },
    updateTextCard(data, idCard){
        api.updateCard(data, idCard).then((response) => {
            if (response) {
                this.getDirectories();
                this.getcard(idCard);
            }
        })
    },
    changeTitle(idCard){
        this.$refs.carTitle.blur();
        let data = {
            title: this.card.title,
        }
        this.updateTextCard(data,idCard );
        
    },
    showDescriptionEdit(){
        this.isTextDescription = true;
    },
    updateDescription(idCard){
        let data = {
            description: this.card.description,
        }
        this.updateTextCard(data,idCard);
        this.isTextDescription = false;
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
    checkIsStatus(){
        if (this.card.status == 0) {
            this.$refs.inputDeLine.checked = false;
            this.$refs.status.style.display = 'none'
        } else if (this.card.status == 1){
            this.$refs.inputDeLine.checked = false;
            this.$refs.status.style.display = 'inline';
            this.$refs.status.innerHTML = 'Quá hạn';
            this.$refs.status.style.backgroundColor = '#ec9488';
        } else if (this.card.status == 2) {
            this.$refs.inputDeLine.checked = false;
            this.$refs.status.style.display = 'inline'
            this.$refs.status.innerHTML = 'Gần đến hạn';
            this.$refs.status.style.backgroundColor = '#f1d737';
        } else {
            this.$refs.inputDeLine.checked = true;
            this.$refs.status.style.display = 'inline'
            this.$refs.status.innerHTML = 'Hoàn thành';
            this.$refs.status.style.backgroundColor = '#61bd4f';
        }
    },
    changeStatusDone(){
        let isChecked = this.$refs.inputDeLine.checked;
        if (isChecked) {
            let data = {
                status: 3
            }
            api.changeStatusForCard(data, this.card.id).then(() => {
                this.getDirectories();
                this.getcard(this.card.id);
            })
        } else {
            this.changeStatus(this.card.deadline);
        }
        
    },
    getNameRef(indexWork,indexChildrenWork){
        return indexWork + '' +  indexChildrenWork;
    },
    checkStatusChildrenWork(indexWork, index, id){
        let refName = indexWork + '' +  index;
        let isChecked = this.$refs.[refName][0].checked;
        let status = 0;
        if (isChecked) {
            status = 1;
        }
        let data = {
            status: status,
        }
        api.changeStatusChidrenWork(data, id).then(() => {
            this.getDirectories();
            this.getcard(this.card.id);
        })
    },
    uploadFile(event){
        let file =  event.target.files[0]
        const formData = new FormData();
        formData.append('file', file)
        api.uploadFileForCard(formData, this.card.id).then(() => {
            this.getDirectories();
            this.getcard(this.card.id);
        })
    },
    editFile(nameFile, idFile, index){
        this.idFile = idFile;
        let left = this.$refs.updateFile[index].getBoundingClientRect().left;
        let top = this.$refs.updateFile[index].getBoundingClientRect().top;
        this.top = top;
        this.left = left;
        this.isShow = true;
        let data = {
            left: left,
            top: top,
            isShow: true,
            isEdit: true,
            idFile: this.idFile,
            idCard: this.card.id,
            nameFile: nameFile,
        }
        this.updateSizeFile(data);
    },
    showModalCreateWork(idCard){
        let left = this.$refs.work.getBoundingClientRect().left;
        let top = this.$refs.work.getBoundingClientRect().top;
        this.top = top;
        this.left = left;
        this.isShow = true;
        let data = {
            left: left,
            top: top,
            isShow: true,
            idCard: idCard,
        }
        this.createWork(data);
    },
    deleteFile(idFile, index){
        this.idFile = idFile;
        let left = this.$refs.deleteFile[index].getBoundingClientRect().left;
        let top = this.$refs.deleteFile[index].getBoundingClientRect().top;
        this.top = top;
        this.left = left;
        this.isShow = true;
        let data ={
            left: left,
            top: top,
            isShow: true,
            isEdit: false,
            idFile: this.idFile,
            idCard: this.card.id,
        }
        this.updateSizeFile(data);
    },
    delWork(idWork, index){
        let left = this.$refs.delWork[index].getBoundingClientRect().left;
        let top = this.$refs.delWork[index].getBoundingClientRect().top;
        this.top = top;
        this.left = left;
        this.isShow = true;
        let data = {
            left: left,
            top: top,
            isShow: true,
            isDelete: true,
            idCard: this.card.id,
            idWork: idWork,
        }
        this.deleteWork(data);
    },
    showEditWork(index){
        this.$refs.workTitle[index].style.display = 'none'
        this.$refs.workEdit[index].style.display = 'block'
    },
    closeEdit(index){
        this.$refs.workTitle[index].style.display = 'block'
        this.$refs.workEdit[index].style.display = 'none'
        this.$refs.createChildrenWork[index].style.display = 'block'
        this.$refs.textChildrenWord[index].style.display = 'none'
    },
    updateWork(idWork, index){
        let title = this.$refs.contentWork[index].value
        let data = {
            'title': title
        }
        api.updateWork(data, idWork).then(() => {
            this.getDirectories();
            this.getcard(this.card.id);
            this.closeEdit(index);
            this.$message({
                message: 'Sửa công việc chính thành công',
                type: 'info'
            });
        })
    },
    showChildrenWork(index){
        this.$refs.createChildrenWork[index].style.display = 'none'
        this.$refs.textChildrenWord[index].style.display = 'block'
    },
    createChidlrenWork(idWork){
        let data = {
            'title': this.titleChidrenWork,
            'check_list_id': idWork
        };
        api.createChidrenWork(data).then(() => {
            this.getDirectories();
            this.getcard(this.card.id);
            this.titleChidrenWork = '';
            this.$message({
                message: 'Thêm chỉ mục thành công',
                type: 'success'
            });
        })
        
    },
    showEditChildrenWork(index){
        this.$refs.boxChildrenWork[index].style.display = "none"
        this.$refs.editChildrenWork[index].style.display = "block"
        this.$refs.delChildrenWork[index].style.display = "none"
    },
    closeEditChildrenWork(index){
        this.$refs.boxChildrenWork[index].style.display = "block"
        this.$refs.editChildrenWork[index].style.display = "none"
        this.$refs.delChildrenWork[index].style.display = "block"
    },
    updateChildrenWork(idChilrenWork, title, index){
        let data = {
            'title': title
        };
        api.updateChidrenWork(data, idChilrenWork).then(() => {
            this.getDirectories();
            this.getcard(this.card.id);
            this.closeEditChildrenWork(index)
            this.$message({
                message: 'Sửa chỉ mục thành công',
                type: 'info'
            });
        })
    },
    deleteChildrenWork(id){
        api.destroyChidrenWork(id).then(() => {
            this.getDirectories();
            this.getcard(this.card.id);
            this.$message({
                message: 'Xóa chỉ mục thành công',
                type: 'success'
            });
        })
    },
    checkPercentCompleted(arr){
        let totalChildrenWork = arr.length;
        let a = 0;
        arr.forEach((item) => {
            if (item.status == 1) {
                a = a + 1;
            }
        })
        // alert(a / totalChildrenWork * 100)
        return Math.ceil(a / totalChildrenWork * 100);
    }
},
watch: {
    card(){
        this.deadline = this.card.deadline
        if (this.card.deadline) {
            setTimeout(() => {
                this.checkIsStatus();
            }, 100);
        }
    }
}
}
</script>

<style lang="scss">
.main{
    @mixin h3 {
        color: #5e6c84;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: .04em;
        margin-top: 16px;
        text-transform: uppercase;
        display: block;
        line-height: 20px;
        margin: 0 8px 4px 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: 700;
    }
    @mixin floatLeft {
        display: block;
        float: left;
        margin: 0 8px 8px 0;
        max-width: 100%;
    }
    background-color: #f4f5f7;
    border-radius: 2px;
    margin: 48px 0 80px;
    position: relative;
    width: 768px;
    z-index: 25;
    .window-wrapper {
        .close-main-modal {
            color: #42526e;
            border-radius: 50%;
            position: absolute;
            top: 0;
            right: 0;
            height: 32px;
            overflow: hidden;
            padding: 4px;
            margin: 4px;
            width: 32px;
            z-index: 2;
            transition: background-color 85ms,color 85ms;
            font-size: 20px;
            line-height: 32px;
            display: flex;
            justify-content: center;
        }
        .close-main-modal:hover {
            background-color: #ebecef
        }
        .card-detail-window {
            min-height: 600px;
            .window-header{
                margin: 12px 40px 8px 56px;
                min-height: 32px;
                position: relative;
                z-index: 1;
                span {
                    left: -40px;
                    position: absolute;
                    top: 4px;
                    color: #42526e;
                    height: 32px;
                    line-height: 32px;
                    width: 32px;
                    font-size: 24px;
                }
                .window-title {
                    margin: 4px 0 0;
                    padding: 8px 0 0;
                    textarea {
                        background: transparent;
                        border-radius: 3px;
                        box-shadow: none;
                        font-size: 20px;
                        font-weight: 600;
                        line-height: 24px;
                        margin: -4px -8px;
                        min-height: 24px;
                        padding: 4px 8px;
                        resize: none;
                        overflow: hidden;
                        overflow-wrap: break-word;
                        height: 32px;
                        width: 100%;
                        outline: none;
                        border: none;
                        box-sizing: border-box;
                    }
                    .card-textaerea:focus{
                        background-color: #fff;
                        box-shadow: inset 0 0 0 2px #0079bf;
                    }
                    .window-header-inline-content{
                        cursor: default;
                        display: inline-block;
                        color: #5e6c84;
                        font-size: 14px;
                        p{
                            margin-bottom: 0;
                            padding-bottom: 0;
                            display: inline-block;
                            margin: 0 0 8px;
                            a{
                                color: #5e6c84;
                                display: inline;
                            }
                        }
                    }
                }
            }
            .window-main{
                float: left;
                margin: 0;
                overflow-x: hidden;
                overflow-y: auto;
                min-height: 24px;
                padding: 0 8px 8px 16px;
                position: relative;
                width: 552px;
                z-index: 0;
                .card-detail-data {
                    margin: 8px 0px 0px 40px;
                    .card-detail-labels {
                        @include floatLeft;
                        h3 {
                            @include h3;
                        }
                        .card-detail-labels-list{
                            .card-label{
                                border-radius: 3px;
                                box-sizing: border-box;
                                display: block;
                                float: left;
                                font-size: 14px;
                                font-weight: 600;
                                height: 32px;
                                line-height: 32px;
                                margin: 0 4px 4px 0;
                                min-width: 40px;
                                padding: 0 12px;
                                width: auto;
                                background-color: #61bd4f;
                                cursor: pointer;
                                color: #fff;
                            }
                            .card-detail-item-add-button{
                                background-color: rgba(9,30,66,.04);
                                box-shadow: none;
                                border: none;
                                border-radius: 3px;
                                cursor: pointer;
                                display: block;
                                float: left;
                                margin: 0 8px 8px 0;
                                transition-property: background-color,border-color,box-shadow;
                                transition-duration: 85ms;
                                transition-timing-function: ease;
                                font-size: 16px;
                                height: 16px;
                                line-height: 16px;
                                padding: 8px;
                                width: 16px;
                            }
                        }
                    }
                    .card-detail-due-date {
                        display: none;
                        @include floatLeft;
                        h3 {
                            @include h3;
                        }
                        .card-detail-due-date-badge{
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            margin: 0 8px 8px 0;
                            height: 32px;
                            line-height: 32px;
                            .card-detail-badge-due-date-complete-box{
                                position: relative;
                                border-radius: 2px;
                                height: 16px;
                                width: 16px;
                                overflow: hidden;
                                white-space: nowrap;
                                transition: all .2s ease-in-out;
                                background-color: #fafbfc;
                                box-shadow: inset 0 0 0 2px #dfe1e6;
                                margin: auto 4px auto 0;
                                color: #172b4d;
                            }
                            .card-detail-badge-due-date-button {
                                background-color: rgba(9,30,66,.04);
                                box-shadow: none;
                                border: none;
                                border-radius: 3px;
                                box-sizing: border-box;
                                cursor: pointer;
                                display: block;
                                height: 32px;
                                max-width: 300px;
                                overflow: hidden;
                                padding: 6px 12px;
                                position: relative;
                                text-decoration: none;
                                text-overflow: ellipsis;
                                user-select: none;
                                white-space: nowrap;
                                .icon {
                                    font-size: 12px;
                                    line-height: 16px;
                                    padding: 0 4px;
                                    text-transform: uppercase;
                                    border-radius: 2px;
                                    margin: auto 0 auto 8px;
                                }
                            }
                            .text-deline {
                                cursor: pointer;
                                background-color: rgba(9,30,66,.04);
                                padding: 0px 12px;
                                position: relative;
                                border-radius: 3px;
                                .input-date{
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    opacity: 0;
                                }
                                .text-error-date{
                                    display: none;
                                    margin-left:8px;
                                    padding: 2px 5px;
                                    border-radius: 3px;
                                    background-color: #ec9488;
                                    color: white;
                                }
                                .icon{
                                    margin-left: 8px;
                                }
                            }
                        }
                    }
                    .u-clearfix{
                        clear: both;
                        content: "";
                        display: table;
                    }
                }
                .fill-card-detail-desc{
                    .window-module{
                        clear: both;
                        margin-bottom: 24px;
                        position: relative;
                        .window-module-title{
                            display: flex;
                            align-items: center;
                            min-height: 32px;
                            padding: 8px 0;
                            position: relative;
                            margin: 0 0 4px 40px;
                            border-bottom: none;
                            span {
                                position: absolute;
                                top: 8px;
                                left: -40px;
                                color: #42526e;
                                height: 32px;
                                line-height: 32px;
                                width: 32px;
                                font-size: 24px;
                            }
                            h3 {
                                display: inline-block;
                                width: auto;
                                margin: 0;
                                min-height: 18px;
                                min-width: 40px;
                            }
                            .editable{
                                margin-left: 8px;
                                font-size: 14px;
                                color: #172b4d;
                                font-size: 14px;
                                line-height: 20px;
                                font-weight: 400;
                                box-sizing: border-box;
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                                border-radius: 3px;
                                cursor: pointer;
                                padding: 6px 12px;
                                text-decoration: none;
                                background-color: rgba(9,30,66,.04);
                                box-shadow: none;
                                border: none;
                            }
                            .editable:hover{
                                background-color: #e2e4e9;
                            }
                        }
                        .u-gutter{
                            margin-left: 40px;
                            .editable{
                                .description-edit{
                                    textarea{
                                        overflow: hidden;
                                        overflow-wrap: break-word;
                                        resize: none;
                                        height: 108px;
                                        min-height: 108px;
                                        background: #fff;
                                        box-shadow: none;
                                        width: 100%;
                                        padding: 8px 12px;
                                        line-height: 20px;
                                        border-radius: 3px;
                                        box-sizing: border-box;
                                        outline: none;
                                        border: none;
                                    }
                                    textarea:focus{
                                        background-color: #fff;
                                        box-shadow: inset 0 0 0 2px #0079bf;
                                    }
                                }
                                .default-discription{
                                    background-color: rgba(9,30,66,.04);
                                    box-shadow: none;
                                    border: none;
                                    border-radius: 3px;
                                    display: block;
                                    min-height: 40px;
                                    padding: 8px 12px;
                                    text-decoration: none;
                                    color: #172b4d;
                                }
                                .default-discription:hover{
                                    background-color: #e2e4e9;
                                }
                                .edit-controls{
                                    margin-top: 8px;
                                    button {
                                        background-color: #5aac44;
                                        box-shadow: none;
                                        border: none;
                                        color: #fff;
                                        margin: 0 4px 0 0;
                                        font-size: 14px;
                                    }
                                    .icon {
                                        display: inline-block;
                                        font-family: trellicons;
                                        font-style: normal;
                                        font-weight: 400;
                                        text-align: center;
                                        text-decoration: none;
                                        vertical-align: bottom;
                                        height: 32px;
                                        line-height: 32px;
                                        width: 32px;
                                        color: #42526e;
                                        font-size: 24px;
                                        cursor: pointer;
                                    }
                                }
                                .description-content{
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
                .box-word{
                    margin-bottom: 24px;
                    position: relative;
                    .work{
                        margin-bottom: 24px;
                        .work-header{
                            display: flex;
                            align-items: center;
                            min-height: 32px;
                            padding: 8px 0;
                            position: relative;
                            margin: 0 0 4px 40px;
                            border-bottom: none;
                            span {
                                position: absolute;
                                top: 8px;
                                left: -40px;
                                color: #42526e;
                                height: 32px;
                                line-height: 32px;
                                width: 32px;
                                font-size: 24px;
                            }
                            h3 {
                                cursor: pointer;
                                display: inline-block;
                                width: auto;
                                margin: 0;
                                min-height: 18px;
                                min-width: 40px;
                            }
                            .editable{
                                position: absolute;
                                right: 0;
                                font-size: 14px;
                                color: #172b4d;
                                font-size: 14px;
                                line-height: 20px;
                                font-weight: 400;
                                box-sizing: border-box;
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                                border-radius: 3px;
                                cursor: pointer;
                                padding: 6px 12px;
                                text-decoration: none;
                                background-color: rgba(9,30,66,.04);
                                box-shadow: none;
                                border: none;
                            }
                        }
                        .box-edit-work{
                            display: flex;
                            align-items: center;
                            min-height: 32px;
                            padding: 8px 0;
                            position: relative;
                            margin: 0 0 4px 40px;
                            border-bottom: none;
                            position: relative;
                            .el-icon-edit-outline {
                                position: absolute;
                                top: 8px;
                                left: -40px;
                                color: #42526e;
                                height: 32px;
                                line-height: 32px;
                                width: 32px;
                                font-size: 24px;
                            }
                            .description-edit{
                                width: 100%;
                                    .search-label{
                                        width: 100%;
                                        overflow: hidden;
                                        overflow-wrap: break-word;
                                        resize: none;
                                        height: 54px;
                                        background: rgba(9,30,66,.04);
                                        border-color: rgba(9,30,66,.13);
                                        box-shadow: inset 0 0 0 1px rgb(9 30 66 / 13%);
                                        margin-bottom: 4px;
                                        font-size: 16px;
                                        line-height: 19px;
                                        font-weight: 700;
                                        box-sizing: border-box;
                                        border: none;
                                        outline: none;
                                        border-radius: 3px;
                                        padding: 8px 12px;
                                    }
                                    .search-label:focus{
                                        background-color: #fff;
                                        box-shadow: inset 0 0 0 2px #0079bf;
                                    }
                            }
                            .default-discription{
                                background-color: rgba(9,30,66,.04);
                                box-shadow: none;
                                border: none;
                                border-radius: 3px;
                                display: block;
                                min-height: 40px;
                                padding: 8px 12px;
                                text-decoration: none;
                                color: #172b4d;
                            }
                            .default-discription:hover{
                                background-color: #e2e4e9;
                            }
                            .edit-controls{
                                margin-top: 8px;
                                button {
                                    background-color: #5aac44;
                                    box-shadow: none;
                                    border: none;
                                    color: #fff;
                                    margin: 0 4px 0 0;
                                    font-size: 14px;
                                }
                                .icon {
                                    display: inline-block;
                                    font-family: trellicons;
                                    font-style: normal;
                                    font-weight: 400;
                                    text-align: center;
                                    text-decoration: none;
                                    vertical-align: bottom;
                                    height: 32px;
                                    line-height: 32px;
                                    width: 32px;
                                    color: #42526e;
                                    font-size: 24px;
                                    cursor: pointer;
                                }
                            }
                            .description-content{
                                cursor: pointer;
                            }
                        }
                        .pt{
                            margin: 0 0 4px 40px;
                            margin-bottom: 6px;
                        }
                        .content-file{
                            margin-left: 40px;
                            .box-file{
                                border-radius: 3px;
                                min-height: 80px;
                                margin: 0 0 8px;
                                overflow: hidden;
                                position: relative;
                                img{
                                    background-position: 50%;
                                    background-size: contain;
                                    background-repeat: no-repeat;
                                    border-radius: 3px;
                                    height: 80px;
                                    margin-top: -40px;
                                    position: absolute;
                                    top: 50%;
                                    left: 0;
                                    text-align: center;
                                    text-decoration: none;
                                    z-index: 1;
                                    width: 112px;
                                }
                                .btn-file{
                                    position: absolute;
                                    top: 0;
                                    opacity: 0;
                                    z-index: -1;
                                }
                                .content-text{
                                    box-sizing: border-box;
                                    cursor: pointer;
                                    padding: 8px 8px 8px 128px;
                                    min-height: 80px;
                                    margin: 0;
                                    z-index: 0;
                                    font-size: 14px;
                                    color: #5e6c84;
                                    p{
                                        font-weight: 700;
                                        word-wrap: break-word;
                                        padding-bottom: 5px;
                                        span{
                                            font-size: 10px;
                                        }
                                    }
                                    .btn{
                                        text-decoration: underline;
                                    }
                                    .btn:hover{
                                        color: #172b4d;
                                    }

                                }
                            }
                            .box-file:hover{
                                background-color: #ebecef;
                            }
                        }
                        .box-children-work{
                            border-radius: 3px;
                            .work-chidren{
                                clear: both;
                                padding-left: 40px;
                                position: relative;
                                border-radius: 3px;
                                margin-bottom: 7px;
                                .check-box{
                                    position: absolute;
                                    border-radius: 2px;
                                    height: 16px;
                                    width: 16px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    top: 3px;
                                    left: 0;
                                    margin: 6px;
                                    text-align: center;
                                    cursor: pointer;
                                }
                                .content-checkbox{
                                    display: flex;
                                    flex-direction: row;
                                    padding: 6px 0;
                                    width: 100%;
                                    display: inline-flex;
                                    font-size: 14px;
                                    line-height: 20px;
                                }
                                .description-edit{
                                    padding-bottom: 5px;
                                    textarea{
                                        overflow: hidden;
                                        overflow-wrap: break-word;
                                        resize: none;
                                        // height: 108px;
                                        min-height: 60px;
                                        background: #fff;
                                        box-shadow: none;
                                        width: 100%;
                                        padding: 8px 12px;
                                        line-height: 20px;
                                        border-radius: 3px;
                                        box-sizing: border-box;
                                        outline: none;
                                        border: none;
                                    }
                                    textarea:focus{
                                        background-color: #fff;
                                        box-shadow: inset 0 0 0 2px #0079bf;
                                    }
                                    .edit-controls{
                                        margin: 8px 0px;
                                        button {
                                            padding: 10px 15px;
                                            background-color: #5aac44;
                                            box-shadow: none;
                                            border: none;
                                            color: #fff;
                                            margin: 0 4px 0 0;
                                            font-size: 14px;
                                        }
                                        .icon {
                                            display: inline-block;
                                            font-family: trellicons;
                                            font-style: normal;
                                            font-weight: 400;
                                            text-align: center;
                                            text-decoration: none;
                                            vertical-align: bottom;
                                            height: 32px;
                                            line-height: 32px;
                                            width: 32px;
                                            color: #42526e;
                                            font-size: 20px;
                                            cursor: pointer;
                                        }
                                    }
                                    .description-content{
                                        cursor: pointer;
                                    }
                                }
                                .btn-children{
                                    visibility: hidden;
                                    position: absolute;
                                    right: 0;
                                    top: 3px;
                                    margin: 6px;
                                    span{
                                        margin-right: 10px;
                                        cursor: pointer;
                                    }
                                }
                                
                            }
                            .work-chidren:hover{
                                background-color: #ebecef;
                            }
                            .work-chidren:hover .btn-children {
                                visibility: visible;
                            }
                        }
                        
                        .u-gutter{
                            margin-left: 40px;
                            .editable{
                                .description-edit{
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
                                .default-discription{
                                    background-color: rgba(9,30,66,.04);
                                    box-shadow: none;
                                    border: none;
                                    border-radius: 3px;
                                    display: block;
                                    min-height: 40px;
                                    padding: 8px 12px;
                                    text-decoration: none;
                                    color: #172b4d;
                                }
                                .default-discription:hover{
                                    background-color: #e2e4e9;
                                }
                                .edit-controls{
                                    margin-top: 8px;
                                    button {
                                        background-color: #5aac44;
                                        box-shadow: none;
                                        border: none;
                                        color: #fff;
                                        margin: 0 4px 0 0;
                                        font-size: 14px;
                                    }
                                    .icon {
                                        display: inline-block;
                                        font-family: trellicons;
                                        font-style: normal;
                                        font-weight: 400;
                                        text-align: center;
                                        text-decoration: none;
                                        vertical-align: bottom;
                                        height: 32px;
                                        line-height: 32px;
                                        width: 32px;
                                        color: #42526e;
                                        font-size: 24px;
                                        cursor: pointer;
                                    }
                                }
                                .description-content{
                                    cursor: pointer;
                                    button{
                                        color: #172b4d;
                                        font-size: 14px;
                                        line-height: 20px;
                                        font-weight: 400;
                                        box-sizing: border-box;
                                        display: inline-flex;
                                        align-items: center;
                                        justify-content: center;
                                        border-radius: 3px;
                                        cursor: pointer;
                                        padding: 6px 12px;
                                        text-decoration: none;
                                        background-color: rgba(9, 30, 66, 0.04);
                                        box-shadow: none;
                                        border: none;
                                    }
                                    button:hover{
                                        background-color: #e2e4e9;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .window-sidebar{
                float: right;
                padding: 0 16px 8px 8px;
                width: 168px;
                overflow: hidden;
                z-index: 10;
                .window-module{
                    clear: both;
                    margin-bottom: 24px;
                    position: relative;
                    h3{
                        @include h3;
                    }
                    .slide-tag{
                        background-color: rgba(9,30,66,.04);
                        box-shadow: none;
                        border: none;
                        border-radius: 3px;
                        box-sizing: border-box;
                        cursor: pointer;
                        display: block;
                        height: 32px;
                        margin-top: 8px;
                        max-width: 300px;
                        overflow: hidden;
                        padding: 6px 12px;
                        position: relative;
                        text-decoration: none;
                        text-overflow: ellipsis;
                        user-select: none;
                        white-space: nowrap;
                        .icon{
                            height: 20px;
                            font-size: 16px;
                            line-height: 20px;
                            width: 20px;
                            color: #42526e;
                            margin: 0 6px 0 -6px;
                        }
                        span{
                            font-size: 14px;
                        }
                    }
                    .slide-tag:hover {
                        background-color:#e2e4e9
                    }
                    .deline {
                        position: relative;
                        .input-deline {
                            position: absolute;
                            top: -10px;
                            left: 0;
                            z-index: 1000;
                            opacity: 0;
                        }
                    }
                    .box-file{
                        position: relative;
                        .input-file{
                            position: absolute;
                            top: 5px;
                            left: 0;
                            z-index: 1000;
                            opacity: 0;
                        }

                    }
                }
            }
        }
    }
}
</style>