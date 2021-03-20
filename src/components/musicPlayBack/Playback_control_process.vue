<template>
  <div class="control-process">
    <span class="current-time timer">{{currentTime | formatTime}}</span>
    <div
      ref="processWrap"
      class="process-wrap"
      @touchstart="handleTouchStart($event)"
      @touchmove="handleTouchMove($event)"
      @touchend="handleTouchEnd()"
    >
      <div class="process-total">
        <div class="process-current" :style="{'width':(touch? currentPercent : timePercent)*100+'%'}">
          <span class="dot"></span>
        </div>
        <div class="process-buffed" :style="{'width':buffedPercent*100+'%'}"></div>
      </div>
    </div>
    <span class="total-time timer">{{duration | formatTime}}</span>
  </div>
</template>

<script>
export default {
  name: "Playback_control_process",
  props: {
    duration: {
      type: Number,
      default: 0
    },
    currentTime: {
      type: Number,
      default: 0
    },
    bufferedTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 当touch为真，取currentPercent变量作为进度条的显示变量，平时就是timePercent作为显示变量
      currentPercent: 0,
      touch: false
    };
  },
  computed: {
    timePercent() {
      // <使用duration和当前歌曲时间计算播放百分比>
      if (isNaN(this.duration) || this.duration === 0) {
        return 0;
      } else {
        return this.currentTime / this.duration;
      }
    },
    buffedPercent(){
      // <通过bufferedTime和duration计算缓存百分比>
      if (isNaN(this.duration) || this.duration === 0) {
        return 0;
      } else {
        return this.bufferedTime / this.duration;
      }      
    }
  },
  methods: {
    handleTouchStart(e) {
      this.touch = true;
      this.touchLogic(e);
    },
    handleTouchMove(e) {
      this.touchLogic(e);
    },
    handleTouchEnd() {
      this.$emit('currentTimeChange',this.currentPercent*this.duration);      
      this.touch = false;
    },
    touchLogic(e) {
      if (this.touch) {
        // 获取总长
        const totalWidth = this.$refs.processWrap.offsetWidth;
        // 获取与最左的偏移
        const leftMargin = this.$refs.processWrap.offsetLeft;
        // 获取与进度条的偏移
        const pageX = e.targetTouches[0].pageX;
        // 得到百分比，动态设置currentPercent
        let nowOffset;
        if (pageX < leftMargin) {
          nowOffset = 0;
        } else if (pageX > leftMargin + totalWidth) {
          nowOffset = totalWidth;
        } else {
          nowOffset = pageX - leftMargin;
        }
        this.currentPercent = nowOffset / totalWidth;
      }
    }
  },
  mounted() {
  },
  filters: {
    formatTime(val) {
      // 播放时间过滤器
      const time = Math.floor(val);
      let min, second;
      min = Math.floor(time / 60);
      second = time % 60;
      if (min < 10) {
        min = "0" + min;
      }
      if (second < 10) {
        second = "0" + second;
      }
      return min + ":" + second;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.control-process
  display flex
  align-items center
  line-height 0.84rem

  .timer
    display block
    margin 0 0.2rem
    font-size 0.24rem

  .current-time
    padding-right 0.1rem

  .process-wrap
    box-sizing border-box
    position relative
    flex-grow 1
    height 0.64rem
    padding 0.3rem 0

    .process-total
      position relative
      height 0.02rem
      background-color white
      .process-buffed
        position absolute
        padding 0.02rem 0
        top 0
        background-color #b3b3b3
        z-index 1
      .process-current
        position relative
        width 50%
        padding 0.02rem 0
        background-color red
        z-index 2
        .dot
          display block
          position absolute
          top 0
          right 0
          margin-left -0.125rem
          margin-top -0.125rem
          width 0.1rem
          height 0.1rem
          border 0.075rem solid white
          border-radius 50%
          background-color red
</style>