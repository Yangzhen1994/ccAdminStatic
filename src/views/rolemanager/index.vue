<template>
<div>roleindex
  <router-link :to="{ path: '/rolemanager/roleindex/roleappmanager' }">1manager</router-link>
  <router-link :to="{ path: '/rolemanager/roleindex/roleusermanager' }">2manager</router-link>
</div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>

</style>
