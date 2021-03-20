/*
 * @Author: your name
 * @Date: 2021-03-20 19:12:58
 * @LastEditTime: 2021-03-21 00:58:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /1023music/src/index.js
 */
import axios from 'axios'
import config from '@/config/index.js'
const host = config.host

window.$httpRequestList = []

function genTokenAndSource() {
  const source = axios.CancelToken.source()
  window.$httpRequestList.push(source)
  return source.token
}

const instance = axios.create({
  baseURL: host,
})

// 手机登陆
export function phoneLogin(args) {
  return instance.post(host + '/login/cellphone', {
    phone: args.phone,
    password: args.password,
  })
}

// 检查手机是否注册
export function checkPhone(args) {
  return instance.get(host + `/cellphone/existence/check?phone=${args.account}`)
}

// 检获取歌单详情
export function getMusicList(args) {
  return instance.get(host + `/playlist/detail?id=${args.id}`, {
    cancelToken: genTokenAndSource(),
  })
}

// 搜索歌
export function searchSong(args) {
  return instance.get(host + `/search?keywords=${args.keyword}`, {
    cancelToken: genTokenAndSource(),
  })
}

// 注销
export function logout() {
  return instance.get(host + `/logout`)
}

// 获取我的歌单
export function getMyMusic(args) {
  return instance.get(host + `/user/playlist?uid=${args.userId}`, {
    cancelToken: genTokenAndSource(),
  })
}

// 获取banner
export function getBanner() {
  return instance.get(host + `/banner?type=2`, {
    cancelToken: genTokenAndSource(),
  })
}

// 获取个人推荐
export function getPersonalizedList() {
  return instance.get(host + `/personalized`, {
    cancelToken: genTokenAndSource(),
  })
}
