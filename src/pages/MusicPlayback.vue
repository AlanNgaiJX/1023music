<template>
  <div class="wrapper" v-lazy:background-image="picUrl">
    <div class="content">
      <!-- 顶部 -->
      <head_bar :songName="songName" :songArtists="songArtists"></head_bar>

      <!-- 留声机，用isPause控制 -->
      <lyric_bg :isPause="isPause" :picUrl="picUrl"></lyric_bg>

      <!-- 控制台，fiexed -->
      <control>
        <!-- 未实现 -->
        <!-- <template #control_more>
          <control_more></control_more>
        </template> -->

        <!-- 进度条 -->
        <template #control_process>
          <control_process
            :duration="audioDuration"
            :bufferedTime="bufferedTime"
            :currentTime="audioCurrentTime"
            @currentTimeChange="handleCurrentTimeChange"
          ></control_process>
        </template>

        <!-- 播放器 -->
        <template #control_player>
          <control_player
            :isPause="isPause"
            @pauseChange="handlePauseChange"
            @modeChange="handleModeChange"
            @switchSong="handleSwitchSong"
          ></control_player>
        </template>
      </control>
    </div>
  </div>
</template>

<script>
import head_bar from '@/components/musicPlayBack/Playback_head_bar'
import lyric_bg from '@/components/musicPlayBack/Playback_lyric_bg'
import control from '@/components/musicPlayBack/Playback_control'
import control_more from '@/components/musicPlayBack/Playback_control_more'
import control_process from '@/components/musicPlayBack/Playback_control_process'
import control_player from '@/components/musicPlayBack/Playback_control_player'

