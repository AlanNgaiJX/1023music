<template>
  <ul class="control-more">
    <li class="icon more-icon">&#xe630;</li>
    <li class="icon more-icon">&#xe659;</li>
    <li class="icon more-icon">&#xe650;</li>
    <li class="icon more-icon">&#xe612;</li>
  </ul>
</template>

<script>
export default {
  name: "control_more",
  props:{
  },
  data() {
    return {};
  },
  methods:{
  },
  mounted(){
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.control-more
  display flex
  justify-content space-between
  line-height 0.8rem
  padding 0.2rem 1rem

  .more-icon
    font-size 0.5rem
</style>