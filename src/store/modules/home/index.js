export default {
    namespaced: true,
    state: {
        data: [],
        isShowModalMain: 'none',
        card: [],
        isdeline:false,
        topLabel:'',
        leftLabel:'',
        showLabel: false,
        labels:[],
        topFile:'',
        leftFile:'',
        isShowModalFile:false,
        isEditFile:false,
        idFile: 0,
        idCard: 0,
        isCreateWork: true,
        idShowWork: false,
        idWork: 0,
        nameFile: '',
    },
    getters: {

    },
    mutations: {
        setList(state, data){
            state.data = data
        },
        setCard (state, data){
            state.card = data
        },
        setLabel(state, data){
            state.labels = data
        },
        addList(state, list) {
            state.data.push(list)
        },
        allLabel(state, label) {
            state.data.forEach((item, index) => {
                if (index === label.index) {
                    item.cards.push(label.data);
                }
            })
        },
        closeModalMain (state){
            state.isShowModalMain = 'none';
        },
        showModalMain (state){
            state.isShowModalMain = 'block';
        },
        getcar (state, datdId) {
            state.card = [];
            let list = state.data.find((list) => list.id == datdId.listId);
            let cart = list.cards.find((card) => card.id == datdId.cardId);
            state.card = cart;
        },
        updateTblLabel (state, data){
            state.leftLabel = data.left;
            state.showLabel = true;
        },
        closeLabel(state){
            state.showLabel = false;
        },
        pushLabel(state, data){
            let error = false;
            state.labels.forEach((label) => {
                if (label.color == data.color) {
                    error = true;
                }
            });
            if (!error) {
                state.labels.push(data) 
            }
        },
        updateSizeFile(state, data){
            state.topFile = data.top;
            state.leftFile = data.left;
            state.isShowModalFile = data.isShow;
            state.isEditFile = data.isEdit;
            state.idFile = data.idFile;
            state.idCard = data.idCard;
            state.nameFile = data.nameFile;
        },
        createWork(state, data){
            state.topFile = data.top;
            state.leftFile = data.left;
            state.idShowWork = data.isShow;
            state.idCard = data.idCard;
        },
        closeModalFile(state){
            state.isShowModalFile = false;
            state.idShowWork = false;
            state.isCreateWork = true;
            state.isEditFile = true;
        },
        deleteWork(state, data){
            state.topFile = data.top;
            state.leftFile = data.left;
            state.idShowWork = data.isShow;
            state.idCard = data.idCard;
            state.isCreateWork = false
            state.idWork = data.idWork
        }
    },
}