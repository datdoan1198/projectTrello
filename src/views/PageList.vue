<template>
    <div class="pageList">
        <div class="a">
            <div class="list" v-for="(list, index) in data" :key="index">
                <div class="tag">
                    <div class="list-header">
                        <h2 ref="text" @click="getInput(index)" class="tagHeader">
                            {{ list.title }}
                        </h2>
                        <textarea @keydown.enter="changeTitle(index)" ref="textarea" maxlength="512" class="list-textarea" style="overflow: hidden; word-wrap: break-word;height: 28px;" v-model="list.title"></textarea>
                    </div>
                    <div ref="tagMain" class="tagMain">
                        <div class="style-content" v-for="(card, indexCart) in list.cards" :key="indexCart">
                            <div ref="content" class="content" @click="showModalCart(list.id, card.id)">
                                <div class="list-card-labels">
                                    <div class="labels" v-for="(label, indexLabel) in card.labels" :key="indexLabel" >
                                        <span class="card-label" :style="{ backgroundColor: label.color }">
                                            <span class="label-text" >{{ label.name }}</span>
                                        </span>
                                    </div>
                                </div>
                                <span>
                                    {{ card.description }}
                                </span>
                                <div class="badges">
                                    sdsd
                                </div>
                            </div>
                            <div ref="editLabel" class="edit-label" @click="showModal(index, list.id, card.id)">
                                <i class="el-icon-edit"></i>
                            </div>
                        </div>
                        <div ref="showCreateLabel" class="createLabel" style="display: none">
                            <div class="">
                                <div class="content createLabel-text">
                                    <textarea ref="tileLabel" placeholder="Nhập tiêu đề cho thẻ này..."></textarea>
                                </div>
                                <div class="createLabel-button">
                                    <div class="buttonCreate">
                                        <el-button type="success" @click="addLabel(index)">Thêm Mới</el-button>
                                        <el-link icon="el-icon-close" @click="hiddenCreateLabel(index)"></el-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref="hiddenCreateLabel" class="tagFooder">
                        <div  @click="showCreateLabel(index)" style="display:block">
                            <i class="el-icon-plus"></i>
                            <span>Thêm thẻ khác</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="style-createList">
                <div class="createList">
                    <form action="">
                        <div v-if="show" @click="show = !show" class="placeholder">
                            <i class="el-icon-plus"></i>
                            <span>Thêm danh sách khác</span>
                        </div>
                        <input v-else type="text" ref="titlList" placeholder="Nhập tiêu đề danh sách...">
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
                        <textarea ref="cardQuick" v-model="card.description"></textarea>
                        <div class="badges">
                            <span>
                                <div class="badge" title="Thẻ chưa hết hạn.">
                                    <span class="badge-icon el-icon-alarm-clock"></span>
                                    <span class="badge-text">28 tháng 2</span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <el-button type="success">Lưu</el-button>
                <div class="card-editor">
                    <span class="card-editor-quick" @click="showModalCart(listId, cardId)">
                        <span class="el-icon-postcard"></span>
                        <span class="card-editor-text">Mở Thẻ</span>
                    </span>
                    <span class="card-editor-quick">
                        <span class="el-icon-discount"></span>
                        <span class="card-editor-text">Chỉnh sửa nhãn</span>
                    </span>
                    <span class="card-editor-quick">
                        <span class="el-icon-s-custom"></span>
                        <span class="card-editor-text">Thay đổi thành viên</span>
                    </span>
                    <span class="card-editor-quick">
                        <span class="el-icon-picture"></span>
                        <span class="card-editor-text">Thay đổi bìa</span>
                    </span>
                    <span class="card-editor-quick">
                        <span class="el-icon-right"></span>
                        <span class="card-editor-text">Di chuyển</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="sss" :style="{display:isShowModalMain}">
            <div class="window-overlay" >
                <Main />
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Main from '../components/modal/Main'
export default {
    name: "pageList",
    components: {
        Main
    },
    data () {
        return {
            show: true,
            showAddList: false,
            top:'',
            left: '',
            width:'',
            showQuickCard: 'none',
            listId: 0,
            cardId: 0,
        }
    },
    computed: {
        ...mapState('home', [
            'data',
            'isShowModalMain',
            'card'
        ])
    },
    methods: {
        ...mapMutations('home', [
            'addList',
            'allLabel',
            'showModalMain',
            'closeModalMain',
            'getcar'
        ]),
        getInput(index){
            this.$refs.text[index].style.display = 'none';
            this.$refs.textarea[index].style.display = 'block';
            this.$refs.textarea[index].focus();
        },
        changeTitle(index){
            this.$refs.text[index].style.display = 'block';
            this.$refs.textarea[index].style.display = 'none';
            this.$refs.textarea[index].blur();
        },
        showCreateLabel(index){
            this.$refs.showCreateLabel[index].style.display = 'block';
            this.$refs.hiddenCreateLabel[index].style.display = 'none';
            this.$refs.tagMain[index].scrollTop = this.$refs.tagMain[index].scrollHeight;
            this.$refs.tagMain[index].style.maxHeight = '83vh';
        },
        hiddenCreateLabel(index){
            this.$refs.showCreateLabel[index].style.display = 'none';
            this.$refs.hiddenCreateLabel[index].style.display = 'block';
            this.$refs.tagMain[index].style.maxHeight = '77vh';
        },
        addlist(){
            let title = this.$refs.titlList.value;
            if (title.length !== 0) {
                let data = {
                    title: title,
                    cards: [],
                }
                this.addList(data);
                this.$refs.titlList.value = '';
            } else {
                this.$message({
                    message: 'Tiêu đề không được để trống',
                    type: 'warning'
                });
            }
            
        },
        addLabel(index){
            let title = this.$refs.tileLabel[index].value;
            if (title.length !== 0) {
                let data = {
                    title: title,
                    description: title
                }
                this.allLabel({
                    data: data,
                    index: index
                });
                this.$refs.tileLabel[index].value = '';
            } else {
                this.$message({
                    message: 'Tên thẻ không được để trống',
                    type: 'warning'
                });
            }
        },
        showModal(index, listId, cardId){
            let left = this.$refs.content[index].getBoundingClientRect().left;
            let top = this.$refs.content[index].getBoundingClientRect().top;
            let width = this.$refs.content[index].clientWidth;
            this.top = top;
            this.left = left;
            this.width = width;
            this.showQuickCard = 'block';
            this.getcar({
                listId: listId,
                cardId: cardId,
            })
            this.$refs.cardQuick.focus();
            this.closeModalMain();
            this.listId = listId;
            this.cardId = cardId;
        },
        closeCardQuick(){
            this.showQuickCard = 'none';
        },
        showModalCart(listId, cardId){
            this.getcar({
                listId: listId,
                cardId: cardId,
            })
            this.showModalMain();
            this.showQuickCard = 'none';
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
                    padding-right: 36px;
                    position: relative;
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
        .style-createList {
            max-width: 20vw;
            min-width: 20vw;
            margin-left: 8px;
            .createList {
                min-height: 32px;
                height: auto;
                padding: 4px;
                border-radius: 3px;
                background-color: hsla(0,0%,100%,.24);
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
                    .badges {
                        float: left;
                        max-width: 100%;
                        margin-left: -2px;
                        .badge {
                            color: #5e6c84;
                            display: inline-block;
                            margin: 0 4px 4px 0;
                            max-width: 100%;
                            min-height: 20px;
                            overflow: hidden;
                            position: relative;
                            padding: 2px;
                            text-decoration: none;
                            text-overflow: ellipsis;
                            vertical-align: top;
                            .badge-icon {
                                color: #6b778c;
                                vertical-align: top;
                                height: 20px;
                                font-size: 16px;
                                line-height: 15px;
                                width: 20px;
                            }
                            .badge-text {
                                font-size: 12px;
                                padding: 0 4px 0 2px;
                                vertical-align: top;
                                white-space: nowrap;
                            }
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
}
</style>