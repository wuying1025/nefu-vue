<template>
  <div class="check">
  <el-row>  
  
  <h3>{{grade}}级学生信息</h3>
  <el-col :span='20' :offset='4'>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="专业">
              <el-select v-model="selectprofession" placeholder="请选择">
                <el-option
                  v-for="item in profession"
                  :key="item.c_id"
                  :label="item.name"
                  :value="item.c_id">
                </el-option>
             </el-select>
            </el-form-item>
      <el-form-item label="班级">
              <el-select v-model="selectclass" placeholder="请选择">
                <el-option
                  v-for="item in classlist"
                  :key="item.id"
                  :label="item.class_name"
                  :value="item.id">
                </el-option>
             </el-select>
            </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="allStudent">全部学生</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  <el-col :span="16" :offset='4'>
  <el-table v-show='allshow'
    :data="allData"
    border
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="s_id"
      label="ID号"
      sortable
      width="180">
    </el-table-column>
     <el-table-column
      prop="grade"
      label="年级"
      width="180">
    </el-table-column>
    <el-table-column
      prop="s_num"
      label="学号"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="s_name"
      label="姓名"
      >
    </el-table-column>
  </el-table>
   <el-table
   v-show='classshow'
    :data="classData"
    border
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >

    <el-table-column
      prop="s_id"
      label="ID号"
      sortable
      width="120">
    </el-table-column>
     <el-table-column
      prop="grade"
      label="年级"
      width="100">
    </el-table-column>
    <el-table-column
      prop="s_num"
      label="学号"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="s_name"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      label='班长'
      width="60">
      <template scope="scope">
         &nbsp;
         <el-tooltip class="item" effect="dark" 
         content="点击取消班长" placement="right">
         <span @click='cancelMonitor(scope.row)'><i class="el-icon-check" 
              v-if='scope.row.is_monitor!=0'></i></span>
         </el-tooltip>
        <el-tooltip class="item" effect="dark" 
        content="点击选为班长" placement="right">
        <span @click='exChange(scope.row)'><i class="el-icon-plus" 
              v-if='scope.row.is_monitor==0'></i></span>
        </el-tooltip>
      </template>
    </el-table-column>
    
  </el-table>
    </el-radi-group>
  </el-col>
</el-row>
 
  </div>
</template>

<script>
  import Axios from "axios"
  export default {
    data() {
      return {
        profession:[],
        classlist:'',
        college_id:'',
        grade:'',
        selectprofession:'',
        selectclass:'',
        current:'全部',
        page:'',
        formInline: {
          name: '',
          num:'',
          psd:'12345678'
        },
        a_url:'http://127.0.0.1/nefu/Admin/',
        c_url:'http://127.0.0.1/nefu/Common/',
        allData: [],
        classData:[],
        allshow:true,
        classshow:false,
        monitor:''
      }
    },
    watch: {
      selectprofession(val) {
        this.getClass(val);
       this.selectclass = '';
      }
    },
     mounted:function(){
        this.grade = this.$cookie.get('grade');
        this.college_id = this.$cookie.get('college_id');
        this.getPro();
        Axios.get(this.c_url+'get_all_student_by_grade_college',{params:{
              grade:this.$cookie.get('grade'),
              college_id:this.$cookie.get('college_id')
            }}).then((res)=>{
              this.allData = res.data;
        });
    },
    methods: {
      //专业获取
      getPro(pid){
        Axios.get(this.c_url+'get_profession?pid='+this.college_id)
            .then((res)=>{
             this.profession = res.data;
          });
      },
      getClass(pid){
        Axios.get(this.c_url+'get_class_by_pid_grade',{params:{
          pid:pid,
          grade:this.grade
        }})
            .then((res)=>{
             this.classlist = res.data;
          });
      },
      onSubmit() {
        if(this.selectclass!=''){
          Axios.get(this.c_url+'get_student_by_class_id',{params:{
            class_id:this.selectclass
          }}).then((res)=>{
            this.classData = res.data;
            this.classshow = true;
            this.allshow = false;
          });
        }
      },
      //通过年级和学院查询所有学生
      allStudent:function(){
        Axios.get(this.c_url+'get_all_student_by_grade_college',{params:{
            grade:this.$cookie.get('grade'),
            college_id:this.$cookie.get('college_id')
          }}).then((res)=>{
            this.allData = res.data;
            this.selectclass = '';
            this.classshow = false;
            this.allshow = true;
        });
      },
      exChange:function(row){
        this.$confirm('是否选定 '+row.s_name+' 为班长, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //查找班长id
        if(this.monitor==''){
          for(var i=0;i<this.classData.length;i++){
            if(this.classData[i].is_monitor == 1){
            this.monitor = this.classData[i];
            break;
            }
          }
        }
        //已设定班长
        if(this.monitor.is_monitor == 1){
            Axios.get(this.a_url+'exChange_monitor',{
            params:{new_id:row.s_id,old_id:this.monitor.s_id}}).then((res)=>{
             if(res.data=='success'){
              this.$message({
                  type: 'warning',
                  message: '设定完成!'
              });
              row.is_monitor = 1;
              this.monitor.is_monitor = 0;
              this.monitor = row;
             }
            });
        }else{//未设定班长
          Axios.get(this.a_url+'set_monitor',{
            params:{s_id:row.s_id}}).then((res)=>{
             if(res.data=='success'){
              this.$message({
                  type: 'warning',
                  message: '设定完成!'
              });
              row.is_monitor = 1;
              //班长标示
              this.monitor = row;
             }
            });
        } 
        }).catch(() => {
              this.$message({
                  type: 'error',
                  message: '设定失败!'
              });     
        });
      },
      //取消班长
      cancelMonitor:function(row){
        this.$confirm('是否取消 '+row.s_name+' 的班长权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Axios.get(this.a_url+'cancel_monitor',{
            params:{s_id:row.s_id}}).then((res)=>{
             if(res.data=='success'){
              this.$message({
                  type: 'warning',
                  message: '已取消!'
              });
              row.is_monitor = 0;
              //保证班长唯一性
              this.monitor = '';
             }
            });
        }).catch(() => {
              this.$message({
                  type: 'error',
                  message: '设定失败!'
              });     
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  h3{
    margin: 10px;
    text-align: center;  
  }
  .el-form{
    margin: 10px;
  }
  

</style>
<style>
  
  .check .el-table .cell,.check .el-table th>div{
    padding: 3px 5px;
  }
</style>
