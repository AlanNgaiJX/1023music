<template>
  <div>
    <head_bar :headTitle="headTitle" :canBack="true" :canPlay="true"></head_bar>
    <div class="play-list">
      <ul class="lists">
        <li
          class="list-item"
          v-for="(item, index) in tracks"
          :key="item.id"
          @click="toSong(item, tracks, index)"
        >
          <div class="index-num">{{ index + 1 }}</div>
          <div class="item-content border-bottom">
            <p class="song-name">{{ item.name }}</p>
            <p class="album-info">
              {{ item.artists[0].name }} - {{ item.album.name }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api/index.js';
import head_bar from '@/components/common/global_head_bar'
export default {
  components: {
    head_bar,
  },
  props: {
    query: {},
  },
  data() {
    return {
      tracks: [],
    }
  },
  computed: {
    keyword() {
      return this.query.keyword || ''
    },
    headTitle() {
      if (this.keyword) {
        return '搜索：' + this.keyword
      } else {
        return '搜索'
      }
    },
  },
  methods: {
    getList() {
      Api.searchSong({ keyword: this.keyword }).then(
        (res) => {
          if (res.data.code === 200) {
            this.tracks = res.data.result.songs
          }
        }
      )
    },
    toSong(currentSong, currentTracks, songIndex) {
      // <点击歌曲跳转到播放器>
      // 判断是否同一首歌，isSame是播放器重置歌曲的判断条件之一
      let isSame
      if (this.$store.state.currentSong) {
        isSame = this.$store.state.currentSong.id === currentSong.id
      } else {
        isSame = false
      }
      // 更新vuex 当前播放列表currentTracks、当前歌曲currentSong、当前列表指针songIndex
      this.$store.dispatch('update_currentTracks', { currentTracks })
      this.$store.dispatch('update_currentSong', { currentSong })
      this.$store.dispatch('update_songIndex', { songIndex })

      this.$router.push({
        path: '/music-playback',
        name: 'MusicPlayback',
        params: {
          isSame: isSame,
        },
      })
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$emit('showTabBar', false)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$emit('showTabBar', true)
    next()
  },
  mounted() {
    this.getList()
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.play-list
  padding-top .84rem
  .lists
    background-color white

    .list-item
      display flex

      .index-num
        font-size 0.36rem
        color $fontColor_Aside
        line-height 1rem
        width 1rem
        text-align center

      .item-content
        flex-grow 1
        padding 0.2rem 0
        box-sizing border-box

        .song-name
          width 5rem
          font-size 0.32rem
          color $fontColor_Default
          $single-line-overflow()

        .album-info
          width 5rem
          font-size 0.24rem
          color $fontColor_Aside
          $single-line-overflow
          margin-top 0.1rem
          $single-line-overflow()
</style>
