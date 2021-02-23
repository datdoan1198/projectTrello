<template>
    <div class="main">
        <div class="window-wrapper">
            <span class="close-main-modal el-icon-close" @click="closeModalMain()"></span>
            <div class="card-detail-window">
                <div class="window-header">
                    <span class="el-icon-postcard"></span>
                    <div class="window-title">
                        <textarea v-model="card.description"></textarea>
                        <div class="window-header-inline-content">
                            <p>trong danh sách <a href="">sds</a></p>
                        </div>
                    </div>
                </div>
                <div class="window-main">
                    <div class="card-detail-data">
                        <div class="card-detail-labels">
                            <h3>NHÃN</h3>
                            <div class="card-detail-labels-list">
                                <span class="card-label" 
                                v-for="(label, indexLabel) in card.labels" :key="indexLabel" 
                                :style="{ backgroundColor: label.color }">
                                    {{ label.name }}
                                </span>
                                <!-- <span class="card-label">demo nhan</span>
                                <span class="card-label">demo nhan</span>
                                <span class="card-label">demo nhan</span> -->
                                <span class="card-detail-item-add-button el-icon-plus"></span>
                            </div>
                        </div>
                        <div class="card-detail-due-date">
                            <h3>NGÀY HẾT HẠN</h3>
                            <div class="card-detail-due-date-badge">
                                <span class="card-detail-badge-due-date-complete-box"></span>
                                <!-- <button class="card-detail-badge-due-date-button">
                                    <span>chủ nhật tuần tới lúc 18:07</span>
                                    <span class="icon el-icon-arrow-down"></span>  
                                </button> -->
                                <el-date-picker
                                    v-model="value1"
                                    type="datetime"
                                    placeholder="Select date and time">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="u-clearfix"></div>
                    </div>
                    <div class="fill-card-detail-desc">
                        <div class="window-module">
                            <div class="window-module-title">
                                <span class="el-icon-s-unfold"></span>
                                <h3>Mô tả</h3>
                                <div class="editable">
                                    Chỉnh sửa
                                </div>
                            </div>
                            <div class="u-gutter">
                                <div class="editable">
                                    <div class="description-content">
                                        <p>dfsdsd</p>
                                    </div>
                                    <div class="description-edit" style="display:none">
                                        <textarea>sdsd</textarea>
                                        <div class="edit-controls">
                                            <el-button type="success">Lưu</el-button>
                                            <span class="icon el-icon-close"></span>
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
                            <span class="slide-tag">
                                <span class="icon el-icon-notebook-2"></span>
                                <span class="button-link">Việc cần làm</span>
                            </span>
                            <span class="slide-tag">
                                <span class="icon el-icon-discount"></span>
                                <span class="button-link">Chỉnh sửa nhãn</span>
                            </span>
                            <span class="slide-tag">
                                <span class="icon el-icon-alarm-clock"></span>
                                <span class="button-link">Ngày bắt đầu</span>
                            </span>
                            <span class="slide-tag">
                                <span class="icon el-icon-alarm-clock"></span>
                                <span class="button-link">Ngày hết hạn</span>
                            </span>
                            <span class="slide-tag">
                                <span class="icon el-icon-picture"></span>
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
export default {
name:"sdsd",
computed: {
    ...mapState('home', [
        'card'
    ])
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
        value1: '2021-02-23 18:30:00',
        value2: '',
        value3: ''
    }
},
methods: {
    ...mapMutations('home', [
        'closeModalMain'
    ]),
    close (){
        this.closeModalMain();
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
    overflow: hidden;
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
                        @include floatLeft;
                        h3 {
                            @include h3;
                        }
                        .card-detail-due-date-badge{
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            margin: 0 8px 8px 0;
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
                }
            }
        }
    }
}
</style>