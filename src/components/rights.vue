<template>
  <div>
    <!-- 面包屑 -->
      <bread sectitle="权限管理" threetitle="权限列表"></bread>
    <!-- 表格 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="username" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="email" label="路径" width="180"></el-table-column>
      <el-table-column prop="email" label="层级" width="180"></el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      userList: [],
    };
  },
  methods: {

 
  },
  created() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

</style>
