// mixin
import {Auth} from '@bigbighu/cms-utils'
import settings from '@/settings'

export default {
  computed: {
    userInfo() {
      return new Auth(settings.PREFIX).getUserInfo()
    },
    // 是否是超管
    isSuperAdmin() {
      try {
        let roleCode = []
        new Auth(settings.PREFIX).getRoles().map(curr => {
          roleCode.push(curr.roleCode)
        })
        return roleCode.indexOf('JS000001') > -1
      } catch (error) {
        return false
      }
    }
  }
}
