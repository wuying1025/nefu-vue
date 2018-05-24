<template>
  <div>
   
<el-row>
      <el-col :span="4" class="nav">
        <el-menu default-active="1" class="el-menu-vertical-demo" theme="dark">
          <el-menu-item index="1" @click="grade_input">录入</el-menu-item>
          <el-menu-item index="2" @click="grade_see">查看</el-menu-item>    
        </el-menu>
      </el-col>
      <el-col :span="19" class="content">
        <router-view></router-view>
      </el-col>

    </el-row>
  </div>
</template>
<script>
  import Axios from "axios"
  export default {
    name: 'stu',
    data() {
      return {
      };
    },
    mounted:function(){
     
    },
    methods: {
    grade_input:function(){
      this.$router.push('/student/grade_man/grade_input');
    },
    grade_see:function () {
      this.$router.push('/student/grade_man/grade_see');
    }
  }
}

</script>

<style scoped>

  .nav{
    margin: 20px;
    text-align:center;
  }
.content{
  margin-top: 20px;
  background: #eee;
}
</style>
