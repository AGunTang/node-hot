<template>
  <div class="login">
    <div class="box">
      <h2>用户登录</h2>
      <el-form label-position="top" label-width="80px">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="loging" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only #-->
<style scoped lang='scss'>
.login {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
      h2 {
          margin: 20px 0;
      }
    width: 550px;
    height: 420px;
    border-radius: 10px;
    padding: 35px;
    box-sizing: border-box;
    background-color: white;
    .loging {
        width: 100%;
    }
  }
}
</style>
