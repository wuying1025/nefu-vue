<template>
<div class="admin">
	 <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo student-menu" mode="horizontal" >
	 <div class="header">
	 	<img src="../../assets/img/logo.png" alt="">
	 </div>
	 <span class="title">学生综合评测系统</span>
	 <el-submenu index="4" >
		   	<template slot="title">
		   		<span v-text='adminName'></span>
		   	</template>
		   	<router-link to='/admin/admin_center'>
		   		<el-menu-item index="4-1">个人中心</el-menu-item>
		   	</router-link>
		    <el-menu-item index="4-2" @click='logout'>退出</el-menu-item>
	  </el-submenu>
	  <el-submenu index="3"  v-if='genre'>
		   	<template slot="title">日志管理</template>
		   	<router-link to='/admin/stu_log'>
		   			<el-menu-item index="3-1" >学生日志</el-menu-item>
		   	</router-link>
		    <router-link to='/admin/admin_log'>
		   			<el-menu-item index="3-2" >导员日志</el-menu-item>
		   	</router-link>
	  </el-submenu>
	   <el-menu-item index="2"  @click='Item' v-if='genre'>奖项管理</el-menu-item>
     <el-menu-item index="8" v-if='genre'  @click='getSearch'>查询获奖</el-menu-item>
		 <router-link to='/admin/grade_check'>
		 		<el-menu-item index="9">成绩管理</el-menu-item>
		 </router-link>
	  <el-submenu index="1"  v-if='genre'>
		   	<template slot="title">
		   	基础信息管理
		   	</template>
		   	 <router-link to='/admin/college'>
		   			<el-menu-item index="1-1" >学院管理</el-menu-item>
		   	</router-link>
		   	<router-link to='/admin/class'>
		   			<el-menu-item index="1-2" >班级管理</el-menu-item>
		   	</router-link>
		   	<router-link to='/admin/student'>
		   	<el-menu-item index="1-3" >学生管理</el-menu-item>
		   	</router-link>

		   	<router-link to='/admin/college_admin' >
		   			<el-menu-item index="1-4" >导员管理</el-menu-item>
		   	</router-link>
	  </el-submenu>
	  <el-menu-item index="5" v-if='!genre'  @click='prize_info'>录入信息</el-menu-item>
	  <el-menu-item index="6" v-if='!genre'  @click='lookInput'>班级信息</el-menu-item>
	  <el-menu-item index="7" v-if='!genre'  @click='getPrize'>获奖学生</el-menu-item>
    <el-menu-item index="8" v-if='!genre'  @click='getSearch'>查询获奖</el-menu-item>
	</el-menu>
	<router-view></router-view>
</div>
</template>
<script>
import Axios from "axios"
export default {
    data() {
      return {
        activeIndex: '1',
        genre:false,
        adminName:''
      };
    },
    mounted:function(){
    	//不能获取cookie 跳转到登录页
    	if(!this.$cookie.get('a_id')){
        this.$router.push('/');
      }else{

        this.adminName =  this.$cookie.get('a_name');
        //类别判断是否是超级管理员
        if(this.$cookie.get('genre')==1){
          this.genre = true;
          this.$router.push('/admin/item');
        }else{
        //普通管理员
		this.$router.push('/admin/check');
        }
      }
    },
     methods: {
     	 logout:function(){
	        this.$cookie.delete('a_id');
	        this.$cookie.delete('grade');
	        this.$cookie.delete('college_id');
	        this.$router.push('/');
      	},
      	lookInput:function(){
      		this.$router.push('/admin/check');

      	},
      	Item:function(){
      		this.$router.push('/admin/item');
      	},
      	prize_info:function(){
      		this.$router.push('/admin/prize_info');
      	},
      	message:function(){
      		this.$router.push('/admin/message');
      	},
      	getPrize:function(){
      		this.$router.push('/admin/get_prize');
      	},
        getSearch () {
          this.$router.push('/admin/get_search');
        }


    }
}
</script>
<style>
	.student-menu .el-menu-item{
		float: right;
	}
	.admin .el-submenu{
		float: right;
	}
	.admin .el-submenu .el-menu-item{
		min-width:100px;
	}

</style>
<style scoped>
	.header img{
		float: left;
	    width: 40px;
	    padding: 10px;
	}

	.title{
	  color: #ccc;
	  float: left;
	  font-size: 20px;
	  font-weight: normal;
	  line-height: 60px;
	  display: inline-block;
	  text-align: center;
	}
	.user-name{
		line-height: 60px;
		display: inline-block;
	}
</style>
