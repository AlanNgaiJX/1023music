<template>
  <div class="tabBar">
    <a
      class="item"
      v-for="(item,index) in list"
      :key="index"
      :class="{active:item.active}"
      @click="beActive(index,item)"
    >
      <span class="icon">{{item.icon}}</span>
      <div class="title">{{item.text}}</div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    tabBarList:{
      type:Array,
      default:[]
    }
  },
  name: "tabBar",
  data() {
    return {
    };
  },
  computed:{
    list(){
      return this.tabBarList;
    }
  },
  methods: {
    beActive(index, item) {
      this.$router.push({
        path: item.routePath,
        name: item.routeName
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.icon
  font-size 0.5rem

.tabBar
  position fixed
  bottom 0
  left 0
  width 100%
  height 1.2rem
  box-sizing border-box
  display flex
  justify-content space-between
  background-color #f2f2f2
  z-index 999

.item
  font-size 0.28rem
  color black
  flex 1
  height 100%
  display flex
  flex-direction column
  justify-content center
  align-items center

  .icon{
    font-size .35rem
  }

  .title{
    margin-top .2rem
    font-size .26rem
  }

.active
  color red
</style>
