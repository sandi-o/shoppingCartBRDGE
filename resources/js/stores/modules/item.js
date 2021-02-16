const state = {   
    status: '',
    items: [],
    item: {}
};

const getters = {
    status: state => state.status,
    items: state => state.items,
    item: state => state.item,
};

const actions = {
    fetchData: ({commit}) => {        
        return new Promise((resolve, reject) => {
            commit('ITEM_STATUS','fetching data');
            axios.get('/api/items')
            .then(response => {
                commit('ITEM_STATUS', 'success');
                commit('SET_ITEMS', response.data);
                resolve(response.data);
            })
            .catch(err => {
                commit('ITEM_STATUS', 'error');
                reject(err);
            })
        });
    },
    create: ({commit,dispatch}, payload) => {
        commit('ITEM_STATUS','storing data');
        return new Promise((resolve, reject) => {
            axios.post('/api/items', payload)
            .then(response => {
                commit('ITEM_STATUS', 'stored');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                resolve(response.data);
            })
            .catch(err => {
                commit('ITEM_STATUS', 'error storing');
                commit('snackbar/SET_SNACKBAR',{text: 'Error creating item!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(err);
            })
        });
    },
    remove: ({commit}, payload) => {
        commit('ITEM_STATUS','removing data');
        return new Promise((resolve, reject) => {
            axios.delete('/api/items/'+payload.id)
            .then(response => {
                commit('ITEM_STATUS', 'removed');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                resolve(response.data);
            })
            .catch(err => {
                commit('ITEM_STATUS', 'error removing');
                commit('snackbar/SET_SNACKBAR',{text: 'Error removing item!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(err);
            })
        });
    },
    update: ({commit,dispatch}, payload) => {
        commit('ITEM_STATUS','updating data');
        return new Promise((resolve, reject) => {
            axios.post('/api/items/'+payload.id, payload)
            .then(response => {
                commit('ITEM_STATUS', 'updated');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                resolve(response.data);
            })
            .catch(err => {
                commit('ITEM_STATUS', 'error updating');
                commit('snackbar/SET_SNACKBAR',{text: 'Error updating item!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(err);
            })
        });
    },
};

const mutations = {
    ITEM_STATUS: (state, status) => {
        state.status = status;
    },
    SET_ITEMS: (state, data) => {
        state.items= data
    },
    CLEAR_items: (state) => {
        state.items= []
    },
    SET_ITEM: (state, item) => {
        state.item = item
    },
    CLEAR_ITEM: (state) => {
        state.item = {}
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations,
}