<template>
  <div class="lyric">
    <img class="movebar" :style="{'transform': isPause? movebarDefault : movebarActive}" src="@/assets/MusicPlayback/img/play_movebar.png" alt />
    <div class="album-border">
      <div class="album-content" v-lazy:background-image="currentSongBg" :style="{'animation-play-state':isPause?'paused':'running'}"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: "Playback_lyric_bg",
  props: {
    isPause:{
      type: Boolean,
      default: true
    },
    picUrl:{
      type: String,
      default:""
    }
  },
  data() {
    return {
      // 留声机架子两个状态
      movebarDefault:'translateX(35%) rotate(-37deg)',
      movebarActive:'translateX(35%) rotate(0deg)'
    };
  },
  computed: {
    currentSongBg(){
      return this.picUrl;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'
@keyframes rotateImg {
  0%{
    transform rotate(0deg)
  }
  100%{
    transform rotate(360deg)
  }
}
.lyric
  position relative
  // background-color pink
  overflow hidden
  padding-top 22.4%

  .movebar
    position absolute
    z-index 996
    top -4%
    width 35%
    left 0
    right 0
    margin 0 auto
    transform-origin 15.4% 15.4%
    transition transform .5s
    // transform translateX(35%) rotate(0deg)

  .album-border
    position relative
    margin 0 auto
    left 0
    right 0
    width 90%
    padding-bottom 90%
    box-sizing border-box
    border 1px solid white
    border-radius 50%
    background-image url('~@/assets/MusicPlayback/img/play_albumBorder.png')
    background-size contain
    z-index 995

    .album-content
      animation rotateImg 6s infinite linear
      animation-play-state paused
      position absolute
      left 50%
      top 50%
      margin-top -31.25%
      margin-left -31.25%
      width 62.5%
      padding-bottom 62.5%
      border-radius 50%
      overflow hidden
      background-size contain
      background-color black
      transform-origin 50% 50%
</style>