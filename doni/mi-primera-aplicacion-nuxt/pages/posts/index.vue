<template>
    <div>
        <label for="">Introduzca el id de la publicacion</label>
        <input type="text" v-model="postId">
        <button @click="loadPost">Ir</button>
    </div>
</template>

<script>
    export default {
        name: "index",
        data () {
            return {
                postId: ''
            }
        },
        methods: {
            loadPost() {
                this.$router.push(`/posts/${this.postId}`)
            }
        }
    }
</script>