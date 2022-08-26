import { mapActions } from 'vuex'
import { findCouponActivityInfo, obtainActivityCoupon, getCouponDetail } from '@/apis/coupon'
import UserInfo from '@/utils/getUserInfo'
import vehicle from '@/utils/vehicle'
import { dateFormat } from '@/utils/date'
var wx = require('weixin-js-sdk')

// wx.config({
//   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//   appId: 'wx71c1f637bc664d7e', // 必填，公众号的唯一标识
//   timestamp: new Date().getTime(), // 必填，生成签名的时间戳
//   nonceStr: new Date().getTime() + 'crs', // 必填，生成签名的随机串
//   signature: 'crs', // 必填，签名
//   jsApiList: [] // 必填，需要使用的JS接口列表
// })

const statusTypes = [
  { code: 10000, status: 'success' },
  { code: 50801, status: 'notStaff' },
  { code: 50802, status: 'resigned' },
  { code: 50803, status: 'obtained' },
  { code: 50804, status: 'fail' }
]
let getKACouponList = (couponActivityId) => {
  const param = { couponActivityId }
  obtainActivityCoupon(param)
    .then((res) => {
      toStatusPage(res.code)
    })
    .catch((err) => {
      if (![10017, 50801, 50802, 50803, 50804].includes(err.code)) {
        console.log('err', err)
      }
      if ([50801, 50802, 50803, 50804].includes(err.code)) {
        toStatusPage(err.code)
      }
    })
}
let toStatusPage = (code) => {
  wx.navigateTo({
    url: `/pages/activity/status/index`,
    success(res) {
      if (res.eventChannel) {
        const { status } = statusTypes.find(
          i => i.code === code
        )
        res.eventChannel.emit('GET_COUPONLIST_STATUS', {
          params: {
            status: status
          }
        })
      }
    }
  })
}
// 小程序tabBar页面
const tabBarList = [
  '/pages/home/index',
  '/pages/maintenance/index',
  '/pages/store/shop/index',
  '/pages/user/userPage/index'
]
export default {
  methods: {
    ...mapActions('coupon', [
      'setCoupons',
      'setCouponVisible',
      'setSingleCoupon',
      'setSingleCouponVisible'
    ]),
    jumpLink(link) {
      // cms预览页面不触发跳转逻辑
      if (this.$route.meta.preiview) {
        return
      }
      if (!link) return
      const { clickType, data } = link
      console.log(clickType, data)
      // 渠道引流 - 用户未授权跳转注册授权
      if (this.$route.query.source && UserInfo.goToLogin()) {
        return
      }
      switch (clickType) {
        // 跳转到商品详情
        case 1:
          wx.miniProgram.navigateTo({
            url: '/pages/goods/detail/index?id=' + data.id
          })
          break
        // 领取优惠券
        case 2:
          this.fetchCouponDetail(data.id)
          break
        // 跳转到保养适配
        case 3:
          wx.miniProgram.navigateTo({
            url: `/pages/maintenance/maintain?relateProjectCode=${data.projectCode}`
          })
          break
        // 跳转到活动页
        case 4:
          wx.miniProgram.navigateTo({
            url: `/pages/activity/index?id=${data.id}`
          })
          break
        // 领取券包
        case 6:
          this.fetchCouponListDetail(data.id)
          break
        // 跳转到指定URl
        case 7:
          const redirectUrl = data.redirectUrl
          const url = redirectUrl.substr(0, 1) === '/' ? redirectUrl : `/${redirectUrl}`
          console.log(url)
          if (tabBarList.includes(url)) {
            wx.miniProgram.switchTab({
              url
            })
          } else {
            wx.miniProgram.navigateTo({
              url,
              fail() {
                console.log('跳转页面不属于内部页面')
                wx.miniProgram.switchTab({
                  url: tabBarList[0]
                })
              }
            })
          }
          break
        // 跳转到外部小程序
        case 8:
          const path = encodeURIComponent(data.redirectOuterUrl)
          wx.miniProgram.navigateTo({
            url: `/pages/toMiniProgram/index?appId=${data.appId}&path=${path}`
          })
          break
        // 领取KA卷包，交互无弹窗
        case 9:
          console.log('领取KA券包代码逻辑')
          getKACouponList(data.activityId)
          break
        // 单服务立即下单
        case 10:
          if (UserInfo.goToLogin()) {
            return
          }
          this.orderDetail(data)
          break
        default:
          break
      }
    },
    // 获取优惠券详情
    fetchCouponDetail(couponRuleId) {
      const param = { couponRuleId }
      getCouponDetail(param)
        .then(res => {
          console.log(res)
          const data = res.data
          if (data.effectiveType === 2) {
            data.effectiveStartTime = dateFormat(
              data.effectiveStartTime,
              'yyyy.MM.dd'
            )
            data.effectiveEndTime = dateFormat(
              data.effectiveEndTime,
              'yyyy.MM.dd'
            )
          }
          this.setSingleCouponVisible(true)
          this.setSingleCoupon(data)
        })
        .catch(err => {
          this.$toast(err.message)
          console.log(err)
        })
    },
    // 领取券包
    fetchCouponListDetail(couponActivityId) {
      const param = { couponActivityId }
      findCouponActivityInfo(param)
        .then((res) => {
          const {
            headImage,
            middleImage,
            tailImage,
            couponActivityId,
            couponRuleListRespList
          } = res.data
          const coupons = {
            headImage,
            middleImage,
            tailImage,
            couponActivityId,
            couponList: (couponRuleListRespList || []).map(item => {
              return {
                ...item,
                effectiveStartTime: item.effectiveStartTime
                  ? dateFormat(item.effectiveStartTime)
                  : '',
                effectiveEndTime: item.effectiveEndTime
                  ? dateFormat(item.effectiveEndTime)
                  : ''
              }
            })
          }
          this.setCouponVisible(true)
          this.setCoupons(coupons)
        })
        .catch(err => {
          this.$toast(err.message)
          console.log(err)
        })
    },
    // 单服务下单
    async orderDetail({orderService, orderSale}) {
      if (this._isToConfirmOrder) return
      this._isToConfirmOrder = true
      const skuId = orderService && orderService.id
      const promotionSaleId = orderSale && orderSale.id
      const skuDetailReq = [{ skuId, skuNum: 1, skuType: 1 }]
      // 用户定位的地址
      const PositionAddress = UserInfo.GetPositionAddress() || {}
      // 用户首页选择的地址
      const CurrentAddress = UserInfo.GetCurrentAddress() || {}
      // 用户当前地址
      let { lon, lat, City } = PositionAddress
      if (CurrentAddress.City) {
        City = CurrentAddress.City
      }
      // 获取用户当前的车型
      // try,catch 解决异步获取车型失败不执行后续逻辑
      let vehicleReq = null
      try {
        vehicleReq = await vehicle.GetCurrentCar()
      } catch (err) {
        console.log('获取默认车型失败', err)
      }
      // 格式化参数
      const params = {
        skuDetailReq,
        promotionSaleId,
        vehicleReq,
        lon,
        lat,
        city: City
      }
      console.log('提交订单入参：', params)
      this.goOrderDetail(params)
    },
    // 跳转到确认订单页面
    goOrderDetail(params) {
      const data = {
        orderParams: params,
        needComfirmReq: true // 需要调接口查询服务及赠品信息
      }
      const sendData = encodeURIComponent(JSON.stringify(data))
      wx.miniProgram.navigateTo({
        url: '/pages/order/confirm/index?serviceData=' + sendData,
        complete: () => {
          console.log('跳转完成')
          this._isToConfirmOrder = false
        }
      })
    }
  }
}
