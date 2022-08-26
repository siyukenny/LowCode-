import UserInfo from '@/utils/getUserInfo'
import { getDefaultCarObject } from '@/apis/link.js'

const SUCCESS_CODE = 10000; // 后端统一成功code值
const LOCALSTORAGE_KEY = "myCar";

class VehicleInfo {
  constructor() {}

  _saveCarToLocal(car) {
    // 存储时转换为字符串
    if (typeof car === "object") {
      car = JSON.stringify(car)
    }
    localStorage.setItem(LOCALSTORAGE_KEY, car);
  }

  _checkIsLogin() {
    return UserInfo.GetLocalUserLoginStatus();
  }

  /**
   * 从本地缓存读取车型
   * @return {[type]} [description]
   */
  GetCarFromLocal() {
    let car = localStorage.getItem(LOCALSTORAGE_KEY);
    // 取值时转换为对象
    if (car && typeof car === "string") {
      car = JSON.parse(car)
    }
    return car;
  }

  /**
   * 获取用户当前车型
   * 先从本地取，本地没有，走网络取
   * @return {Promise}
   */
  async GetCurrentCar() {
    const myCar = this.GetCarFromLocal();
    if (myCar) {
      return myCar;
    }
    return await this.GetDefaultCar();
  }

  async GetDefaultCar() {
    if (!this._checkIsLogin()) {
      return Promise.resolve(null);
    }

    const res = await getDefaultCarObject();
    if (res.code === SUCCESS_CODE) {
      const defaultCar = res.data;
      this._saveCarToLocal(defaultCar);
      return Promise.resolve(defaultCar);
    }
    return Promise.resolve(null);
  }
}

export default new VehicleInfo();
