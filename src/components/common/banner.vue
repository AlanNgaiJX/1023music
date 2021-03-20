<template>
  <div class="wrapper">
    <div class="content">
      <cube-slide ref="slide" :data="bannerList" :auto-play="true" class="cube">
        <cube-slide-item v-for="(item, index) in bannerList" :key="index">
          <a>
            <img :src="item.pic" />
          </a>
        </cube-slide-item>
      </cube-slide>      
    </div>
  </div>
</template>

<script>
export default {
  name: "banner",
  props: {
    bannerList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
.wrapper >>> .cube-slide-dots
  span
    height 3px

  span.active
    background-color red

.wrapper >>> .cube-slide-item
  a
    position relative
    width 100%
    padding-bottom 38.88%

    img
      position absolute
      width 100%
.wrapper
  position relative
  width 100%
  padding-bottom 38.88%
  height 0
</style>