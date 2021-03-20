<template>
  <div class="wrapper">
    <!-- 头部搜索 -->
    <div class="head-bar-search">
      <!-- <span class="icon btn-home" v-show="!searchBoardShow">&#xe63b;</span> -->
      <div :class="['search',searchBoardShow? 'search-acive':'']" @click="showSearchBoard">
        <input
          class="placehold input"
          placeholder="输入关键字搜索单曲"
          type="text"
          v-model="inputText"
          @keyup.enter="search($event)"
        />
      </div>
      <span class="btn-cancle" v-show="searchBoardShow" @click="cancleSearch">取消</span>
      <span class="icon btn-playback" @click="toPlayBack" v-show="!searchBoardShow">&#xe62a;</span>
    </div>
    <!-- 搜索中的结果 -->
    <div class="searchBoard" v-show="searchBoardShow">
      <ul class="serachResList">
        <li class="searchItem searchWhat border-bottom">
          <span class="icon">&#xe60c;</span>
          搜索 "{{inputText}}"
        </li>
        <li class="searchItem border-bottom" v-for="(item, index) in searchSuggest" :key="index" @click="search($event,item.keyword)">
          <span class="icon">&#xe60c; {{item.keyword}}</span>
        </li>
      </ul>
    </div>
    <!-- 横向滑动菜单 -->
    <scrollOptions :optionsList="optionsList"></scrollOptions>
    <!-- 路由盒子 -->
    <router-view></router-view>
  </div>
</template>

<script>
import scrollOptions from "@/components/foundMusic/scrollOptionsBar";
import utl from "@/utl/index.js";
export default {
  components: {
    scrollOptions
  },
  data() {
    return {
      searchBoardShow: false,
      inputText: "",
      searchSuggest: [],
      optionsList: [
        {
          id: "001",
          text: "个性推荐",
          active: true,
          path: "/found-music/",
          name: "FoundMusicSuggest"
        },
        // {
        //   id: "002",
        //   text: "热门歌单",
        //   active: false,
        //   path: "/found-music/hot",
        //   name: "FoundMusicHot"
        // },
        // {
        //   id: "003",
        //   text: "最新歌单",
        //   active: false,
        //   path: "/found-music/new",
        //   name: "FoundMusicNew"
        // },
        // {
        //   id: "004",
        //   text: "主播电台",
        //   active: false,
        //   path: "/found-music/radio",
        //   name: "FoundMusicRadio"
        // },
        // {
        //   id: "005",
        //   text: "热门歌手",
        //   active: false,
        //   path: "/found-music/hot-singger",
        //   name: "FoundMusicHotSinger"
        // },
        // {
        //   id: "006",
        //   text: "排行榜",
        //   active: false,
        //   path: "/found-music/rank",
        //   name: "FoundMusicRank"
        // },
        // {
        //   id: "007",
        //   text: "最新mv",
        //   active: false,
        //   path: "/found-music/newmv",
        //   name: "FoundMusicNewMV"
        // },
        // {
        //   id: "008",
        //   text: "热门mv",
        //   active: false,
        //   path: "/found-music/hotmv",
        //   name: "FoundMusicHotMV"
        // },
        // {
        //   id: "009",
        //   text: "mv排行",
        //   active: false,
        //   path: "/found-music/mvRank",
        //   name: "FoundMusicMvRank"
        // }
      ]
    };
  },
  methods: {
    toPlayBack() {
      this.$router.push({
        name: "MusicPlayback",
        params: {
          needSet: false,
          isSame: true
        }
      });
    },
    showSearchBoard() {
      this.searchBoardShow = true;
    },
    cancleSearch() {
      this.searchBoardShow = false;
      this.inputText = "";
    },
    search(e,word) {
      let keyword = this.inputText;
      if (word !== undefined) {
        keyword = word;
      }
      
      this.$router.push({
        path: '/music-search',
        name: 'MusicSearch',
        query:{
          keyword:keyword
        }
      });
    },
    handleInputChange: utl.throttle(function() {
      this.$axios(`api/search/suggest?keywords=${this.inputText}&type=mobile`).then(
        res => {
          if (res.data.code === 200) {
            this.searchSuggest = res.data.result.allMatch;
            console.log(this.searchSuggest);
          }
        },
        err => {
          console.log(err);
        }
      );
    }, 1500)
  },
  watch: {
    inputText(newVal) {
      if (newVal !== "") {
        // 经过节流
        this.handleInputChange();
      }else{
        this.searchSuggest = [];
      }
    }
  },
  beforeDestroy() {
    this.handleInputChange = null;
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.wrapper
  .head-bar-search
    display flex
    justify-content center
    width 100%
    line-height 0.84rem
    height 0.84rem

    .search-acive
      width 0.1rem
      background-color #f2f2f2

    .search
      box-sizing border-box
      flex-grow 1
      padding 0.17rem 0.6rem
      transition all 2s

      .placehold
        text-align center
        display block
        font-size 0.28rem
        line-height 0.5rem
        border-radius 0.3rem
        background-color #f2f2f2
        color #767676

      .input
        width 100%
        // background-color red

    .btn-home, .btn-playback
      font-size 0.55rem
      width 0.84rem
      text-align center

    .btn-playback
      font-size 0.4rem

    .btn-cancle
      font-size 0.24rem
      background-color #f2f2f2
      padding 0 0.2rem

  .searchBoard
    position absolute
    top 0.84rem
    height 100%
    width 100%
    // padding-bottom 1.2rem
    background-color white
    z-index 999

    .serachResList
      .searchWhat
        color #4087c5

      .searchItem
        line-height 0.6rem
        font-size 0.28rem
        padding 0 0.1rem

        .icon
          margin-right 0.1rem
</style>
