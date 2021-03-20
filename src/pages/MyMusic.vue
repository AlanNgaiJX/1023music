<template>
  <div class="wrapper">
    <p class="title">我创建的歌单({{ playlistCount }})</p>
    <ul class="collect-list">
      <li
        class="item"
        v-for="(item, index) in playlist"
        :key="index"
        @click="toMusicList(item.id)"
      >
        <div class="img-container">
          <img v-lazy="item.coverImgUrl" alt />
        </div>
        <div class="item-info border-bottom">
          <p class="name" v-text="item.name"></p>
          <p class="detail">
            <span class="count">{{ item.trackCount }}首</span>，
            <span class="creater">by {{ item.creator.nickname }}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import * as Api from '@/api/index.js'
import { mapGetters } from 'vuex'
export default {
  name: 'MyMusic',
  data() {
    return {
      playlist: [],
      playlistCount: 0,
    }
  },
  computed: {
    ...mapGetters({ userId: 'userId' }),
  },
  methods: {
    getMyMusic() {
      const hideLoading = this.toast({})
      if (this.userId === '') {
        hideLoading()
        this.toast({ txt: '你未登录', time: 1000, mask: false, type: 'err' })
        return
      }
      Api.getMyMusic({
        userId: this.userId,
      })
        .then((res) => {
          hideLoading()
          if (res.data.code === 200) {
            this.playlist = res.data.playlist
            this.playlistCount = this.playlist.length
          }
        })
        .catch((err) => {
          hideLoading()
        })
    },
    toMusicList(id) {
      this.$router.push({
        path: '/music-list',
        name: 'MusicList',
        query: {
          id: id,
        },
      })
    },
  },
  beforeRouteEnter(to, from, next) {
    const useCache = to.meta.useCache
    if (!useCache) {
      next((vm) => {
        vm.getMyMusic()
      })
    } else {
      to.meta.useCache = false
      next()
    }
  },
  beforeRouteLeave(to, from, next) {
    // 仅去往这些路径时才设置页面缓存
    const useCacheOnly = from.meta.useCacheOnly
    from.meta.useCache = useCacheOnly.some((item) => item === to.path)
    next()
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.wrapper
  padding-bottom 2rem

  .title
    background-color #eeeeee
    font-size 0.32rem
    padding-left 0.2rem
    line-height 0.6rem

  .collect-list
    .item
      margin 0.1rem
      width 100%
      display flex

      .img-container
        position relative
        width 16%
        padding-bottom 16%
        border-radius 0.1rem
        overflow hidden

        img
          position absolute
          width 100%
          height 100%

      .item-info
        display flex
        flex-direction column
        justify-content center
        width 75%
        padding-left 0.2rem

        .name
          font-size 0.36rem
          line-height 0.6rem
          $single-line-overflow()

        .detail
          color $fontColor_Aside
          line-height 0.5rem
          $single-line-overflow()
</style>
