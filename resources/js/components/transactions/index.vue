<template>
 <v-container fluid>
        <v-text-field
			v-model="search"
			append-icon="mdi-magnify"
			label="Search"
			single-line
			hide-details
			clearable
			outlined
		></v-text-field>
        <v-data-table
			:headers="headers"
			:items="transactions"
			:items-per-page="10"
			class="elevation-1"
			sort-by="id"
			sort-desc
			:loading="tableLoader"
			loading-text="Fetching Data, Please wait..."
			:search="search"
        >
            <template v-slot:top>
				<v-toolbar flat>
                    <v-toolbar-title>Transactions</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>    
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-btn 
								v-on="on"
								class="mb-2 ml-1" 
								color="info"
								fab 
								dark 
								small
								@click="initialize" 
								:loading="tableLoader"
							><v-icon dark>mdi-refresh</v-icon>
							</v-btn> 
						</template>
						<span>Refresh</span>
					</v-tooltip>
				</v-toolbar>
			</template>
			<template v-slot:item.actions="{ item }">
				<v-tooltip bottom>
            		<template v-slot:activator="{ on }">
						<v-icon						
							color="accent"
							v-on="on"
							class="ml-1 mr-1"
							@click="view(item)"
						>
							mdi-eye
						</v-icon>
					</template>
					<span>View</span>
        		</v-tooltip>               
			</template>
        </v-data-table>	
        <view-transaction-details v-if = "dialog" :dialog.sync="dialog" :index.sync="trxIndex" ></view-transaction-details>
    </v-container>
</template>

<script>
import ViewTransactionDetails from '@/js/components/transactions/view';
export default {
    components: {
        ViewTransactionDetails
    },
    data () {
		return {
			dialog: false,
			trxIndex: -1,
			search: '',			
			tableLoader: false,
		}
    },
    computed: {
        transactions() {
          	return this.$store.getters['transaction/transactions'];
        },
        headers () {
           	return [
				{ text: 'Id', value: 'id',},
                { text: 'Total Amount', value: 'total_amount'},       
				{ text: 'Actions', value: 'actions', sortable: false, filterable: false },
			];
		},
    },
    created() {
		this.initialize();
	},
	methods: {
		view(rowItem) {
			this.trxIndex = this.transactions.indexOf(rowItem)
            this.$store.commit('transaction/SET_TRANSACTION',rowItem);
        	this.dialog = true
		},
		initialize() {
			this.tableLoader = true
			this.$store.dispatch('transaction/fetchData')
				.then(response => {
					this.tableLoader = false
				})
				.catch(err => {
					this.tableLoader = false
				}) 
		},	
	}
}
</script>