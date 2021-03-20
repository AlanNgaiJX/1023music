<template>
  <div class="control">
    <slot name="control_more"></slot>
    <slot name="control_process"></slot>
    <slot name="control_player"></slot>
  </div>
</template>

<script>
export default {
  name: "Playback_control",
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.control
  position fixed
  bottom 0
  // background-color black
  width 100%
  z-index 999
</style>