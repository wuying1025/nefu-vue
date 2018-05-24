<template>
<div class="messagelist">
      <el-col :span="2" class="nav" >
        <el-menu default-active="1" class="el-menu-vertical-demo" >
          <el-menu-item index="1" >查看留言</el-menu-item>
            <router-link to='/admin/message_back'>
          <el-menu-item index="2" >我的回复</el-menu-item>
            </router-link>
        </el-menu>
      </el-col>
<el-col :span="18" :offset='1'>
  <el-table
    :data="messageList"
    border
    style="width: 1000px">

    <el-table-column
      prop='u_name'
      label="姓名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="m_content"
      label="留言内容">
    </el-table-column>
     <el-table-column
      prop='m_time'
      label="日期"
      width="200">
    </el-table-column>
    <el-table-column label="操作" width='100'>
      <template scope="scope">
      <el-button
          size="small"
          @click="open3(scope.row)">回复</el-button>
      </template>
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
        c_url:'http://222.27.161.5/nefu/Common/',
        messageList:[]
      }
    },
    mounted:function(){
      Axios.get(this.c_url+'get_message_by_aid/?a_id='+this.$cookie.get('a_id'))
      .then((res)=>{
        this.messageList = res.data;
      });
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
	  open3:function(row){
	    this.$prompt('输入内容', '留言回复', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	    }).then(({ value }) => {
  	    	Axios.get(this.c_url+'reply_message',{params:{
  	    		uid:row.u_id,
  	    		content:value,
  	    		u_name:row.u_name,
            aid:this.$cookie.get('a_id')
  	    	}})
  	      .then((res)=>{
  	         	if(res.data=='success'){
  					this.$message({
  		            	type: 'info',
  		            	message: '回复完成'
  		          		});
  	         	}else{
  					this.$message({
  		            	type: 'danger',
  		            	message: '回复失败'
  		          		});
  	         	}
           });
        });
	     }
    }
  }
</script>

<style scoped>
.nav{
  margin: 30px;
}
.el-menu{
  background-color: #fff;
  border:1px solid #ccc;
  text-align: center;  
}

.el-menu .el-menu-item{
  float: left;
  width: 112px;
}
.messagelist .el-table{
	margin-top: 30px;
}
.messagelist .el-table .el-tag{
	background-color: #56b366;
}
.messagelist .el-table .delete{
	background-color: #efefef;
	border-color: #ccc;
	color:#000;
}
</style>