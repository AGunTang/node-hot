<template>
  <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ sectitle }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ threetitle }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: ["sectitle","threetitle"],
  
};
</script>

<style>
.breadcrumb {
  height: 50px;
  background-color: #d3dce6;
  line-height: 50px;
  padding-left: 15px;
}
</style>
