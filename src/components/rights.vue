<template>
  <div>
    <!-- 面包屑 -->
      <bread sectitle="权限管理" threetitle="权限列表"></bread>
    <!-- 表格 -->
    <el-table :data="rightList" border style="width: 100%">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="180">
        <!-- 自定义内容 -->
        <template slot-scope="scope">
            <span v-if="scope.row.level==='0'">一级</span>
            <span v-else-if="scope.row.level==='1'">二级</span>
            <span v-if="scope.row.level==='2'">三级</span>
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
      rightList: [],
    };
  },
  methods: {
 
  },
  async created() {
    
     let res = await this.$axios.get('rights/list')
     console.log(res);
     this.rightList = res.data.data
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

</style>
