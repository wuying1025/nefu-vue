<template>
	<div class="message_back">

  <el-table
    :data="messageList"
    border
    style="width:80%;margin:20px auto;">
   
    <el-table-column
      label="回复"
      prop='u_name'
      width="100">
    </el-table-column>
    <el-table-column
      prop="m_content"
      label="内容">
    </el-table-column>
     <el-table-column
      prop='m_time'
      label="时间"
      width="200">
    </el-table-column>
    <el-table-column label="操作" width='100'>
      <template scope="scope">
        <el-button
          class="delete"
          size="small"
          type="danger"
          @click="open2(scope.row.m_id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
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
      this.getReply();
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
	  open3:function(){
	    this.$prompt('请回复留言', '留言', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	    }).then(({ value }) => {
	    	Axios.get(this.url+'add_message',{params:{
	    		uid:this.$cookie.get('s_id'),
	    		content:value,
	    		u_name:this.studentName
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
	},
	open2(mid) {
    this.$confirm('此操作将永久删除该回复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteReply(mid);
        });
  },
  getReply:function(){
          Axios.get(this.c_url+'get_my_reply_aid/?a_id='+this.$cookie.get('a_id'))
            .then((res)=>{
              this.messageList = res.data;
           });
  },
  deleteReply:function(mid){
        Axios.get(this.c_url+'delete_reply/?m_id='+mid)
        .then((res)=>{
           if(res.data=='success'){
             this.getReply();
           }
        });
      }
    }
  }
</script>

<style scoped>
.nav{
  margin: 30px;
}
.message_back .el-table{
	margin-top: 30px;
}
.message_back .el-table .el-tag{
	background-color: #56b366;
}
.message_back .el-table .delete{
	background-color: #efefef;
	border-color: #ccc;
	color:#000;
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
</style>