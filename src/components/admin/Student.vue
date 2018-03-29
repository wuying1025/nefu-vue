<template>
  <div class="student">
  <h3>学生管理</h3>
  <el-row>
    <el-col :offset='3' :span='18'>
      <el-tabs v-model="activeName" >
        <el-tab-pane label="学生添加" name="first">
           <el-row >
           <el-col :span="18" :offset="5">
           <el-form ref="form" :model="form" label-width="60px">
              <el-row>
                  <el-col :span="8" class='grade'>
                       <el-form-item label="年级">
                          <el-date-picker
                            v-model="grade"
                            align="right"
                            type="year"
                            placeholder="选择年级">
                          </el-date-picker>
                        </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="学院">
                        <el-select v-model="selectcollege" clearable on-change='test' placeholder="请选择">
                          <el-option
                            v-for="item in college"
                            :key="item.c_id"
                            :label="item.name"
                            :value="item.c_id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="专业">
                      <el-select v-model="selectprofession"  placeholder="请选择">
                          <el-option
                            v-for="item in profession"
                            :key="item.c_id"
                            :label="item.name"
                            :value="item.c_id">
                          </el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
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
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                    <el-form-item label="学号">
                      <el-input v-model="form.num" type='number'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="姓名">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                    <el-form-item label="密码">
                        <el-input v-model='form.psd' ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="性别">
                        <el-radio class="radio" v-model="form.sex" label="男">男</el-radio>
                        <el-radio class="radio" v-model="form.sex" label="女">女</el-radio>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="5">
                <el-form-item >
                    <el-button type="primary" @click="onSubmit">添加</el-button>
                </el-form-item>
                </el-col>
              </el-row>
           </el-form>
           </el-col>
           </el-row>
        </el-tab-pane>
        <el-tab-pane label="学生查看" name="second">
            <el-col :span="18" :offset="5">
              <el-form ref="form" :model="form" label-width="60px">
                <el-row>
                  <el-col :span="8" class='grade'>
                    <el-form-item label="年级">
                      <el-date-picker
                        v-model="grade"
                        align="right"
                        type="year"
                        placeholder="选择年级">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学院">
                      <el-select v-model="selectcollege" clearable on-change='test' placeholder="请选择">
                        <el-option
                          v-for="item in college"
                          :key="item.c_id"
                          :label="item.name"
                          :value="item.c_id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="专业">
                      <el-select v-model="selectprofession"  placeholder="请选择">
                        <el-option
                          v-for="item in profession"
                          :key="item.c_id"
                          :label="item.name"
                          :value="item.c_id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
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
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :offset="4">
                    <el-form-item >
                      <el-button type="primary" @click="onSelect">查询</el-button>
                      <el-button type="primary" @click="onDelAll">删除选中</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            <el-table
              :data="studentshow"
              width='100%'
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>

              <el-table-column
                prop="s_num"
                label="学号">
              </el-table-column>
              <el-table-column
                prop="grade"
                label="年级"
                width="100">
              </el-table-column>
              <el-table-column
                prop="s_name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                width="100">
              </el-table-column>
              <el-table-column
                  prop="s_pass"
                  label="操作"
                  width='180'>
                  <template scope="scope">
                    <el-button @click="reset(scope.row)" type="text" size="small">重置密码</el-button>
                    <el-button type="text" @click="showUpdateInfo(scope.row)" size="small">修改</el-button>
                  </template>
                </el-table-column>
            </el-table>

            <el-col>
                <div class="block" >
                  <!-- <span class="demonstration">大于 7 页时的效果</span> -->
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size='pageSize'
                    layout="prev, pager, next"
                    :total="studentslen">
                  </el-pagination>
                </div>
            </el-col>
        </el-tab-pane>
        <el-tab-pane label="搜索" name="third">
            <el-row>
            <el-col :span="5" >
              <input class="search"  icon="search"  placeholder="搜索学号或姓名，回车" @keyup.enter="search" v-model="searchWhat">
            </el-col>


              <el-table
                :data="search_student"
                width='100%'>
                <el-table-column
                  prop="s_num"
                  label="学号">
                </el-table-column>
                <el-table-column
                  prop="grade"
                  label="年级"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="s_name"
                  label="姓名"
                  width="150">
                </el-table-column>
                <el-table-column
                prop="sex"
                label="性别"
                width="100">
              </el-table-column>
                <el-table-column
                  prop="s_pass"
                  label="操作"
                  width='150'>
                  <template scope="scope">
                    <el-button @click="reset(scope.row)" type="text" size="small">重置密码</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学号">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Axios from "axios"
  export default {
   data() {
        return {
        dialogFormVisible: false,
        selectcollege:'',
        college:'',
        profession:'',
        classlist:'',
        selectprofession:'',
        selectclass:'',
        form:{
          name: '',
          num:'',
          psd:'12345678',
          sex:'男',
          id:''
        },
        a_url:'http://127.0.0.1/nefu/Admin/',
        c_url:'http://127.0.0.1/nefu/Common/',
        s_url:'http://127.0.0.1/nefu/Student/',
        activeName: 'first',
        students:[],
        studentshow:[],
        grade:'',
        currentPage: 1,
        pageSize:10,
        studentslen:1,
        startsize:0,
        endsize:9,
        search_student:[],
        searchWhat:'',
        multipleSelection: [],
        row:{}
        }
      },
       watch: {
        selectcollege(val) {
         this.getPro(val);
         this.selectprofession = '';
         this.selectclass = '';
        },
        selectprofession(val) {
          this.selectclass = '';
          this.getClass(val);
        },
        grade(){
          this.selectclass = '';
          this.getClass(this.selectprofession);
        }
      },
      mounted:function(){
        if(this.$cookie.get('genre')!=1){
            this.$router.push('/admin');
          }
         this.getCollege();
          Axios.get(this.c_url+'all_student')
            .then((res)=>{
              this.students = res.data;
              this.studentshow =this.students.slice(0,9);
              this.studentslen =Number(this.students.length);
        });
      },
      methods: {
        //分页
        handleCurrentChange(val) {
        this.startsize = (val-1)*this.pageSize+0;
        this.endsize = (val-1)*this.pageSize+9;
        this.endsize=this.endsize>this.students.length?this.students.length:this.endsize;
        this.studentshow=this.students.slice(this.startsize,this.endsize);
        },
        //获取学院
        getCollege() {
            Axios.get(this.c_url+'get_college')
              .then((res)=>{
               this.college = res.data;
            });
        },
        //获取专业
        getPro(pid){
          Axios.get(this.c_url+'get_profession?pid='+pid)
              .then((res)=>{
               this.profession = res.data;
            });
        },
        //专业id 和 年级 获取班级
        getClass(pid){
          Axios.get(this.c_url+'get_class_by_pid_grade',{params:{
            pid:pid,
            grade:this.grade.getFullYear()
            }})
              .then((res)=>{
               this.classlist = res.data;
            });
        },
        onSelect() {
          Axios.get(this.c_url+'get_students_admin',{params:{
            college:this.selectcollege,
            profession:this.selectprofession,
            class:this.selectclass,
            grade:this.grade==''?'':this.grade.getFullYear()
          }})
            .then((res)=>{
              this.students = res.data;
              this.studentshow =this.students.slice(0,9);
              this.studentslen =Number(this.students.length);
            });
        },
        onDelAll(){
          //循环 multipleSelection； 删除学生信息
          var delId = [];
          for(var i=0;i<this.multipleSelection.length;i++){
            delId.push(this.multipleSelection[i].s_id);
          }
          if(delId.length > 0){
            this.$confirm('确认删除？')
              .then(_ => {

                Axios.get(this.c_url+'del_student',{params:{
                  delId:delId
                }})
                  .then((res)=>{
                    if(res.data > 0){
                      this.onSelect();

                    }
                  });
              })
              .catch(_ => {});
          }else{
            this.$message({
              type: 'error',
              showClose: true,
              message: '请选择学生'
            });
          }

        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(val);
        },
        onSubmit() {
          if(this.grade=='' || this.selectclass==''||this.form.num==''||this.form.name==''){
            this.$message({
                    showClose: true,
                    message: '请完善信息',
                    type: 'error'
                });
            return false;
          }

          Axios.get(this.a_url+'add_student',
            {
              params:{num:this.form.num,
              name:this.form.name,
              psd:this.form.psd,
              cid:this.selectclass,
              grade:this.grade.getFullYear(),
              college_id:this.selectcollege,
              sex:this.form.sex
            }})
            .then((res)=>{

              if(res.data=='success'){
                this.form.psd='12345678';
                this.form.name = '';
                this.$message({
                    type: 'info',
                    message: '添加完成'
                  });
              }else if(res.data=='has'){
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: '该学生已存在,不能重复添加'
                });
              }else if(res.data=='fail'){
                this.$message({
                    type: 'error',
                    showClose: true,
                    message: '添加失败'
                  });
              }
         });
        },
        reset:function (row) {
          this.$prompt('请输入重置密码', '重置', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          }).then(({ value }) => {
          Axios.get(this.s_url+'reset',{params:{
            s_id:row.s_id,newpwd:value}}).then((res)=>{
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
        },
        showUpdateInfo(row){
          this.dialogFormVisible = true;
          this.form.name = row.s_name;
          this.form.num = row.s_num;
          this.form.sex = row.sex;
          this.form.id = row.s_id;
          this.row = row;
        },
        updateInfo() {
            Axios.get(this.s_url+'udpate_student_Info',{params:{
              id:this.form.id,
              name:this.form.name,
              num:this.form.num,
              sex:this.form.sex
            }}).then((res)=>{
              if(res.data=='success'){
                this.dialogFormVisible = false;
                this.row.s_name = this.form.name;
                this.row.s_num = this.form.num;
                this.row.sex = this.form.sex;
                this.$message({
                  type: 'info',
                  message: '修改成功'
                });
              }else{
                this.$message({
                  type: 'error',
                  message: '修改失败'
                });
              }
            });

        },
        search:function () {
          var n = Number(this.searchWhat);
          var way='';
          if(isNaN(n)){
            way='name'
          }else{
            way='number'
          }
          Axios.get(this.a_url+'search',{params:{
            what:this.searchWhat,way:way}} )
            .then((res) => {
              if(res.data=='fail'){
                this.$message({
                   type: 'error',
                   message: '查无结果'
                });
              }else{
                this.search_student=res.data
              }
            });

        },
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

 .student h3{
  margin: 10px;
  text-align:center;
 }
 .el-tab-pane{
  margin: 10px;
 }

.block{
  margin: 20px 0;
  text-align: center;
}
</style>
<style>
  .grade .el-date-editor.el-input{
    width: 100%;
  }
  .student .el-input{
    width: 100%;
  }
  .search{
    text-indent: 20px;
    width: 100%;
    height: 30px;
    margin-bottom: 30px;
  }
</style>
