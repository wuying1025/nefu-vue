<template>
  <div>
  <h3>管理员日志</h3>
  <el-col :span="18" :offset="3">
    <el-table
      :data="tableData"
      max-height="500"
      border
      >
      <el-table-column
        prop="a_account"
        label="账号"
        width='150'>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width='120'>
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        width='200'>
      </el-table-column>
      <el-table-column
        prop="do"
        label="操作">
      </el-table-column>
    </el-table>
    </el-col>
  </div>
</template>
<script>
  import Axios from "axios"
  export default {
    name: 'stu',
    data() {
      return {
        tableData: [],
        a_url:'http://127.0.0.1/nefu/Admin/'
      };
    },
    mounted:function(){
      Axios.get(this.a_url+'get_all_admin_log')
        .then((res)=>{
          this.tableData = res.data;
        })
    },
    methods: {

    }
  }
</script>
<style>


</style>
<style scoped>
  h3{
      text-align:center;
      margin:20px;
  }
</style>
