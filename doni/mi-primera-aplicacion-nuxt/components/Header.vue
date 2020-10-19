<template>
    <div class="wrapper">
        <nav>
            <ul>
                <nuxt-link to="/">Inicio</nuxt-link>
                <nuxt-link to="/about">Acerca de mi</nuxt-link>
                <nuxt-link to="/posts">Blogs</nuxt-link>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'header'
    }
</script>