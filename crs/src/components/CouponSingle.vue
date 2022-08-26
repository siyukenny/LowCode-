<template>
  <van-dialog
    v-model="visible"
    :show-confirm-button="false"
    class="dialog-info"
  >
    <div class="coupon">
      <div class="title">
        领券
      </div>
      <div class="content">
        <div class="coupon-item">
          <div class="item-detail">
            <div class="detail-left">
              <div class="price">
                {{ couponSingle.discountType !== 2 ? '¥ '+couponSingle.discountAmount: couponSingle.couponDiscount+'折' }}
              </div>
              <div class="reduce">
                {{ couponSingle.discountType !== 3 ? "满"+couponSingle.fitAmount+"元可用" : "无门槛代金券" }}
              </div>
            </div>
            <div class="detail-right">
              <div class="head">
                {{ couponSingle.name }}
              </div>
              <div class="time">
                有效时间:{{ couponSingle.effectiveType === 1 ? '领取后'+couponSingle.effectiveDay+'天内' : couponSingle.effectiveStartTime+'-'+couponSingle.effectiveEndTime }}
              </div>
            </div>
          </div>
          <view class="item-desc">
            {{ couponSingle.discountType === 2 ? "最大优惠金额："+couponSingle.maxDiscountAmount+"元;": '' }}{{ couponSingle.couponRangeDesc }}
          </view>
        </div>
      </div>
      <div class="title bottom" @click="getCoupon">
        立即领取
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
import { obtainCoupon } from '@/apis/coupon'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CouponSingle',
  data() {
    return {

    }
  },
  computed: {
    // 优惠券信息
    ...mapState('coupon', ['couponSingle']),
    // 模态框是否显示
    visible: {
      get: function() {
        return this.$store.state.coupon.couponSingleVisible
      },
      set: function(val) {
        this.setSingleCouponVisible(val)
      }
    }
  },
  methods: {
    ...mapActions('coupon', [
      'setSingleCouponVisible'
    ]),
    closeDialog () {
      this.setSingleCouponVisible(false)
    },
    getCoupon() {
      const { couponSingle } = this
      const param = {
        couponRuleId: couponSingle.id,
        couponActivityId: couponSingle.couponActivityId
      }
      // Sensors.ReceiveDiscount(couponSingle);
      // 校验token
      const noLogin = UserInfo.goToLogin()
      if (noLogin) {
        return
      }
      obtainCoupon(param)
        .then(() => {
          this.$toast('领取优惠券成功')
        })
        .catch(err => {
          this.$toast(err.message)
        }).finally(() => {
          this.closeDialog()
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .coupon {
    width: 295px;
    background: #fff;
    border-radius: 12px;
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
      border-bottom: 0px;
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
  .coupon {
    .title {
      height: 48px;
    }
    .content .coupon-item {
      margin: 16px;
      background: #f7f7f7;
      .item-detail {
        padding: 14px 12px 16px 12px;
        display: flex;
        .detail-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          .price {
            color: #DD1A21;
            font-size: 18px;
            font-weight: 500;
          }
          .reduce {
            font-size: 10px;
            color: #666;
          }
        }
        .detail-right {
          display: flex;
          flex-direction: column;
          margin-left: 16px;
          width: 66%;
          justify-content: space-between;
          .head {
            color: #333;
            font-size: 14px;
            font-weight: 500;
            margin-top: 2px;
          }
          .time {
            font-size: 10px;
            color: #666;
          }
        }
      }
    }
  }
  .dialog-info {
    width: 295px;
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
