import axios from '../utils/axios'
export function getDefaultCarObject(data) {
  return axios.post(
    `/jv-mall-user/vehicle/findDefaultVehicle?isLoading=0`,
    data
  )
}
