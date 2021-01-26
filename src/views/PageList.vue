<template>
    <div class="pageList">
        <div class="a">
            <div class="list" v-for="(item,index) in data" :key="index">
                <div class="tag">
                    <div class="tagHeader">
                        header
                    </div>
                    <div class="tagMain">
                        <div class="content">
                            Lorem ipsum dolor sit amet.sdsdsd
                        </div>
                        <div class="content">
                            Lorem ipsum dolor sit amet.sdsdsd
                        </div>
                        <div class="content">
                            Lorem ipsum dolor sit amet.sdsdsd
                        </div>
                        <div class="content">
                            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum laboriosam in beatae fuga, consectetur fugit ea, voluptates, corrupti tempore hic quos nesciunt accusamus deserunt iusto. Tempora saepe reprehenderit nihil aut.
                        </div>
                        <div class="content">
                            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum laboriosam in beatae fuga, consectetur fugit ea, voluptates, corrupti tempore hic quos nesciunt accusamus deserunt iusto. Tempora saepe reprehenderit nihil aut.
                        </div>
                        <div class="content">
                            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum laboriosam in beatae fuga, consectetur fugit ea, voluptates, corrupti tempore hic quos nesciunt accusamus deserunt iusto. Tempora saepe reprehenderit nihil aut.
                        </div>
                    </div>
                    <div class="tagFooder">
                        foode
                    </div>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
export default {
    name: "pageList",
    data () {
        return {
            data: [1,2,3,4,5,6,7]
        }
    }

}
</script>

<style lang="scss">
.pageList {
    position: relative;
    max-width: 100vw;
    max-height: 80vh;
    flex-grow: 1;
    .a {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 8px;
        padding-bottom: 8px;
        overflow-x: scroll;
        overflow-y: hidden;
        .list {
            max-width: 20vw;
            min-width: 20vw;
            max-height:89vh;
            background-color: salmon;
            margin-left: 8px;
            border-radius: 3px;
            .tag {
                width: 100%;
                background-color: #ebecf0;
                max-height: 89vh;
                .tagHeader {
                    padding: 10px 8px;
                    padding-right: 36px;
                }
                .tagMain {
                    margin: 0p 4px;
                    padding: 0px 4px;
                    max-height: 77vh;
                    overflow: auto;
                    .content {
                        margin-bottom: 8px;
                        padding: 6px 8px 2px;
                        background-color: #fff;
                        border-radius: 3px;
                        box-shadow: 0 1px 0 rgba(9,30,66,.25);
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
                }
            }
        }
    }
    .a::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    .a::-webkit-scrollbar-track {
        background: #000000bf; 
    }
    .a::-webkit-scrollbar-thumb {
        background: #6c7e8b;
        border-radius: 8px;
    }
    
}
</style>