import { mapState } from 'vuex'
export default {
  name: 'MusicPlayback',
  components: {
    head_bar,
    lyric_bg,
    control,
    control_more,
    control_process,
    control_player,
  },
  data() {
    return {
      currentAudio: null,
      audioCurrentTime: 0,
      bufferedTime: 0,
      audioDuration: 0,
      isEnd: false,
      isPause: true,
      mode: 0,
      picUrl: '',
      songName: '',
      songArtists: [],
    }
  },
  computed: {
    ...mapState(['currentTracks', 'currentSong', 'songIndex', 'songStroage']),
  },
  methods: {
    //【 初始化Audio对象，并自动播放 】
    initAudio() {
      if (this.currentSong === null) {
        return
      } else {
        this.currentAudio = new Audio()
        this.currentAudio.volume = 1

        // 这个监听器有可能解决移动端兼容问题
        // this.currentAudio.addEventListener("canplay", this.handleCanplay);

        // 监听播放
        this.currentAudio.addEventListener('playing', this.handlePlaying)

        // 监听停止
        this.currentAudio.addEventListener('pause', this.handlePause)

        // 歌曲多次加载触发,刷新歌曲已缓存时间长度 bufferedTime
        this.currentAudio.addEventListener('progress', this.handleProgress)

        // 歌曲首次加载后触发（单次），获取歌曲时长，更新 audioDuration
        this.currentAudio.addEventListener(
          'durationchange',
          this.handleDurationchange
        )

        // 播放时间发生变化触发，更新 audioCurrentTime
        this.currentAudio.addEventListener('timeupdate', this.handleTimeupdate)

        // 播放到曲终触发，更新 isEnd
        this.currentAudio.addEventListener('ended', this.handleEnded)
      }
    },
    // 【 设置或切换歌曲并播放 ，仅在 activaed 阶段后调用 】
    setAndPlay() {
      if (this.currentSong === null) {
        return
      }

      if (this.currentAudio === null) {
        // 如果还没初始化，先初始化
        this.initAudio()
        this.setSong()
      } else {
        if (this.currentAudio.src) {
          // 如果已经有歌曲在播放
          if (this.$route.params.isSame) {
            // 如果是同一首歌
            return
          } else {
            // 不是同一首歌，或参数未设置
            if (this.$route.params.superPath) {
              // 如果是超级通道进来
              return
            }
            this.setSong()
          }
          return
        } else {
          this.setSong()
        }
      }
    },
    // 【 设置歌曲 】
    setSong() {
      let songSrc = `https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`
      if (this.currentSong.al) {
        this.picUrl = this.currentSong.al.picUrl
      } else {
        this.picUrl = ''
      }

      this.songName = this.currentSong.name || ''
      this.songArtists = this.currentSong.ar || this.currentSong.artists || []
      this.currentAudio.src = songSrc
      this.currentAudio.play()
    },

    // 以下是audio对象的回调监听
    //【 歌曲正在播放 】
    handlePlaying() {
      this.isPause = false
    },
    //【 歌曲被暂停 】
    handlePause() {
      this.isPause = true
    },
    // 【 缓存变化，获取缓存  】
    handleProgress() {
      const timeRange = this.currentAudio.buffered
      if (timeRange.length > 0) {
        this.bufferedTime = timeRange.end(timeRange.length - 1)
      }
    },
    // 【 歌曲 src 已绑定，获取duration 】
    handleDurationchange() {
      this.audioDuration = this.currentAudio.duration
    },
    // 【 歌曲播放时间持续变化 】
    handleTimeupdate(e) {
      this.audioCurrentTime = e.path[0].currentTime
    },
    // 【 播放到终点，走切歌逻辑 】
    handleEnded() {
      this.handleSwitchSong(true)
      this.isEnd = true
    },

    //  【 停止并销毁 audio，移除事件监听 】
    pauseAndDestroy() {
      if (this.currentAudio === null) {
        return
      }
      // 销毁audio
      this.currentAudio.pause()
      // 监听播放
      this.currentAudio.removeEventListener('playing', this.handlePlaying)
      // 监听停止
      this.currentAudio.removeEventListener('pause', this.handlePause)
      // 歌曲多次加载触发,刷新歌曲已缓存时间长度 bufferedTime
      this.currentAudio.removeEventListener('progress', this.handleProgress)
      // 歌曲首次加载后触发（单次），获取歌曲时长，更新 audioDuration
      this.currentAudio.removeEventListener(
        'durationchange',
        this.handleDurationchange
      )
      // 播放时间发生变化触发，更新 audioCurrentTime
      this.currentAudio.removeEventListener('timeupdate', this.handleTimeupdate)
      // 播放到曲终触发，更新 isEnd
      this.currentAudio.removeEventListener('ended', this.handleEnded)
      this.currentAudio = null
    },

    // 以下是响应组件control的回调
    // 【 拖动进度条 】
    handleCurrentTimeChange(currentTimeSet) {
      this.currentAudio.currentTime = currentTimeSet
    },
    // 【 点击停止 】
    handlePauseChange(val) {
      this.isPause = val
    },
    // 【 点击切换播放模式 】
    handleModeChange(mode) {
      this.mode = mode
    },
    //【 点击切歌按钮 】
    handleSwitchSong(auto, position) {
      // <切换当前歌曲>
      // auto：曲终自动切换，是真，否假
      // position：主动切换，下一首真，上一首假

      // 保存一次指针
      let currentSongIndex = this.songIndex
      // 下一首歌曲指针
      let nextSongIndex

      // 判断当前播放模式
      // 0列表循环、1列表随机、2单曲循环
      this.mode === 1
        ? (nextSongIndex = Math.floor(
            Math.random() * this.currentTracks.length
          ))
        : (nextSongIndex = currentSongIndex + 1)

      switch (this.mode) {
        case 0:
        case 2:
          nextSongIndex = currentSongIndex + 1
          if (nextSongIndex >= this.currentTracks.length) {
            nextSongIndex = 0
          }
          break
        case 1:
          nextSongIndex = (function getRandomIndex(currIndex, tracksLength) {
            const nexIndex = Math.floor(Math.random() * tracksLength)
            if (nexIndex === currIndex) {
              return getRandomIndex(currIndex, tracksLength)
            } else {
              return nexIndex
            }
          })(currentSongIndex, this.currentTracks.length)
          break
        default:
          break
      }

      // 如果是曲终自动切歌的时候
      if (auto) {
        if (this.mode === 2) {
          this.currentAudio.currentTime = 0
          this.currentAudio.play()
        } else {
          // 切换当前歌曲
          this.$store.dispatch('changeCurrentSongByIndex', { nextSongIndex })
          // 设置当前歌曲播放
          this.setSong()
        }
        return
      }
      // 如果是手动切歌的时候
      if (position) {
        // 下一首
        // 同上，使用指针切歌
        this.$store.dispatch('changeCurrentSongByIndex', {
          nextSongIndex: nextSongIndex,
        })
        this.setSong()
      } else {
        // 上一首
        // songStroage是store中的一个历史播放队列
        if (this.songStroage.length > 1) {
          const backSong = this.songStroage[this.songStroage.length - 2]
          this.$store.dispatch('update_currentSong', { currentSong: backSong })
          const newIndex = this.songIndex - 1
          this.$store.dispatch('update_songIndex', { songIndex: newIndex })
          this.setSong()
        } else {
          this.currentAudio.currentTime = 0
        }
      }
    },
  },
  watch: {
    //【 监视isPause暂停状态，以此执行播放或暂停 】
    isPause(newVal) {
      // audio对象未能初始化的情况不可用
      if (!this.currentAudio) {
        return
      }
      if (newVal) {
        this.currentAudio.pause()
      } else {
        this.currentAudio.play()
      }
    },
  },
  mounted() {
    // 初始化一个audio对象并绑定好监听
    this.initAudio()
  },
  activated() {
    // 激活阶段后设置并播放歌曲
    this.setAndPlay()
  },
  beforeDestroy() {
    // 销毁audio对象，移除监听
    this.pauseAndDestroy()
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/MusicPlayback/play_icon'

.icon
  color white

.wrapper
  font-family $font
  background-image url('~@/assets/MusicPlayback/img/play_albumImg.png')
  position absolute
  width 100%
  height 100%
  box-sizing border-box
  z-index 2
  box-shadow 0 0 1rem 2rem white inset
  background-color black

  &:after
    content ''
    position absolute
    width 100%
    height 100%
    filter blur(20px) contrast(50%) brightness(120%)
    z-index 3
    left 0
    top 0
    background inherit

  .content
    position relative
    z-index 999
    color white !important
</style>
