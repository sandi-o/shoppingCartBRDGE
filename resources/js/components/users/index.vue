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
			:items="users"
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
                    <v-toolbar-title>Customers / Users</v-toolbar-title>
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
        <view-customer v-if = "dialog" :dialog.sync="dialog" :index.sync="userIndex" :customer.sync="customer"></view-customer>
    </v-container>
</template>

<script>
import ViewCustomer from '@/js/components/users/view';
export default {
    components: {
        ViewCustomer
    },
    data () {
		return {
			dialog: false,
			userIndex: -1,
			search: '',			
			tableLoader: false,
            customer: {}	
		}
    },
    computed: {
        users() {
          	return this.$store.getters['user/users'];
        },
        headers () {
           	return [
				{ text: 'Id', value: 'id',},
                { text: 'Name', value: 'name'},
				{ text: 'E-mail', value: 'email' },                
				{ text: 'Actions', value: 'actions', sortable: false, filterable: false },
			];
		},
    },
    created() {
		this.initialize();
	},
	methods: {
		view(rowItem) {
			this.userIndex = this.users.indexOf(rowItem)
        	this.customer = rowItem;
        	this.dialog = true
		},
		initialize() {
			this.tableLoader = true
			this.$store.dispatch('user/fetchUsers')
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