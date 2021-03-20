<template>
  <div class="wrapper">
    <cube-scroll
      ref="scroll"
      :data="realItems"
      direction="horizontal"
      class="horizontal-scroll-list-wrap border-bottom"
    >
      <ul class="list-wrapper">
        <li
          v-for="(item,index) in realItems"
          :class="['list-item',item.active ? 'list-item-active':'' ]"
          :key="index"
          @click="beActive(index)"
        >{{ item.text }}</li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  name: "scrollOptionsBar",
  props: {
    optionsList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      realItems: []
    };
  },
  computed: {
    items: {
      get() {
        this.realItems = this.optionsList;
        return this.optionsList;
      }
    }
  },
  watch: {
    items() {}
  },
  methods: {
    beActive(index) {
        for (const item of this.realItems) {
            item.active = false;
        }
        this.realItems[index].active = true;
        this.$router.push({
            path:this.realItems[index].path,
            name:this.realItems[index].name
        }); 
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.wrapper >>> .cube-scroll-content
  display inline-block

.wrapper
  .horizontal-scroll-list-wrap
    width 100%
    background-color #fafafa

    .cube-scroll-content
      display inline-block

    .list-wrapper
      padding 0 0.2rem
      line-height 0.6rem
      white-space nowrap

    .list-item
      margin 0 0.2rem
      font-size 0.26rem
      display inline-block
      padding 0 0.2rem
      box-sizing border-box

    .list-item-active
      border-bottom 1px solid red
</style>