<template>
 <v-dialog v-model="dialog" max-width="700" persistent scrollable>
        <v-card>
            <v-card-title>{{title}}</v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="cartItems"
                    :items-per-page="100"
                    class="elevation-1"
                    sort-by="id"
                    sort-desc
                    :loading="tableLoader"
                    loading-text="Loading Data, Please wait..."
                >
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Items</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            ITEM COUNT: {{finalQty}} 
                            <v-divider class="mx-4" inset vertical></v-divider>
                            TOTAL AMOUNT: {{finalAmount}}                   
                        </v-toolbar>
                    </template>
                </v-data-table>	
            </v-card-text>
            <v-card-actions>
                <v-btn color="error" text @click="close" :disabled="disabled">
                    <v-icon right dark>mdi-cancel</v-icon>            
                    Close
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" outlined @click="save" :loading="loading">
                    <v-icon right dark>mdi-cash</v-icon>
                Pay
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog: Boolean,
        finalAmount: Number,
        cartItems: {type: Array,  default: function () { return [] }}
    },
    data: () => ({      
        disabled: false,  
        loading: false,
        tableLoader: false,
        valid: true
    }),
    computed: {
        user() {
            return this.$store.getters['user/profile']
        },
        title () {
            return 'Checkout'
        },
        finalQty () {
            return this.cartItems.length;
        },
        headers () {
           	return [
                { text: 'Code', value: 'code'},
                { text: 'Name', value: 'name'},				
                { text: 'Description', value: 'description' },
                { text: 'Amount', value: 'amount' },
			];
		},
    },
    created() {
    },
    methods: {
        close() {
            this.$emit('update:dialog', false)
        },
        save() {
            if(this.finalQty > 0) {
                this.disabled = true;
                this.loading = true;                
                this.$store.dispatch('transaction/create',{ 'user_id': this.user.id,'total_amount':this.finalAmount,'transaction_items': JSON.stringify(this.cartItems)})
                .then(response => {
                    this.close();
                    this.loading = false;
                    this.disabled = false;
                    setTimeout(() => {                
                        this.$store.commit('snackbar/CLEAR_SNACKBAR');
                    },4000);
                    this.$emit('empty')                  
                })
                .catch(err => {
                    this.loading = false;
                    this.disabled = false;
                        setTimeout(() => {                
                        this.$store.commit('snackbar/CLEAR_SNACKBAR');
                    },4000); 
                });
            } else {
                this.$store.commit('snackbar/SET_SNACKBAR',{text: 'There are no Items in the Cart!', visible: true, color: 'error', timeout: 5000});
                setTimeout(() => { this.$store.commit('snackbar/CLEAR_SNACKBAR');},4000); 
            }           
        }
    }

}
</script>

<style>

</style>