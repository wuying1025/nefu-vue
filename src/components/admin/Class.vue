<template>
  <div class="class">
  <h3>班级管理</h3>
  <el-row>
  <el-col :offset='3' :span='18'>
  <el-tabs v-model="activeName" @tab-click="allClass">
    <el-tab-pane label="添加班级" name="first" >
        <el-form :inline="true"  :model="form" label-width="60px">
                        <el-form-item label="学院">
                            <el-select v-model="selectcollege" placeholder="请选择">
                              <el-option 
                                v-for="item in college"
                                :key="item.c_id"
                                :label="item.name"
                                :value="item.c_id">
                              </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="专业">
                          <el-select v-model="form.selectprofession" placeholder="请选择">
                            <el-option
                              v-for="item in profession"
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
                      <el-form-item label="班级">
                        <el-input v-model="form.classname" placeholder="添加班级"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="addClass">添加</el-button>
                      </el-form-item>
        </el-form>
    </el-tab-pane>
    <el-tab-pane label="查看班级" name="second" >
    <el-col :span="20" :offset="2">
         <el-table :data="classlistshow" >
            <el-table-column
              prop="grade"
              label="年级"
              width="150">
            </el-table-column>
             <el-table-column
              prop="c_name"
              label="专业名称"
               >
            </el-table-column>
           <el-table-column
              prop="class_name"
              label="班级名"
              width="150">
            </el-table-column>
        </el-table>
        </el-col>
         <el-col>
        <div class="block" >
          <!-- <span class="demonstration">大于 7 页时的效果</span> -->
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size='pageSize'
            layout="prev, pager, next"
            :total="classlistlen">
          </el-pagination>
        </div>
      </el-col>
    </el-tab-pane>
  </el-tabs >
  </el-col>
  </el-row>
      
  </div>
</template>

<script>
  import Axios from "axios"

export default {
 data() {
      return {
      college:[],
      profession:[],
      selectcollege:'',
      activeName:'first',
      classlist:[],
      grade:new Date(),
      form:{
        classname:'',
        selectprofession:''
      },
      c_url:'http://222.27.161.5/nefu/Common/',
      a_url:'http://222.27.161.5/nefu/Admin/add_class',
      // class:[],
      classlistshow:[],
      currentPage: 1,
      pageSize:10,
      classlistlen:1,
      startsize:0,
      endsize:9
      }
    },
    watch: {
      selectcollege(val) {
       this.getPro(val);
       this.form.selectprofession = '';
      }
    },
    mounted:function(){
      if(this.$cookie.get('genre')!=1){
          this.$router.push('/admin');
        }
       this.getCollege();
        Axios.get(this.c_url+'get_all_class')
            .then((res)=>{
            this.classlist = res.data;
            this.classlistshow =this.classlist.slice(0,9);
            this.classlistlen =Number(this.classlist.length);
        });
    },
    methods: {
      //获取所有学院
      getCollege() {
          Axios.get(this.c_url+'get_college')
            .then((res)=>{
             this.college = res.data;
          });
      },
      // 获取专业
      getPro(pid){
        Axios.get(this.c_url+'get_profession?pid='+pid)
            .then((res)=>{
             this.profession = res.data;
          });
      },

      //添加班级
      addClass(){
        Axios.get(this.a_url,{params:{
          c_id:this.selectcollege,
          p_id:this.form.selectprofession,
          name:this.form.classname,
          grade:this.grade.getFullYear()
        }})
          .then((res)=>{
              if(res.data=='success'){
                this.form.classname = '';
              }
       });
      },
      allClass:function(){
          Axios.get(this.c_url+'get_all_class')
            .then((res)=>{
            this.classlist = res.data;
           
          });
      },
      //分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.startsize = (val-1)*this.pageSize+0;
        this.endsize = (val-1)*this.pageSize+9;
        this.endsize=this.endsize>this.classlist.length?this.classlist.length:this.endsize;
        this.classlistshow=this.classlist.slice(this.startsize,this.endsize);
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  .class .el-table{
   overflow: hidden;
 }
 .class h3{
  margin: 10px;
  text-align:center;
 }
 .el-tab-pane{
  margin: 10px;
 }
 .el-form{
  text-align: center;
  margin-top: 50px
 }
 .col .el-button{
  margin-top: 50px;
 }
 .block{
  margin: 20px 0;
  text-align: center;
}
.el-date-editor.el-input{
  width: 100%;
}
</style>
<style>
.class .el-form--inline .el-form-item{
  display: block;
}
 .class .el-form-item>div{
  width: 217px;
 }
</style>
