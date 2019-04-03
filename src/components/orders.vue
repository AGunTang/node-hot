<template>
  <div>
    <!-- 面包屑 -->
    <bread sectitle="订单管理" threetitle="订单列表"></bread>
    <!-- 表格 -->
    <el-table :data="orderList" border style="width: 100%">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.order_pay=='0'" type="danger" size="mini" plain>未付款</el-button>
          <el-button v-else type="success" size="mini" plain>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="180"></el-table-column>
      <el-table-column prop="create_time" label="下单时间" width="180">
        <template slot-scope="scope">{{scope.row.create_time | formate("YYYY-MM-DD HH:mm") }}</template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editOrder(scope.$index, scope.row)"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageData.pagesize"
      :current-page="pageData.pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>

    <!-- 编辑用户弹框 -->
    <el-dialog title="修改订单地址" :visible.sync="orderForm" width="30%">
      <el-form :model="orderFormData" ref="orderForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="省市区/县">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions"
          ></el-cascader>
          <v-distpicker></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址">
           <el-input ></el-input>
        </el-form-item>
            
        <el-form-item>
          <el-button @click="orderForm = false">取 消</el-button>
          <el-button type="primary" @click="addOrderForm('orderForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//导入城市库
import cityList from './../assets/city_data2017_element.js';
export default {
  name: "order",
  data() {
    return {
      selectedOptions:[],
      //城市列表
      options:[],
      //编辑弹框是否显示
      orderForm: false,
      //弹框数据
      orderFormData: {},
      //用户列表
      orderList: [{}, {}],
      pageData: {
        pagesize: 10,
        pagenum: 1
      },
      //页容量
      total: 0
    };
  },
  methods: {
    //编辑弹框事件
    editOrder(index, row) {
      console.log(index);
      console.log(row);
      //开启弹框
      this.orderForm = true;
    },
    //页码事件
    sizeChange(size) {
      console.log(size);

      this.pageData.pagesize = size;
      this.getOrder();
    },
    currentChange(current) {
      // console.log(current);

      this.pageData.pagenum = current;
      this.getOrder();
    },
    //获取订单列表
    async getOrder() {
      let res = await this.$axios.get("orders", { params: this.pageData });
      console.log(res);
      this.orderList = res.data.data.goods;
      this.total = res.data.data.total;
    }
  },
  created() {
    //调用订单列表
    this.getOrder();
    //赋值城市列表
    this.options = cityList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
</style>
