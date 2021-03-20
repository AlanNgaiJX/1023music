import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import MyMusic from "@/pages/MyMusic";
import MusicList from "@/pages/MusicList";
import MusicShare from "@/pages/MusicShare";
import FoundMusic from "@/pages/FoundMusic/index";
import MusicSearch from "@/pages/MusicSearch";
import MyAccount from "@/pages/MyAccount";
import MusicPlayback from "@/pages/MusicPlayback";
import FoundMusicSuggest from "@/pages/FoundMusic/FoundMusicSuggest";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      props: true
    },
    {
      path: "/home",
      component: Home,
      redirect: {
        path: "/my-music"
      },
      children: [
        {
          path: "/my-music",
          name: "MyMusic",
          component: MyMusic,
          meta: {
            keepAlive: true,
            useCache: false,// 使用缓存
            useCacheOnly: ["/music-list"],
            showTabBar: true// 显示tabbbar
          }
        },
        {
          path: "/music-list",
          name: "MusicList",
          component: MusicList,
          meta: {
            keepAlive: true,
            lastFullPath: "",// 上次缓存的 /music-list?id=xxx
            showTabBar: false// 不显示tabbbar
          },
          props: route => ({ query: route.query })
        },
        {
          path: "/music-playback",
          name: "MusicPlayback",
          component: MusicPlayback,
          meta: {
            keepAlive: true,
            showTabBar: false
          }
        },
        {
          path: "/music-search",
          name: "MusicSearch",
          component: MusicSearch,
          props: route => ({ query: route.query })
        },
        {
          path: "/music-share",
          name: "MusicShare",
          component: MusicShare
        },
        {
          path: "/found-music",
          name: "FoundMusic",
          component: FoundMusic,
          meta: {},
          redirect: {
            path: "/found-music/"
          },
          children: [
            {
              path: "/found-music/",
              name: "FoundMusicSuggest",
              component: FoundMusicSuggest
            }
          ]
        },
        {
          path: "/my-account",
          name: "MyAccount",
          component: MyAccount,
          meta: {
            requireAuth: false
          }
        }
      ]
    }
  ]
});

router.beforeEach((to, form, next)=>{
  while (window.$httpRequestList.length) {
    const source = window.$httpRequestList.pop();
    source.cancel('interrupt');
  }
  next();
})

export default router;