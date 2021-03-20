<template>
  <div class="home">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <tabBar
      v-show="showTabBar"
      :currentTabID="currentTabID"
      :tabBarList="tabBarList"
    ></tabBar>
  </div>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import { mapState } from "vuex";
export default {
  components: {
    tabBar
  },
  data() {
    return {
      showTabBar: true
    };
  },
  computed: {
    ...mapState(["tabBarList", "currentTabID"])
  },
  watch: {
    $route: {
      handler(nv) {
        // 使用 $route.meta.showTabBar 设置 tabBar 显隐
        this.showTabBar =
          nv.meta.showTabBar === undefined ? true : nv.meta.showTabBar;
      },
      immediate: true
    }
  }
};
</script>

<style lang="stylus" scoped></style>
