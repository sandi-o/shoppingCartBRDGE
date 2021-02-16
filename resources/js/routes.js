import Vue from 'vue';
import VueRouter from 'vue-router';
import {store} from '@/js/stores/store';

Vue.use(VueRouter);


import Carts from '@/js/components/carts/index';
import Item from '@/js/components/items/index';
import Transaction from '@/js/components/transactions/index';
import User from '@/js/components/users/index';


const router = new VueRouter({
    mode: 'history',
    routes: [        
        {
            path: '/items',
            name: 'items',
            component: Item,
        }, 
        {
            path: '/customers',
            name: 'users',
            component: User,
        },
        {
            path: '/carts',
            name: 'carts',
            component: Carts,
        },
        {
            path: '/transactions',
            name: 'transactions',
            component: Transaction,
        },      
    ]
});

router.beforeEach((to, from, next) => {     
    console.log(to)  
    // if (to.name !== 'login') {
    //     if(store.getters['user/isAuthenticated']) {
    //         next()    
    //     } else{
    //         next({ name: 'login' })
    //     }
    // } else {
        next()
    // }
})


export default router;