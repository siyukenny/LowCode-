import axios from '../utils/axios'

export function findSkuInfoByIds(data) {
  return axios.post(
    `/jv-mall-product/sku/findSkuInfoByIds`,
    data
  )
}
