<template>
  <div class="my_message">
    <el-col :span="18" :offset='1'>
    <el-tabs v-model="activeName" >
        <el-tab-pane label="我的留言" name="first">
            <el-table
            :data="messageList"
            border

            width='100%'>
                  <el-table-column
                    prop="m_content"
                    label="留言内容">
                  </el-table-column>
                   <el-table-column
                    prop='m_time'
                    label="日期"
                    width="200">
                  </el-table-column>
           </el-table>
        </el-tab-pane>
        <el-tab-pane label="回复我的" name="second">
            <el-table
                :data="replylist"
                border
                width='100%'
               >
                      <el-table-column
                        prop="m_content"
                        label="留言内容">
                      </el-table-column>
                       <el-table-column
                        prop='m_time'
                        label="日期"
                        width="200">
                      </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>

    </el-col>
   </div>
</template>

<script>
  import Axios from "axios"
  export default {
    data() {
      return {
        c_url:'http://222.27.161.5/nefu/Common/',
        messageList:[],
        replylist:[],
        activeName: 'first',
      }
    },
    mounted:function(){
      this.getMessage();
      this.getReply();
    },
    methods: {
      getMessage:function(){
          Axios.get(this.c_url+'get_message_by_sid/?s_id='+this.$cookie.get('s_id'))
          .then((res)=>{
             this.messageList = res.data;
          });
      },
      getReply:function(){
          Axios.get(this.c_url+'get_my_reply_sid/?s_id='+this.$cookie.get('s_id'))
            .then((res)=>{
              this.replylist = res.data;
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
.my_message .el-table{
	/*margin-top: 30px;*/
}
.my_message .el-table .el-tag{
	background-color: #56b366;
}
.my_message .el-table .delete{
	background-color: #efefef;
	border-color: #ccc;
	color:#000;
}
</style>