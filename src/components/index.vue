<template>
  <el-container class="content">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="./../assets/logo.png" alt>
        </el-col>
        <el-col :span="18">
          <h2>后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click="logout">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <el-aside width="200px" class="aside">
        <el-menu router
          default-active="2"
          class="el-menu-vertical-demo"
       >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>一级导航</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/users">
                <span class="el-icon-menu"></span> 二级导航
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
          
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  methods: {
    logout(){
      //清除token
      window.sessionStorage.removeItem('key');
      //跳转到登录页
      this.$router.push('/login');
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.content {
  height: 100%;
  //头部
  .header {
    background-color: #b3c0d1;
    line-height: 60px;

    h2 {
      text-align: center;
    }
  }
  //主体
  .container {
    display: flex;

    //左侧边栏
    .aside {
      background-color: white;
    }
    //内容区域
    .main {
      background-color: #e9eef3;
      padding-top: 0;
    }
  }
}
</style>
