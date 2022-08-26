var wx = require('weixin-js-sdk')
let runEnv = () => {
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx71c1f637bc664d7e', // 必填，公众号的唯一标识
    timestamp: new Date().getTime(), // 必填，生成签名的时间戳
    nonceStr: new Date().getTime() + 'crs', // 必填，生成签名的随机串
    signature: 'crs', // 必填，签名
    jsApiList: [] // 必填，需要使用的JS接口列表
  })
  return new Promise((resolve, reject) => {
    try{
      wx.ready(function(){
        wx.miniProgram.getEnv(res => {
          resolve({
            data: res.miniprogram?'prod':'dev',
            success: true
          })
        })
      })
    } catch (e) {
      reject({
        success: false,
        data: 'dev'
      })
    }
  })
}
export default runEnv
