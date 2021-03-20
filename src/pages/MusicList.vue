<template>
  <div class="wrapper" v-show="isShow">
    <div class="head-bar">
      <a class="icon btn-back" @click.prevent="goBack">&#xe60a;</a>
      <p class="head-title">歌单</p>
      <a class="icon btn-player" @click.prevent="toPlayBack">&#xe62a;</a>
    </div>

    <!-- 歌单的封面图banner -->
    <div class="head-wrapper" v-lazy:background-image="coverImgUrl">
      <div class="head-content">
        <div class="head-left">
          <span class="info">
            <span class="icon">&#xe60f;</span>
            {{ playCount }}
          </span>
          <img class="list-img" v-lazy="coverImgUrl" alt />
        </div>
        <div class="head-right">
          <p class="list-name">{{ name }}</p>
          <div class="owner">
            <img class="owner-avatar" v-lazy="avatarUrl" alt />
            <span class="owner-name">{{ nickname }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 歌单列表 -->
    <div class="play-list" v-show="isShow">
      <div class="list-count border-bottom">
        <div class="left">
          <span class="icon btn-play">&#xe62c;</span>
          <span class="count-title">播放全部</span>
          <span class="num">(共{{ trackCount }}首)</span>
        </div>
        <span class="count-collect">{{ subscribedCount }}人收藏</span>
      </div>
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
            <p class="album-info">{{ item.ar[0].name }} - {{ item.al.name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api/index.js'
export default {
  name: 'music-list',
  props: {
    query: {},
  },
  data() {
    return {
      isShow: false,
      name: '',
      coverImgUrl: '',
      subscribedCount: 0,
      playCount: 0,
      trackCount: 0,
      tracks: [],
      nickname: '',
      userId: '',
      avatarUrl: '',
    }
  },
  methods: {
    getMusicListById(id) {
      // loading...
      this.isShow = false
      const hideLoading = this.toast({})
      Api.getMusicList({ id }).then(
        (res) => {
          hideLoading()
          const data = res.data
          if (data.code === 200) {
            this.name = data.playlist.name
            this.coverImgUrl = data.playlist.coverImgUrl
            this.subscribedCount = data.playlist.subscribedCount
            this.playCount = data.playlist.playCount
            this.trackCount = data.playlist.trackCount
            this.tracks = data.playlist.tracks
            this.userId = data.playlist.creator.userId
            this.nickname = data.playlist.creator.nickname
            this.avatarUrl = data.playlist.creator.avatarUrl
            this.isShow = true
          }
        }
      ).catch(err=>{
        hideLoading();
      })
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
        name: 'MusicPlayback',
        params: {
          isSame: isSame,
        },
      })
    },
    toPlayBack() {
      this.$router.push({
        name: 'MusicPlayback',
        params: {
          superPath: true,
        },
      })
    },
    goBack() {
      this.$router.go(-1)
    },
  },
  beforeRouteEnter(to, from, next) {
    const toFullPath = to.fullPath
    const lastFullPath = to.meta.lastFullPath
    const isUseCache = toFullPath === lastFullPath

    // 不使用缓存，刷新数据，首次进入页面也会触发这里
    if (!isUseCache) {
      to.meta.lastFullPath = toFullPath
      next((vm) => {
        vm.getMusicListById(vm.query.id || '000000001')
      })
    } else {
      next()
    }
  },
}
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

  &:after
    content ''
    background-color black
    opacity 0.2
    position absolute
    top 0
    height 0.84rem
    width 100%
    z-index 4

  .btn-back
    font-size 0.32rem
    display inline-block
    padding-left 0.2rem
    position absolute
    left 0
    top 0
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

.head-wrapper
  font-family $font
  background-image url('http://p2.music.126.net/6zqeepGrr52aXb7D06LXww==/18751071301411304.jpg')
  background-position center center
  background-repeat no-repeat
  width 100%
  box-sizing border-box
  z-index 2
  box-shadow 0 0 1rem 2rem white inset

  &:after
    content ''
    position absolute
    width 100%
    padding-bottom 70%
    filter blur(20px) contrast(50%) brightness(120%)
    z-index 3
    left 0
    top 0
    background inherit

  .head-content
    position relative
    z-index 4
    padding 20% 0 15% 0
    display flex
    justify-content center

    .head-left
      position relative
      width 40%
      padding-bottom 40%

      .info
        position absolute
        right 0
        text-align end
        z-index 3
        color white
        font-size 0.24rem
        padding 0.1rem

      .list-img
        position absolute
        width 100%

    .head-right
      width 45%
      margin-left 5%
      display flex
      flex-direction column
      justify-content center

      .list-name
        color white
        font-weight bold
        font-size 0.32rem

      .owner
        display flex
        margin-top 0.2rem

        .owner-avatar
          width 0.5rem
          height 0.5rem
          border-radius 50%
          margin 0 0.1rem
          background-color red

        .owner-name
          font-size 0.24rem
          color white
          line-height 0.5rem

.play-list
  position relative
  border-radius 0.2rem 0.2rem 0 0
  padding 0 0.2rem
  background-color white
  margin-top -0.5rem
  z-index 941

  .list-count
    color $fontColor_Default
    font-size 0.28rem
    height 0.8rem

    .left
      float left
      height 100%
      padding-top 0.1rem
      box-sizing border-box

      .num
        color $fontColor_Aside
        font-size 0.28rem
        position relative
        top -0.06rem
        vertical-align bottom

      .btn-play
        color $fontColor_Aside
        font-size 0.5rem
        vertical-align bottom
        position relative
        top 0.02rem

      .count-title
        font-size 0.32rem
        vertical-align bottom

    .count-collect
      float right
      font-size 0.28rem
      color $fontColor_Aside
      position relative
      top 0.28rem

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
