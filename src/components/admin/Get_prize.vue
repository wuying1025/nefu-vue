<template>
  <div class="get_prize">
     <h3>获奖学生信息</h3>
     <el-col :span="18" :offset='3'>
     <el-table
          :data="allList"
          border
          width='100%'
         >
            <el-table-column
            prop="u_name"
            label="姓名"
            width='120'>
            </el-table-column>
            <el-table-column
            prop='i_name'
            label="奖项">
            </el-table-column>
            <el-table-column
              prop='get_time'
              label="日期"
              width="200">
            </el-table-column>
     </el-table>
     </el-col>
  </div>
</template>

<script>
  import Axios from "axios"
  export default {
    data() {
      return {
         a_url:'http://127.0.0.1/nefu/Admin/',
         allList:[]
      }
    },
    watch: {},
    mounted:function(){
        this.grade = this.$cookie.get('grade');
        this.college_id = this.$cookie.get('college_id');
        Axios.get(this.a_url+'get_prize_info_by_college_grade',{params:{
              grade:this.grade,
              college_id:this.college_id
            }})
            .then((res)=>{
              this.allList = res.data;
            });
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  h3{
      text-align:center;
      margin:20px;
  }
</style>
