<template>
    <v-data-table :headers="headers" :items="tasks" sort-by="calories" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat dark>
                <v-toolbar-title>Tareas</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nueva Tarea</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-form @submit.prevent="save">
                            <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="editedItem.description" label="Descripcion"></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="editedItem.status" label="Estado"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-menu
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="editedItem.start"
                                            label="Picker without buttons"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="editedItem.start" @input="menu = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="editedItem.end"
                                            label="Picker without buttons"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="editedItem.end" @input="menu2 = false"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
                        </v-card-actions>
                        </v-form>
                        
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
    </v-data-table>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        async fetch(context) {
            await context.store.dispatch('tasks/loadTasks');
        },
        data: () => ({
            dialog: false,
            menu: false,
            menu2: false,
            headers: [
                { text: 'Nombre', value: 'name' },
                { text: 'Descripcion', value: 'description' },
                { text: 'Estado', value: 'status' },
                { text: 'Fecha Inicio', value: 'start' },
                { text: 'Fecha Fin', value: 'end' },
                { text: 'Acciones', value: 'actions', sortable: false },
            ],
            //tasks: [],
            editedIndex: -1,
            editedItem: {
                id: '',
                name: '',
                description: '',
                status: '',
                start: new Date().toISOString().substr(0, 10),
                end: new Date().toISOString().substr(0, 10),
            },
            defaultItem: {
                id: '',
                name: '',
                description: '',
                status: '',
                start: new Date().toISOString().substr(0, 10),
                end: new Date().toISOString().substr(0, 10),
            },
        }),

        // created () {
        //     this.$store.dispatch('tasks/loadTasks');
        // },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nueva Tarea' : 'Editar Tarea'
            },
            ...mapGetters({
                tasks: 'tasks/getTasks'
            }),
            // tasks() {
            //     return this.$store.state.tasks.tasks;
            // }
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        methods: {

            editItem (item) {
                console.log(item);
                this.editedIndex = this.tasks.indexOf(item)
                this.$store.commit('tasks/edit', item)

                const newTask = this.$store.state.tasks.edit;
                this.editedItem = Object.assign({}, newTask)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.tasks.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.tasks.splice(index, 1)
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },

            async save () {
                if (this.editedIndex > -1) {
                    await this.$store.dispatch('tasks/updateTask', this.editedItem);
                } else {
                    await this.$store.dispatch('tasks/saveTasks', this.editedItem);
                }
                this.close();
            },
        },
    }
</script>