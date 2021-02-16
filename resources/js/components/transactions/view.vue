<template>
    <v-dialog v-model="dialog" max-width="700" persistent>
        <v-card>
            <v-card-title>{{title}}</v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="transcationItems"
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
                            TOTAL AMOUNT: {{transcation.total_amount}}                   
                        </v-toolbar>
                    </template>
                </v-data-table>	
            </v-card-text>
            <v-card-actions>
                <v-btn color="error" text @click="close">
                    <v-icon right>mdi-close-box</v-icon>        
                    Close 
                </v-btn>
                <v-spacer></v-spacer>                        
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {    
    props: {
        dialog: Boolean,
        index: {type:Number, default: -1},
    },
    data () {
		return {
            tableLoader:false,
        }
    },
    computed: {            
        title () {
            return 'View Transaction: '+ this.transcation.id
        },
        transcation() {
            return this.$store.getters['transaction/transaction'];
        },
        transcationItems() {
            return this.$store.getters['transaction/transaction'].transaction_items;
        },
        finalQty () {
            return this.transcationItems.length;
        },
        headers () {
           	return [
                { text: 'Code', value: 'item.code'},
                { text: 'Name', value: 'item.name'},				
                { text: 'Description', value: 'item.description' },
                { text: 'Amount', value: 'amount' },
			];
		},
    },
    methods: {
        close() {           
            this.$store.commit('transaction/CLEAR_TRANSACTION');
            this.$emit('update:index', -1)    
            this.$emit('update:dialog', false)               
        },    
    }
}
</script>