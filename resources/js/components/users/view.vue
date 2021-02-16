<template>
    <v-dialog v-model="dialog" max-width="400" persistent>
        <v-card>
            <v-card-title>{{title}}</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <div class="caption">Name</div>
                            <div class="body-2">{{customer.name}}</div>
                        </v-col>

                        <v-col cols="12">
                            <div class="caption">E-mail</div>
                            <div class="body-2">{{customer.email}}</div>
                        </v-col>                                
                    </v-row>
                </v-container>
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
        customer: {type: Object, default: function () { return { name: '', email: '' }}}
    },
    data () {
		return {
           
        }
    },
    computed: {            
        title () {
            return 'View Customer'
        }
    },
    methods: {
        close() {           
            this.$emit('update:index', -1)    
            this.$emit('update:dialog', false)
        },    
    }
}
</script>