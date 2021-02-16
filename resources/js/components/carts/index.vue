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
			:items="items"
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
                    <v-toolbar-title>Items</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    ITEM COUNT: {{quantity}} 
                    <v-divider class="mx-4" inset vertical></v-divider>
                    TOTAL AMOUNT: {{runningAmount}}
                    <v-spacer></v-spacer>
                                        <v-dialog
                        v-model="dialog"
                        max-width="700px"
						persistent
						scrollable
                    >
						<template v-slot:activator="{ on, attrs }">
							<v-btn							
								color="primary"
								dark
								class="mb-2"
								v-bind="attrs"
								v-on="on"
							>
                            <v-icon dark>mdi-cart-arrow-up</v-icon>
							Checkout
							</v-btn>
						</template>
						<checkout-form
							v-if="dialog"
							:dialog.sync = "dialog"
                            :finalAmount = "runningAmount"
							:cartItems = "itemBucket"
							@empty = "emptyCart"
						></checkout-form>                                       		
					</v-dialog>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-btn 
								v-on="on"
								class="mb-2 ml-1" 
								color="info"
								fab 
								dark 
								small
								@click="emptyCart" 
								:loading="tableLoader"
							><v-icon dark>mdi-cart-outline</v-icon>
							</v-btn> 
						</template>
						<span>Empty Cart</span>
					</v-tooltip>
				</v-toolbar>
			</template>
			<template v-slot:item.actions="{ item }">				                               
				<v-tooltip bottom>
            		<template v-slot:activator="{ on }">
						<v-icon						
							color="success"
							v-on="on"
							class="ml-1 mr-1"
							@click="add(item)"
						>
							mdi-cart-plus
						</v-icon>
					</template>
					<span>Add to Cart</span>
        		</v-tooltip>
                <v-tooltip bottom>
            		<template v-slot:activator="{ on }">
						<v-icon
							v-on="on"
							color="red"
							class="ml-1 mr-1"
							@click="minus(item)"
						>
							mdi-cart-minus
						</v-icon>
					</template>
					<span>Remove to Cart</span>
        		</v-tooltip> 
			</template>
        </v-data-table>	
    </v-container>
</template>

<script>
import CheckoutForm from '@/js/components/carts/checkout';

export default {
    components: {
		CheckoutForm,
	},
    data () {
		return {
			dialog: false,
			search: '',			
			tableLoader: false,
            runningAmount: 0,
            itemBucket: [],	
		}
    },
    computed: {
        items() {
          	return this.$store.getters['item/items'];
        },
        headers () {
           	return [
                { text: 'Code', value: 'code'},
                { text: 'Name', value: 'name'},				
                { text: 'Description', value: 'description' },
                { text: 'Amount', value: 'amount' },                
				{ text: 'Actions', value: 'actions', sortable: false, filterable: false },
			];
		},
        quantity () {
            return this.itemBucket.length;
        }
    },
    created() {
		this.initialize();
	},
	methods: {
        emptyCart() {
            this.itemBucket = []
            this.runningAmount = 0
        },		
		initialize() {
			this.tableLoader = true
			this.$store.dispatch('item/fetchData')
				.then(response => {
					this.tableLoader = false
				})
				.catch(err => {
					this.tableLoader = false
				}) 
		},	
		add(rowItem) {
            this.itemBucket.push(rowItem);
            this.runningAmount += parseFloat(rowItem.amount);
        },
        minus(rowItem) {           
            if(this.itemBucket.indexOf(rowItem) > -1) {
                this.itemBucket.splice(this.itemBucket.indexOf(rowItem),1);
                this.runningAmount -= parseFloat(rowItem.amount);
            }
        }, 
    }
}
</script>

<style>

</style>