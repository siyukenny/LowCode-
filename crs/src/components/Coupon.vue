<template>
  <van-dialog
    v-model="visible"
    :show-confirm-button="false"
    class="dialog-info"
  >
    <div class="coupon-list">
      <div class="title" :class="coupons.headImage ? '' : 'hide'">
        <van-image
          width="100%"
          height="100%"
          :src="coupons.headImage || defaultUrl"
        />
      </div>
      <div class="content" :style="{background: `url(${coupons.middleImage}) no-repeat center center`}">
        <div class="coupon-item">
          <div v-for="coupon in coupons.couponList" :key="coupon.id" class="item-detail">
            <div class="detail-left">
              <div class="head">
                {{ coupon.name }}
              </div>
              <div class="time">
                有效时间:{{ coupon.effectiveType === 1 ? '领取后'+coupon.effectiveDay+'天内' : coupon.effectiveStartTime+'-'+coupon.effectiveEndTime }}
              </div>
            </div>
            <div class="detail-right">
              <div v-if="coupon.discountType !== 2" class="price">
                <span class="unit">¥</span>{{ coupon.discountAmount }}
              </div>
              <div v-else class="price">
                {{ coupon.couponDiscount }}<span class="unit">折</span>
              </div>
              <div class="reduce">
                {{ coupon.discountType !== 3 ? "满"+coupon.fitAmount+"元可用" : "无门槛代金券" }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="title bottom" :class="coupons.tailImage ? '' : 'hide'" @click="getCoupon">
        <van-image
          width="100%"
          height="100%"
          :src="coupons.tailImage || defaultUrl"
        />
      </div>
      <div class="close-info cancel">
        <van-icon name="close" @click="closeDialog" />
      </div>
    </div>
  </van-dialog>
</template>

<script>
// import Sensors from "@/sensors"
import UserInfo from '@/utils/getUserInfo'
import { getActivityCoupon } from '@/apis/coupon'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Coupon',
  data() {
    return {
      defaultUrl: '/assets/default_small.png'
    }
  },
  computed: {
    // 优惠券信息
    ...mapState('coupon', ['coupons']),
    // 模态框是否显示
    visible: {
      get: function() {
        return this.$store.state.coupon.couponVisible
      },
      set: function(val) {
        this.setCouponVisible(val)
      }
    }
  },
  methods: {
    ...mapActions('coupon', [
      'setCouponVisible'
    ]),
    closeDialog () {
      this.setCouponVisible(false)
    },
    getCoupon() {
      const { couponActivityId } = this.coupons
      // Sensors 埋点
      // const curActivityId = Number(this.$route.query.id);
      // const sensorParam = {
      //   current_page: `活动页${curActivityId}`,
      //   coupon_package_id: couponActivityId
      // };
      // Sensors.CouponpackageClick(sensorParam);
      // 校验token
      const noLogin = UserInfo.goToLogin()
      if (noLogin) {
        return
      }
      getActivityCoupon({ couponActivityId }).then(res => {
        this.$toast('领取优惠券成功')
      }).catch(err => {
        this.$toast(err.message)
      }).finally(() => {
        this.closeDialog()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .coupon-list {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    .title {
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
    }
    .bottom {
      border-top: 1px solid #eeeeee;
      border-bottom: 0;
      color: #004AA0;
      font-size: 17px;
    }
    .cancel {
      position: absolute;
      color: #fff;
      margin-top: 24px;
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .item-desc {
      padding: 7px 12px 8px 12px;
      border-top: 1px solid #eeeeee;
      color: #999999;
      font-size: 10px;
    }
  }
  .coupon-list {
    .title,
    .content,
    .bottom {
      background-clip: border-box;
      background-size: cover;
    }
    .title {
      border-bottom: 0;
      > image {
        width: 100%;
        border-radius: 12px 12px 0 0;
      }
    }
    .bottom {
      border-top: 0;
      image{
        border-radius:  0 0 12px 12px;
      }
    }
  }
  .hide {
    display: none !important;
  }
  .coupon-list .content {
    height: 228px;
    overflow: scroll;
    position: relative;
    .coupon-item {
      margin-bottom: 7px;
      padding: 0 12px;
      background: transparent;
      .item-detail {
        background: url(https://image.fuchuang.com/prod/31517091_coupon-bg20201116164901.png) no-repeat left top;
        background-size: 100% 100%;
        height: 75px;
        padding: 16px 8px 16px 12px;
        display: flex;
        margin-top: -1px;
        margin-bottom: 7px;
        border-radius: 5px;
        box-sizing: border-box;
        &:first-child {
          margin-top: 8px;
        }
        .detail-left {
          width: 70%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          overflow: hidden;
          .head {
            color: #DD1A21;
            font-size: 16px;
            line-height: 20px;
            font-weight: bold;
            margin-top: 2px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          .time {
            font-size: 11px;
            color: #666;
          }
        }
        .detail-right {
          padding-left: 20%;
          width: 36%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          .unit {
            font-size: 14px;
          }
          .price {
            color: #DD1A21;
            font-size: 24px;
            line-height: 24px;
            font-weight: bold;
          }
          .reduce {
            font-size: 10px;
            color: #666;
          }
        }
      }
    }
  }
  .dialog-info {
    overflow: unset;
  }
  .close-info{
    text-align: center;
    margin-top: 8px;
  }
  .close-info i {
    font-size: 40px;
  }
</style>
