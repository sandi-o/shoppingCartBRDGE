<template>
    <v-dialog v-model="dialog" max-width="350" persistent scrollable>
        <v-card>
            <v-card-title>{{title}}</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <div class="caption">Name</div>
                            <div class="body-1">{{item.name}}</div>
                        </v-col>
                          <v-col cols="12">
                            <div class="caption">Code</div>
                            <div class="body-1">{{item.code}}</div>
                        </v-col>                      
                        <v-col cols="12">
                            <div class="caption">Description</div>
                            <div class="body-1">{{item.description}}</div>
                        </v-col>
                          <v-col cols="12">
                            <div class="caption">Amount</div>
                            <div class="body-1">{{item.amount}}</div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="error" text @click="close" :disabled="disabled">
                    <v-icon right dark>mdi-cancel</v-icon>            
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
        index : {type: Number, default: -1}
    },
    data: () => ({
        disabled: false,
        loading: false,
    }),
    computed: {
        item () {
            return this.$store.getters['item/item']
        },
        title() {
            return "View Item: " + this.item.id
        }
    },
    methods: {
        close() {
            this.$store.commit('item/CLEAR_ITEM');
            this.$emit('update:index', -1)    
            this.$emit('reload')
            this.$emit('update:dialog', false)
        },       
    }
}
</script>