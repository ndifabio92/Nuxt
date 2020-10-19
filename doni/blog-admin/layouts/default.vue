<template>
  <v-app>
    <v-main>
      <MainNav/>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
  import MainNav from '@/components/MainNav'
  export default {
    components: {
      MainNav
    }
  }
</script>

<style>

</style>