<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    getSessionStorage() {
      this.$store.dispatch("getSessionStorage");
    }
  },
  created() {
    this.getSessionStorage();
  }
};
</script>

<style lang="stylus">
body{
  width 100%
  overflow hidden
}  
</style>
