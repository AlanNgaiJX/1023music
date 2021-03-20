/*
 * @Author: your name
 * @Date: 2021-03-06 22:47:28
 * @LastEditTime: 2021-03-20 22:38:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /groupup/src/config/index.js
 */
const localHost = ``;
const betaHost = ``;
const onlineHost = "http://18.163.192.144:9001/1023Server";
const localTags = ["localhost", "192.168", "127.0.0.1", "172.20.10.3"];
const isLocal = localTags.some((item) => {
    return window.location.origin.includes(item);
});

const inBeta = false;

const host = isLocal ? (inBeta ? betaHost : localHost) : onlineHost;

const config = {
    host,
};

export default config;
