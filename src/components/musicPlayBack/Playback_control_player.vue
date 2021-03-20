<template>
  <ul class="control-player">
    <li class="icon player-icon" @click="clickSwitchMode(currentMode)">
      <span v-show="currentMode === 0">&#xe71d;</span>
      <span v-show="currentMode === 1">&#xe64a;</span>
      <span v-show="currentMode === 2">&#xe611;</span>
    </li>
    <li class="icon player-icon" @click="clickBackSong">&#xe78a;</li>
    <li class="icon player-icon btn-play-pause" @click="switchPause">
      <span v-show="player_isPause">&#xe62c;</span>
      <span v-show="!player_isPause">&#xe61e;</span>
    </li>
    <li class="icon player-icon" @click="clickNextSong">&#xe7a5;</li>
    <li class="icon player-icon">&#xe77a;</li>
  </ul>
</template>

<script>
export default {
  name: "Playback_control_player",
  props: {
    isPause: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentMode: 0
    };
  },
  computed: {
    player_isPause: {
      // 双向绑定
      get() {
        return this.isPause;
      },
      set(val) {
        this.$emit("pauseChange", val);
      }
    }
  },
  methods: {
    switchPause() {
      // 点击暂停播放
      this.player_isPause = !this.player_isPause;
    },
    clickSwitchMode(mode) {
      // <点击模式>
      // 0歌单循环，1随机，2单曲循环
      mode += 1;
      if (mode > 2) {
        mode = 0;
      }
      this.currentMode = mode;
      this.$emit("modeChange", this.currentMode);
    },
    clickNextSong() {
      // <点击下一首>
      this.$emit('switchSong',false, true);
    },
    clickBackSong(){
      // <点击上一首>
      this.$emit('switchSong',false, false);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.control-player
  display flex
  justify-content space-between
  line-height 1.1rem
  padding 0.2rem 0.2rem

  .player-icon
    font-size 0.6rem

  .btn-play-pause
    font-size 0.8rem
</style>