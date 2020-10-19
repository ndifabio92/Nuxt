<template>
    <div>
        <v-app-bar color="deep-purple accent-4" dark app flat clipped-left fixed>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Page title</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-menu left bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                        <v-list-item-title>Option {{ n }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">Application</v-list-item-title>
                    <v-list-item-subtitle>subtext</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

                
            <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.link" color="primary">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                drawer: null,
                items: [
                    { title: "Dashboard", icon: "mdi-view-dashboard", link: '/' },
                    { title: "Photos", icon: "mdi-image", link: '/posts'},
                    { title: "About", icon: "mdi-help-box"},
                ],
                right: null,
            };
        }
    };
</script>

<style>
</style>