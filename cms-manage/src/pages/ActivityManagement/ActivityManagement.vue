<template>
  <div class="activity-container">
    <el-col :span="4" class="nav">
      <el-menu
        default-active="1-1"
        unique-opened:true
        class="el-menu-vertical-demo"
        background-color="rgb(48, 65, 86)"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>项目管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item class="asideMenu-item" index="1-1"
              >页面管理</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <div class="right">
      <activityTable />
    </div>
  </div>
</template>

<script>
import activityTable from '@/components/activityTable'
export default {
  components: {
    activityTable
  }
}
</script>

<style scoped>
.nav {
  background-color: rgb(48, 65, 86);
  margin-right: 10px;
}
.right {
  width: 100%;
}
.activity-container {
  height: 100%;
  display: flex;
}
.asideMenu-item {
  padding-left: 50px !important;
}
</style>
