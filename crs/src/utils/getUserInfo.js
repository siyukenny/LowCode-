var wx = require('weixin-js-sdk')
// import Sensors from "@/sensors";

const ISLOGIN_KEY = 'isLogin'
const TOKEN_KEY = 'token'
const CANTOLOGIN_KEY = 'canToLogin'
const POSITIONADDRESS_KEY = 'PositionAddress'
const CURRENTADDRESS_KEY = 'CurrentAddress'
const OPEN_ID = 'openId'
const USER_ID = 'userId'
class UserInfo {
  /**
   * 获取本地用户登录状态
   */
  GetLocalUserLoginStatus() {
    const isLogin = localStorage.getItem(ISLOGIN_KEY)
    // eslint-disable-next-line eqeqeq
    return isLogin == 'true'
  }

  /**
   * 设置本地用户登录状态
   */
  SetLocalUserLoginStatus(val) {
    localStorage.setItem(ISLOGIN_KEY, val)
  }

  /**
   * 获取登录失效是否可挑战至登录页面状态（防止重复跳转）
   */
  GetCanToLoginStatus() {
    const canToLogin = localStorage.getItem(CANTOLOGIN_KEY)
    // eslint-disable-next-line eqeqeq
    return canToLogin == 'true'
  }

  /**
   * 设置登录失效是否可挑战至登录页面状态
   */
  SetCanToLoginStatus(val) {
    localStorage.setItem(CANTOLOGIN_KEY, val)
  }

  /**
   * 获取本地用户登录token
   */
  GetToken() {
    const token = localStorage.getItem(TOKEN_KEY)
    return token
  }

  /**
   * 设置本地用户登录token
   */
  SetToken(val) {
    localStorage.setItem(TOKEN_KEY, val)
  }

  /**
   * 从本地缓存读取用户当前定位的地址
   */
  GetPositionAddress() {
    let position = localStorage.getItem(POSITIONADDRESS_KEY)
    // 取值时转换为对象
    if (position && typeof position === 'string') {
      position = JSON.parse(position)
    }
    return position
  }

  /**
   * 设置用户当前定位的地址
   */
  SetPositionAddress(position) {
    // 存储时转换为字符串
    if (typeof position === 'object') {
      position = JSON.stringify(position)
    }
    localStorage.setItem(POSITIONADDRESS_KEY, position)
  }

  /**
   * 从本地缓存读取用户当前选择的地址
   */
  GetCurrentAddress() {
    let position = localStorage.getItem(CURRENTADDRESS_KEY)
    // 取值时转换为对象
    if (position && typeof position === 'string') {
      position = JSON.parse(position)
    }
    return position
  }

  /**
   * 设置用户当前选择的地址
   */
  SetCurrentAddress(position) {
    // 存储时转换为字符串
    if (typeof position === 'object') {
      position = JSON.stringify(position)
    }
    localStorage.setItem(CURRENTADDRESS_KEY, position)
  }

  /**
   * 未登录去登录
   */
  goToLogin() {
    if (!this.GetLocalUserLoginStatus()) {
      // Sensors.TriggerAuthorization();
      this.toLogin()
      return true
    }
  }

  /**
   * 跳转至登录页
   */
  toLogin() {
    wx.miniProgram.navigateTo({
      url: '/pages/login/index'
    })
  }
  /**
   * 设置openid
   */
  setOpenid(val) {
    localStorage.setItem(OPEN_ID, val)
  }
  /**
   * 设置userid
   */
  setUserid(val) {
    localStorage.setItem(USER_ID, val)
  }
}

export default new UserInfo()
