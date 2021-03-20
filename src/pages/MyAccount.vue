<template>
  <div class="wrapper">
    <head_bar :headTitle="'账号'"></head_bar>
    <div class="userInfo">
      <div class="name-panel border-bottom">
        <div class="avatar-container">
          <img class="avatar" :src="avatarUrl" alt />
        </div>
        <span class="nick-name" v-text="nickname"></span>
      </div>
      <ul class="info-panel">
        <li class="info-item border-right">
          <span class="info-title">动态</span>
          <span class="info-content" v-text="eventCount"></span>
        </li>
        <li class="info-item border-right">
          <span class="info-title">关注</span>
          <span class="info-content" v-text="follows"></span>
        </li>
        <li class="info-item border-right">
          <span class="info-title">粉丝</span>
          <span class="info-content" v-text="followeds"></span>
        </li>
        <li class="info-item">
          <span class="info-title">我的资料</span>
        </li>
      </ul>
    </div>
    <div class="options-list">
      <a class="logout-btn border-bottom" @click="logout">退出登录</a>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api/index.js';
import head_bar from "@/components/common/global_head_bar";
import { mapState } from "vuex";
export default {
  name: "MyAccount",
  components: {
    head_bar
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({ profile: "profile" }),
    avatarUrl() {
      return (
        this.profile.avatarUrl ||
        "http://p1.music.126.net/KUqobszfrGUd5PLGZ5lzgQ==/109951163913071395.jpg"
      );
    },
    nickname() {
      return this.profile.nickname || "unknow";
    },
    eventCount() {
      return this.profile.eventCount || "unknow";
    },
    follows() {
      return this.profile.follows || "unknow";
    },
    followeds() {
      return this.profile.followeds || "unknow";
    },
    account() {
      return this.profile.userId || "";
    }
  },
  methods: {
    logout() {
      const hideLoding = this.toast({});
      Api.logout().then(
        res => {
          hideLoding();
          if (res.data.code === 200) {
            // 退出登录：成功
            const account = this.account

            this.$store.dispatch("update_logout");
            this.$router.replace({
              path: "/",
              name: "login"
            });
          }
          // 退出登录：失败
          this.toast({ txt: "退出失败", mask: false, time: 1000, type: "err" });
        },
        err => {
          hideLoding();
        }
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.wrapper
  background-color white

  .userInfo
    color black
    padding-top 0.84rem
    border-bottom 0.2rem solid #eeeeee

    .name-panel
      display flex
      align-items center
      padding 0.3rem

      .avatar-container
        position relative
        width 16.5%
        padding-bottom 16.5%
        margin-right 0.3rem

        .avatar
          position absolute
          width 100%
          height 100%
          border-radius 50%

      .nick-name
        font-size 0.36rem
        font-weight bold

  .info-panel
    display flex

    .info-item
      display flex
      flex-direction column
      justify-content center
      align-items center
      width 25%
      height 1rem

      .info-title
        font-size 0.28rem
        color $fontColor_Aside
        margin-bottom 0.1rem

      .info-content
        font-size 0.24rem
        font-weight bold

  .options-list
    .logout-btn
      display block
      line-height 0.84rem
      color #d02d2d
      text-align center
</style>
