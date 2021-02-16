<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
	<v-card>        
        <v-card-title>{{ formTitle }}</v-card-title>
        <v-card-text>
            <v-container>
                <v-row>                                                     
                     <v-col cols="12">
                        <v-text-field
                            v-model="item.name"
                            label="*Name"
                            :rules="rules.name"
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="item.code"
                            label="*Code"
                            required
                            :rules="rules.code"
                            outlined
                        ></v-text-field>
                    </v-col>    
                    <v-col cols="12">
                        <v-textarea 
                            auto-grow 
                            clearable 
                            v-model="item.description" 
                            outlined
                            no-resize
                            label="Description"
                        >
                        </v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="item.amount"
                            label="Amount"
                            type="number"
                            outlined
                        ></v-text-field>
                    </v-col>                   
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn color="error" text @click="close" :disabled="disabled">
                <v-icon right dark>mdi-cancel</v-icon>            
                Cancel
            </v-btn>
            <v-spacer></v-spacer>           
            <v-btn color="primary" outlined @click="save" :loading="loading">
                <v-icon right dark>mdi-content-save</v-icon>
                Save
            </v-btn>
        </v-card-actions>
       
    </v-card>
    </v-form>
</template>

<script>
export default {
    props: {
        dialog: Boolean,
        index : {type: Number, default: -1}        
    },
    data: () => ({      
        disabled: false,
        item: {},        
        loading: false,
        rules: {            
            code: [v => !!v || 'Code is required',],
            name: [v => !!v || 'Name is required',],
        },
        valid: true
    }),
    created() {
        this.item = Object.assign({},  this.$store.getters['item/item']);        
    },
    computed: {             
        formTitle () {
            return this.item.id == undefined ? "New Item" : "Edit Item (#"+this.item.id+")";
        },     
    }, 
    methods: {
        close() {
            if(this.item.id != undefined) {
                this.item = {}
                this.$store.commit('item/CLEAR_ITEM');
                this.$emit('update:index', -1)    
            }

            this.$emit('refresh')
            this.$emit('update:dialog', false)
        },
        save() {
            if(this.$refs.form.validate()) {
                let action = 'item/create'
                if(this.item.id != undefined) {
                    action = 'item/update'
                    this.item._method = 'PATCH'
                }

                this.disabled = true;
                this.loading = true;                
                this.$store.dispatch(action,this.item)
                .then(response => {
                    this.close();
                    this.loading = false;
                    this.disabled = false;
                    setTimeout(() => {                
                        this.$store.commit('snackbar/CLEAR_SNACKBAR');
                    },4000);                  
                })
                .catch(err => {
                    this.loading = false;
                    this.disabled = false;
                     setTimeout(() => {                
                        this.$store.commit('snackbar/CLEAR_SNACKBAR');
                    },4000); 
                });
            }
        }

    }
}
</script>