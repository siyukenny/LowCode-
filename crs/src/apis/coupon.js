
import axios from '../utils/axios'
var wx = require('weixin-js-sdk')

// 获取券包详情
export function findCouponActivityInfo(data) {
  return axios.post(
    `/jv-mall-promotion/couponActivity/findCouponActivityInfo`,
    data
  )
}

// 领取券包
export function getActivityCoupon(data) {
  return axios.post(
    `/jv-mall-promotion/couponRule/obtainActivityCoupon`,
    data
  )
}
// 领取KA券包
export function obtainActivityCoupon(data) {
  // 设置ssid, bssid参数
  // h5 获取小程序wifi信息方案待确认
  // const ssidInfo = await getWifiInfo("obtainActivityCoupon").catch();
  // Object.assign(data, ssidInfo);

  return axios.post(
    `/jv-mall-promotion/couponRule/obtainActivityCoupon`,
    data
  )
}
export function getWifiInfo(callerName) {
  console.log(callerName) // 打印调用方法
  return new Promise((resolve, reject) => {
    wx.startWifi({
      success: () => {
        wx.getConnectedWifi({
          success: (data) => {
            resolve({ ssid: data.wifi.SSID, bssid: data.wifi.BSSID })
            console.log('BSSID', data.wifi.BSSID)
            console.log('SSID', data.wifi.SSID)
          },
          fail: (error) => {
            console.log('getConnectedWifi error', error)
            resolve({ ssid: null, bssid: null })
          }
        })
      },
      fail: (error) => {
        console.log('startWifi fail', error)
        resolve({ ssid: null, bssid: null })
      }
    })
  })
}

/**
 * 获取优惠券详情
 * @param params
 */
export function getCouponDetail(params) {
  return axios.post(`/jv-mall-promotion/couponRule/getCouponInfoById`, params)
}

/**
 * 领取优惠券
 */
export async function obtainCoupon(params) {
  // 设置ssid, bssid参数
  // const ssidInfo = await getWifiInfo("obtainCoupon").catch();
  // Object.assign(params, ssidInfo);
  return axios.post(`/jv-mall-promotion/couponRule/obtainCoupon`, params)
}
