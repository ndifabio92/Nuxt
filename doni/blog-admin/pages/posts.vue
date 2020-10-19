<template>
    <v-container>
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-data-table :headers="headers" :items="posts">
                        <template v-slot:top>
                            <v-toolbar flat dark color="primary">
                                <v-toolbar-title>
                                    Mis Publicaciones
                                </v-toolbar-title>
                                <v-divider inset vertical class="mx-4"/>
                                <v-spacer />
                                <v-dialog v-model="dialog" max-width="600px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="secondary" v-on="on">
                                            Crear
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-card-title>
                                                        <span class="headline">{{ formTitle }}</span>
                                                    </v-card-title>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                        <v-container>
                                            <v-form v-model="valid">
                                                <v-row>
                                                    <v-col cols=12>
                                                        <v-text-field label="Titulo" outlined v-model="editedItem.title" :rules="titleRules" :counter="25" required></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols=12>
                                                        <v-textarea outlined label="Cuerpo" v-model="editedItem.body"
                                                            :rules="bodyRules" required
                                                        ></v-textarea>
                                                    </v-col>
                                                </v-row>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn @click="save" color="primary" :disabled="!valid">Guardar</v-btn>
                                                    <v-btn @click="close" color="error">Cancelar</v-btn>
                                                </v-card-actions>
                                            </v-form>
                                        </v-container>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                title="Editar"
                                @click="editItem(item)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteItem(item)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Posts',
        data() {
            return {
                dialog: false,
                editedIndex: -1,
                headers: [
                    { text: 'Id', align: 'center', sortable: true, value: 'id' },
                    { text: 'Titulo', align: 'center', sortable: true, value: 'title' },
                    { text: 'Body', align: 'center', sortable: true, value: 'body' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                posts: [],
                editedItem: {
                    id: '', title: '', body: ''
                },
                defaultItem: {
                    id: '', title: '', body: ''
                },
                valid: false,
                titleRules: [
                    v => !!v || 'Titulo es requerido',
                    v => v.length <= 25 || 'Titulo no puede ser mayor de 25 caracteres'
                ],
                bodyRules: [
                    v => !!v || 'Body es requerido',
                ],
                breadcrumbs:[
                    {
                        text: 'Dashboard',
                        disabled: false,
                        href: '/',
                    },
                ]
            }
        },
        watch: {
            dialog (val) {
                console.log(val);
                val || this.close();
            }
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Crear Publicacion' : 'Editar Publicacion'
            }
        },
        methods: {
            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                });
            },
            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.posts[this.editedIndex], this.editedItem);
                } else {
                    this.editedItem.id = '4'
                    this.posts.push(this.editedItem);
                }
                this.close();
            },
            editItem (item) {
                console.log(item);
                this.editedIndex = this.posts.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },

            deleteItem (item) {
                const index = this.posts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.posts.splice(index, 1)
            },
        },
        created() {
            this.posts = [
                { id: '1', title: 'Post1', body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque a doloribus laudantium dicta iste dolor suscipit facilis maxime nemo explicabo hic magni quaerat ex pariatur est, deserunt aliquid quasi. Saepe!', aling: 'start' },
                { id: '2', title: 'Post2', body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque a doloribus laudantium dicta iste dolor suscipit facilis maxime nemo explicabo hic magni quaerat ex pariatur est, deserunt aliquid quasi. Saepe!' },
                { id: '3', title: 'Post3', body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque a doloribus laudantium dicta iste dolor suscipit facilis maxime nemo explicabo hic magni quaerat ex pariatur est, deserunt aliquid quasi. Saepe!' }
            ]
        }
    }
</script>

<style>

</style>
