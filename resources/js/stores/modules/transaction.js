const state = {   
    status: '',
    transactions: [],
    transaction: {}
};

const getters = {
    status: state => state.status,
    transactions: state => state.transactions,
    transaction: state => state.transaction,
};

const actions = {
    fetchData: ({commit}) => {        
        return new Promise((resolve, reject) => {
            commit('TRANSACTION_STATUS','fetching data');
            axios.get('/api/transactions')
            .then(response => {
                commit('TRANSACTION_STATUS', 'success');
                commit('SET_TRANSACTIONS', response.data);
                resolve(response.data);
            })
            .catch(err => {
                commit('TRANSACTION_STATUS', 'error');
                reject(err);
            })
        });
    },
    create: ({commit,dispatch}, payload) => {
        commit('TRANSACTION_STATUS','storing data');
        return new Promise((resolve, reject) => {
            axios.post('/api/transactions', payload)
            .then(response => {
                commit('TRANSACTION_STATUS', 'stored');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                resolve(response.data);
            })
            .catch(err => {
                commit('TRANSACTION_STATUS', 'error storing');
                commit('snackbar/SET_SNACKBAR',{text: 'Error creating transaction!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(err);
            })
        });
    },
};

const mutations = {
    TRANSACTION_STATUS: (state, status) => {
        state.status = status;
    },
    SET_TRANSACTIONS: (state, data) => {
        state.transactions= data
    },
    CLEAR_TRANSACTIONS: (state) => {
        state.transactions= []
    },
    SET_TRANSACTION: (state, transaction) => {
        state.transaction = transaction
    },
    CLEAR_TRANSACTION: (state) => {
        state.transaction = {}
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations,
}