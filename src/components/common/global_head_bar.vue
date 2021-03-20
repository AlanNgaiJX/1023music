<template>
  <div class="head-bar" :style="{'background-color' : BGC}">
    <a href="#" class="icon btn-back" @click="goBack" v-if="canBack">&#xe60a;</a>
    <p class="head-title" v-text="headTitle"></p>
    <a class="icon btn-player" @click.prevent="toPlayBack" v-if="canPlay">&#xe62a;</a>
  </div>
</template>

<script>
export default {
  name: "global_head_bar",
  props: {
    headTitle: {
      type: String,
      default: "head-bar"
    },
    canBack: {
      type: Boolean,
      default: false
    },
    canPlay: {
      type: Boolean,
      default: true
    },
    BGC:{
      type: String,
      default:'#cccccc'
    }
  },
  data() {
    return {};
  },
  methods: {
    toPlayBack() {
      this.$router.push({
        name: "MusicPlayback",
        params: {
          needSet: false,
          isSame: true
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.icon
  color white

.head-bar
  position fixed
  width 100%
  line-height 0.84rem
  color white
  z-index 942
  background-color #cccccc

  .btn-back
    font-size 0.32rem
    display inline-block
    padding-left 0.2rem
    position absolute
    z-index 8

  .btn-player
    font-size 0.32rem
    display inline-block
    padding-right 0.2rem
    position absolute
    right 0
    top 0
    z-index 7

  .head-title
    z-index 7
    position relative
    text-align center
    line-height 0.84rem
    font-size 0.32rem

</style>