<template>
  <div>
    <!-- 面包屑 -->
      <bread sectitle="权限管理" threetitle="角色管理"></bread>
    <!-- 输入框 -->

    <el-row>
      <el-col :span="7">
        <el-button type="success" @click="addUser=true" plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="username" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="email" label="角色描述" width="180"></el-table-column>
      <el-table-column prop="mobile" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            plain
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            type="danger"
            @click="delUser(scope.row)"
            size="mini"
            plain
            icon="el-icon-delete"
            circle
          ></el-button>
          <el-button
            type="warning"
            size="mini"
            @click="upRoleUser(scope.row)"
            plain
            icon="el-icon-check"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

  
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {

    }
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
