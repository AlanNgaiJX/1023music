<template>
  <div class="page">
    <banner :bannerList="bannerList" class="banner"></banner>
    <div class="list-board">
      <p class="board-title">
        个性推荐
        <span class="icon">&#xe612;</span>
      </p>
      <div class="board-content">
        <ul class="board-list">
          <li
            class="board-item"
            v-for="(item, index) in personalizedList"
            :key="index"
            @click="toMusicList(item.id)"
          >
            <div class="item-img-container">
              <span class="listener-count">
                <span class="icon">&#xe60f;</span>
                <span class="num">{{ item.playCount }}</span>
              </span>
              <img v-lazy="item.picUrl" alt />
            </div>
            <p class="item-title" v-text="item.name"></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api/index.js'
import banner from '@/components/common/banner'
export default {
  name: 'FoundMusicSuggest',
  components: {
    banner,
  },
  data() {
    return {
      bannerList: [],
      personalizedList: [],
    }
  },
  methods: {
    changePage(current) {
      console.log('当前轮播图序号为:' + current)
    },
    clickHandler(item, index) {
      console.log(item, index)
    },
    getBannerList() {
      Api.getBanner().then((res) => {
        if (res.data.code === 200) {
          this.bannerList = res.data.banners
        }
      })
    },
    getPersonalizedList() {
      Api.getPersonalizedList().then((res) => {
        if (res.data.code === 200) {
          this.personalizedList = res.data.result
        }
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

  mounted() {
    this.getBannerList()
    this.getPersonalizedList()
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.banner
  margin-bottom 0.2rem

.page
  padding-bottom 2rem

  .list-board
    .board-title
      font-size 0.32rem
      font-weight bold
      line-height 0.6rem
      padding-left 0.2rem

    .board-content
      box-sizing border-box
      padding .3rem
      .board-list
        display grid;
        grid-template-columns 1fr 1fr 1fr;
        grid-column-gap .3rem
        grid-row-gap .5rem

        // display flex
        // flex-wrap wrap
        // justify-content flex-start

        .board-item
          width 100%
          margin 0 0.66%
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);


          .item-img-container
            position relative
            width 100%
            padding-bottom 100%

            .listener-count
              position absolute
              right 0
              top 0
              font-size 0.24rem
              line-height 0.3rem
              padding-top 0.05rem
              padding-right 0.05rem
              color white
              z-index 2

            img
              position absolute
              width 100%

          .item-title
            margin-top 5%
            border-top-color yellow
            font-size 0.24rem
            width 100%
            line-height 0.3rem
            $double-line-overflow()
            margin-top .2rem
            padding 0 .1rem
            box-sizing border-box
            line-height .4rem
</style>
