<template>
  <div class="login">
    <div class="box">
      <h2>用户登录</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="top"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('ruleForm')" type="primary">登录</el-button>
          <el-button @click="resetForm('ruleForm')" type="success">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        password: "",
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度3到10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度6到16个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //提交按钮事件
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //判断成功
        } else {
          //判断失败
          this.$message.error("填写有误");
          return false;
        }
      });
    },
    //重置按钮事件
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
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
