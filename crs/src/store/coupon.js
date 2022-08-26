export default  {
  namespaced: true,
  state: {
    coupons: {
      headImage: '',
      middleImage: '',
      tailImage: '',
      couponList: []
    },
    couponVisible: false,
    couponSingle: {},
    couponSingleVisible: false
  },
  getters: {
    getCoupons: state => {
      return state.coupons
    },
    getCouponVisible: state => {
      return state.couponVisible
    },
    getCouponSingle: state => {
      return state.couponSingle
    },
    getCouponSingleVisible: state => {
      return state.couponSingleVisible
    }
  },
  mutations: {
    setCoupons(state, data) {
      state.coupons = data
    },
    setCouponVisible(state, data) {
      state.couponVisible = data
    },
    SET_SINGLE_COUPON(state, data) {
      state.couponSingle = data
    },
    SET_SINGLE_COUPON_VISIBLE(state, data) {
      state.couponSingleVisible = data
    },
  },
  actions: {
    setCoupons({ commit }, data) {
      commit('setCoupons', data)
    },
    setCouponVisible({ commit }, data) {
      commit('setCouponVisible', data)
    },
    setSingleCoupon({ commit }, data) {
      commit('SET_SINGLE_COUPON', data)
    },
    setSingleCouponVisible({ commit }, data) {
      commit('SET_SINGLE_COUPON_VISIBLE', data)
    },
  }
}
