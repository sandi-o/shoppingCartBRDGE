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
							New
							</v-btn>
						</template>
						<item-form
							v-if="dialog"
							:dialog.sync = "dialog"
							:index.sync = "itemIndex"
							@refresh = "initialize"
						></item-form>                                       		
					</v-dialog>
                    <remove-form 
                        v-if = 'removeDialog' 
                        :dialog.sync = "removeDialog" 
                        :index.sync = "itemIndex" 
                        @reload="initialize"
                    ></remove-form>	    
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
							color="secondary"
							v-on="on"
							class="ml-1 mr-1"
							@click="edit(item)"
						>
							mdi-pencil
						</v-icon>
					</template>
					<span>Edit</span>
        		</v-tooltip>               
				<v-tooltip bottom>
            		<template v-slot:activator="{ on }">
						<v-icon
							v-on="on"
							color="red"
							class="ml-1 mr-1"
							@click="remove(item)"
						>
							mdi-delete
						</v-icon>
					</template>
					<span>Delete</span>
        		</v-tooltip>                                
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
        <view-form v-if = "viewDialog" :dialog.sync="viewDialog" :index.sync="itemIndex"></view-form>
    </v-container>
</template>

<script>
import ItemForm from '@/js/components/items/form';
import RemoveForm from '@/js/components/items/delete';
import ViewForm from '@/js/components/items/view';

export default {
    components: {
		ItemForm,
        RemoveForm,
        ViewForm
	},
    data () {
		return {
			dialog: false,
			itemIndex: -1,
            removeDialog: false,
			search: '',			
			tableLoader: false,	
            viewDialog: false,
		}
    },
    computed: {
        items() {
          	return this.$store.getters['item/items'];
        },
        headers () {
           	return [
				{ text: 'Id', value: 'id',},
                { text: 'Name', value: 'name'},
				{ text: 'Code', value: 'code'},
                { text: 'Description', value: 'description' },
                { text: 'Amount', value: 'amount' },                
				{ text: 'Actions', value: 'actions', sortable: false, filterable: false },
			];
		},        	
    },
    created() {
		this.initialize();
	},
	methods: {	
		edit(rowItem) {
			this.itemIndex = this.items.indexOf(rowItem)
        	this.$store.commit('item/SET_ITEM',rowItem);
        	this.dialog = true
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
		remove(rowItem) {
			this.itemIndex = this.items.indexOf(rowItem)
        	this.$store.commit('item/SET_ITEM',rowItem);
        	this.removeDialog = true
        },
        view(rowItem) {
			this.itemIndex = this.items.indexOf(rowItem)
        	this.$store.commit('item/SET_ITEM',rowItem);
        	this.viewDialog = true
        }, 
    }
}
</script>

<style>

</style>