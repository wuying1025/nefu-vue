<template>
  <div>
    <el-row>
      <el-col :span="4" class="nav">
        <el-menu default-active="1" class="el-menu-vertical-demo" theme="dark">
          <el-menu-item index="1" @click="query_result">成绩查看</el-menu-item>
          <el-menu-item index="2" @click="input_result">成绩录入</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="19" class="content">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods:{
        query_result:function(){
                this.$router.push('/student/literature/S_w_query');
            },
        input_result:function(){
                this.$router.push('/student/literature/S_w_input');
            },
  }
}
</script>
<style scoped>
  .nav{
    margin: 20px;
    text-align:center;
  }
.content{
  padding:40px 0;
  margin-top: 20px;
  /* height: 500px; */
  background: #eee;
}
</style>

