<template>
    <div id="app" v-loading="loading">
      <!--<div class="loading_area" ref="loadingArea">loading..</div>-->
      <router-view></router-view>
    </div>
</template>
<script>
  export default{
    name: 'App',
    data() {
      return {
        loading: true
      }
    },
    beforeCreate() {

    },
    created() {

    },
    mounted() {
      setTimeout(() => {
        this.loading = false
      }, 200)

      /* console.log(this.$refs.loadingArea)*/
      // this.$refs.loadingArea.style.display = 'none'
    },
    destroyed() {

    }
  }
</script>
<style scoped>
  .loading_area{
    width: 100%;
    height: 100%;
  }
</style>
