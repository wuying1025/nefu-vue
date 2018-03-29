<template>
  <div>
    <el-row>
      <el-col :span="4" class="nav">
        <el-menu default-active="1" class="el-menu-vertical-demo" theme="dark">
            <el-menu-item index="1" @click='password'>修改密码</el-menu-item>
            <el-menu-item index="2" @click='message'>查看留言</el-menu-item>
            <el-menu-item index="3" @click='message_back'>我的回复</el-menu-item>
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

    data() {
      return {
        genre:false

      };
    },
    mounted:function(){
        if(this.$cookie.get('genre')==1){
            this.genre = true;
        }
    },
  methods: {

    password:function () {
      this.$router.push('/admin/admin_center/password');
    },
    message:function(){
      this.$router.push('/admin/admin_center/message');
    },
    message_back:function () {
      this.$router.push('/admin/admin_center/message_back');
    }
  }
}
</script>
<style>


</style>
<style scoped>

  .nav{
    margin: 20px;
  }
.content{
  margin-top: 20px;
  height: 600px;
  background: #eee;
}

</style>
