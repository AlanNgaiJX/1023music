<template>
  <div class="head">
    <a class="icon btn-back" @click.prevent="goBack" v-if="canBack">&#xe60a;</a>
    <p class="song_title">
      <span v-text="headSongName"></span>
    </p>
    <p class="song_artist">
      <span v-text="headSongArtist"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    canBack: {
      type: Boolean,
      default: true
    },
    songName: {
      type: String,
      default: "不详"
    },
    songArtists: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  computed: {
    headSongName() {
      // 为空则不详
      return this.songName === '' ? '不详': this.songName;
    },
    headSongArtist() {
      // 为空则群星
      if (this.songArtists.length > 0) {
        let arr = [];
        this.songArtists.forEach(item => {
          arr.push(item.name);
        });
        return arr.join(" & ");
      }else {
        return "群星";
      }
    }
  },
  methods: {
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

.head
  line-height 0.84rem
  color white
  padding 0.1rem 0 0.05rem 0

  .btn-back
    font-size 0.32rem
    display inline-block
    padding-left 0.2rem
    position absolute

  p
    text-align center

    span
      display block
      margin 0 auto
      width 70%
      $single-line-overflow()

  .song_title
    font-size 0.32rem
    line-height 0.52rem

  .song_artist
    font-size 0.24rem
    line-height 0.32rem
</style>