<template>
  <div class="admin">
  <h3>管理员管理</h3>
  <el-row>
  <el-col :offset='3' :span='18'>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="管理员列表" name="first">
          <el-table
            :data="admin"
            >
            <el-table-column
              prop="name"
              label="名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="a_account"
              label="账号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="c_name"
              label="学院"
             >
            </el-table-column>
             <el-table-column
              prop="grade"
              label="年级"
              width="100">
            </el-table-column>
            <el-table-column
              prop="genre"
              label="类别"
              width="100">
            </el-table-column>
            <el-table-column
              label="操作" width='120'>
              <template scope="scope">
                <el-button @click="reset(scope.row)" type="text" size="small">重置密码</el-button>
              </template>
            </el-table-column>
          </el-table>
    </el-tab-pane>
    <el-tab-pane label="新增管理员" name="second">
        <el-col :offset='8' :span='8'>
            <el-form :inline="true"  :model="form"  label-width="60px" class='add-admin'>
                        <el-form-item label="学院">
                            <el-select v-model="form.selectcollege" placeholder="请选择">
                              <el-option
                                v-for="item in college"
                                :key="item.c_id"
                                :label="item.name"
                                :value="item.c_id">
                              </el-option>
                           </el-select>
                        </el-form-item>
                        <el-form-item label="年级">
                          <el-date-picker
                              v-model="grade"
                              align="right"
                              type="year"
                              placeholder="选择年级">
                           </el-date-picker>
                        </el-form-item>
                        <el-form-item label="账号">
                            <el-input v-model="form.account" placeholder="管理员账号"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.psd" placeholder="管理员密码"></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="form.name" placeholder="管理员名称"></el-input>
                        </el-form-item>
                        <el-row>
                          <el-col :offset='8'>
                              <el-form-item>
                                  <el-button type="primary" @click='addAdmin'>添加</el-button>
                              </el-form-item>
                          </el-col>
                        </el-row>
            </el-form>
        </el-col>
    </el-tab-pane>
  </el-tabs>
  </el-col>
  </el-row>
  </div>
</template>

<script>
  import Axios from "axios"

export default {
 data() {
      return {
      admin:[],
      college:[],
      grade:new Date(),
      form:{
         account:'',
         selectcollege:'',
         psd:'',
         name:''
      },
      activeName: 'first',
      c_url:'http://222.27.161.5/nefu/Common/',
      a_url:'http://222.27.161.5/nefu/Admin/'
      }
    },
    mounted:function(){
      if(this.$cookie.get('genre')!=1){
          this.$router.push('/admin');
        }
       this.getAdmin();
       this.getCollege();
       },
    methods: {
      //获取管理员
      getAdmin() {
          Axios.get(this.a_url+'get_all_admin')
            .then((res)=>{
             this.admin = res.data;
          });
      },
      //获取学院
       getCollege() {
          Axios.get(this.c_url+'get_college')
            .then((res)=>{
             this.college = res.data;
          });
      },
      addAdmin(){
        Axios.get(this.a_url+'add_admin',
          {params:{
            account:this.form.account,
            psd:this.form.psd,
            college:this.form.selectcollege,
            name:this.form.name,
            grade:this.grade.getFullYear()
        }})
            .then((res)=>{
              if(res.data=='success'){
                this.getAdmin();
                this.form.account = '';
                this.form.psd ='';
                this.form.name = '';
              }

          });
      },
      reset:function(row){
        this.$prompt('请输入重置密码', '重置', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          Axios.get(this.a_url+'reset',{params:{
            a_id:row.a_id,newpwd:value}}).then((res)=>{
             if(res.data=='success'){
               this.$message({
                   type: 'info',
                   message: '重置成功'
                });
             }else{
               this.$message({
                   type: 'error',
                   message: '重置失败'
                });
             }
          });
        }).catch(() => {
        });
       
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  h3{
      text-align: center;
      margin:20px;
  }
</style>
<style>
  .admin .add-admin .el-select .el-input__inner{
    padding-right: 10px;
  }
</style>