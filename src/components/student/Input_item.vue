<template>
  <div class="input-item">
      <!-- 选项列表 -->
      <el-row>
        <el-col :span='3' :offset='1'>
              步骤如下：
             <el-steps :space="100" direction="vertical" :active="step">
                <el-step title="选择奖项"></el-step>
                <el-step title="选择学生"></el-step>
                <el-step title="确定奖项"></el-step>
             </el-steps>
        </el-col>
        <el-col :span="18" >
            <el-tooltip class="item" effect="dark" content="项目分类" placement="top">
                <ul id="items1">
                      <li @click='allitems' :class='{current:allitem}' class="search">所有奖项</li>
                      <li v-for='(item,index) in items1' 
                      @click="changeItem2(item.id,index)" 
                      :class="{current:item.iscurrent}">
                     {{item.name}}
                      </li>
                </ul>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="项目类别" placement="top">  
                <ul id='items2'>
                      <li class="search">
                          <i class="fa fa-search"></i>
                          <input 
                          placeholder="请输入内容" 
                          @keyup="filter2"
                          @blur ="item2msg= '';" 
                          v-model="item2msg"></input>
                      </li>
                      <li v-for='(item,index) in items2' 
                      @click="changeItem3(item.id,index)"
                       :class="{current:item.iscurrent}">
                      {{item.name}}
                      </li>
                      <li v-show='!items2.length'>暂无数据</li>
                </ul>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="指标名称" placement="top">  
                <ul id="items3">
                      <li class="search">
                          <i class="fa fa-search"></i>
                          <input 
                          placeholder="请输入内容"
                          @keyup="filter3"
                          @blur ="item3msg= '';"
                          v-model="item3msg" ></input>
                      </li>
                      <li v-for='item in items3'  @click="openCheckBox(item.name,item.id)">
                      {{item.name}}
                      </li>
                      <li v-show='!items3.length'>暂无数据</li>
                </ul>
            </el-tooltip>
        </el-col>
      </el-row>

      <!-- 添加的奖项信息表 -->
      <el-dialog title="添加的获奖信息" :visible.sync="itemTable">
          <el-table :data="getItems"  max-height="250"  >
              <el-table-column  prop="u_name" label="姓名"  width="120">
              </el-table-column>
              <el-table-column prop="i_name" label="奖项" >
              </el-table-column>
              <el-table-column prop="add_time" label="时间" width="130">
              </el-table-column>
              <el-table-column  label="操作"  width='90' >
                    <template scope="scope">
                      <el-button  @click.native.prevent="deleteRow(scope.$index)"
                        type="text" size="small"> 移除 </el-button>
                    </template>
              </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
              <el-button @click="closeTable">关 闭</el-button>
              <el-button type="primary" @click="inputItem">录 入</el-button>
          </div>  
          
      </el-dialog>
      <!-- 查看添加的信息 -->
      <div v-if='getItems.length' class="look-all">
        <el-button  @click='openTable'>查看</el-button> 
      </div>

      <!-- 选择学生弹框 -->
      <el-dialog title="选择获奖同学" :visible.sync="dialogCheckBoxVisible">
                  <div class="header">
                      <strong class="title" v-text='itemName'></strong>
                      
                  </div>
                  <div class="student-list">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="checkList" >
                        <el-checkbox 
                        :label="student"
                        v-bind:key="student.s_id" 
                        v-for='(student,key) in students'>
                        {{student.s_name}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div slot="footer" class="dialog-footer">
                    <span class="term_time">
                      选择获奖时间
                        <span class='year'><el-date-picker
                            v-model="add_time.year"
                            align="right"
                            type="year"
                            size = 'small'
                            placeholder="选择年">
                          </el-date-picker> 年
                        </span>
                        <span class='term'><el-select 
                            v-model="add_time.term" placeholder="学期" size = 'small'>
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </span>
                    </span>
                    <el-button @click="closeCheckBox">取 消</el-button>
                    <el-button type="primary" @click="addStudent">确 定</el-button>
                  </div>  
      </el-dialog>
   
  </div>

  </template>
 
<script>
  import Axios from "axios"
export default {
    data () {
      return {
        dialogCheckBoxVisible: false,
        itemlist:[],
        items1:[],
        items2:[],
        items3:[],
        allitems2:[],
        allitems3:[],
        item2msg:'',
        item3msg:'',
        students:[],
        step:1,
        c_url:'http://127.0.0.1/nefu/Common/',
        s_url:'http://127.0.0.1/nefu/Student/input_get_item_info',
        show3: false,
        pid:0,
        itemName:'选择的奖项名称',
        checkList:[],
        checkId:'',
        getItems:[],
        itemTable:false,
        checkAll: true,
        isIndeterminate: true,
        allitem:true,
        options:[{value:'秋期',label:'秋期'},{value:'春期',label:'春期'}],
        add_time:{year:new Date(),term:'秋期'}
      };
  },
  mounted:function () {
      if(this.$cookie.get('is_monitor')!=1){
          this.$router.push('/student');
      }else{
         Axios.get(this.c_url+'get_all_item')
        .then((res)=>{
         this.itemlist = res.data;
         this.items1 = this.checkItem(0);
         });
        //获取班级同学信息
        Axios.get(this.c_url+'get_student_by_class_id',{params:{
          class_id:this.$cookie.get('class_id')
        }})
        .then((res)=>{
            this.students = res.data;
        });
        //获取三级奖项信息
        Axios.get(this.c_url+'get_third_items')
        .then((res)=>{
          this.allitems3 = res.data;
          this.items3 = res.data;
        });
         //获取二级奖项信息
        Axios.get(this.c_url+'get_second_items')
        .then((res)=>{
          this.allitems2 = res.data;
          this.items2 = res.data;
        });

      }

    },
  methods:{
      handleCheckAllChange:function(event) {
        this.checkList = event.target.checked ? this.students : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange:function(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.students.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.students.length;
      },
      //去重
      removeDuplicatedItem:function() {
        var r = []; 
        for(var i = 0, l = this.getItems.length; i < l; i++) { 
         for(var j = i + 1; j < l; j++) 
         
          if (this.getItems[i].i_id === this.getItems[j].i_id && this.getItems[i].u_id === this.getItems[j].u_id) j = ++i; 
         r.push(this.getItems[i]); 
         } 
         this.getItems = r;
      },
      inputItem:function(){
           Axios.get(this.s_url,{params:{
            info:this.getItems}})
            .then((res)=>{
              if(res.data=='success'){
                  this.$message({
                    type: 'info',
                    message: '录入完成'
                    });
                  this.itemTable = false;
                  this.step = 1;
                  this.getItems = [];
              }
              if(res.data=='fail'){
                  this.$message({
                    type: 'danger',
                    message: '录入失败'
                    });
              }
          });
      },
      deleteRow:function(index) {
        this.getItems.splice(index,1);
        if(this.getItems.length==0){
          this.itemTable = false;
        }
      },
      openCheckBox:function(name,id){
          this.itemName = name;
          this.checkId = id;
          this.dialogCheckBoxVisible = true;
          this.itemTable = false;
          this.step = 2;
      },
      closeCheckBox:function(){
          this.checkList=[];
          this.dialogCheckBoxVisible = false;
          this.isIndeterminate = true;
          this.step = 1;
      },
      openTable:function(){
          this.itemTable = true;
          this.step = 3;
      },
      closeTable:function(){
          this.itemTable = false;
          this.step = 1;
      },
      //添加学生
      addStudent:function(){
          var add_time = this.add_time.year.getFullYear()+'年'+this.add_time.term;
          for( var index in this.checkList){
            var obj ={
              'i_id':this.checkId,
              'i_name':this.itemName,
              'u_id':this.checkList[index].s_id,
              'u_name':this.checkList[index].s_name,
              'add_time':add_time
            } ;
            this.getItems.push(obj);
          }
           this.removeDuplicatedItem();
           this.checkList=[];
           this.isIndeterminate = true;
          this.dialogCheckBoxVisible = false;
      },
      checkByPid: function(item) {
          return item.pid == this.pid;
      },
      checkItem: function(pid) {
          this.pid=pid;
          return this.itemlist.filter(this.checkByPid);
      },
      changeItem2:function(pid,index){
          this.items2 = this.checkItem(pid);
          this.items3 = this.checkItem(this.items2[0].id);
          this.mapItem(this.items1,index);
          this.mapItem(this.items2,0);
          this.allitem = false;
         
      },
      changeItem3:function(pid,index){
         this.mapItem(this.items2,index);
         this.items3 = this.checkItem(pid);
      },
      //设定当前行是否选中的样式
      mapItem:function(items,index){
        items.map(function(v,i){
           i==index? v.iscurrent=true: v.iscurrent=false;
        });
      },
      allitems:function(){
        this.items3 = this.allitems3;
        this.items2 = this.allitems2;
        this.allitem = true;
        this.mapItem(this.items1,-1);
        this.mapItem(this.items2,-1);
      },
      filter2:function(){
            var _msg = this.item2msg;
            this.items2 = this.allitems2.filter(function(obj){
                return obj.name.indexOf(_msg)>-1;
            });
            if(this.items2.length!= 0){
              this.items3 = this.checkItem(this.items2[0].id);
              this.mapItem(this.items2,0);
            }
            this.mapItem(this.items1,-1);
      },
      filter3:function(){
            this.mapItem(this.items1,-1);
            this.mapItem(this.items2,-1);
            this.items2 = this.allitems2;
            var _msg = this.item3msg;
            this.items3 = this.allitems3.filter(function(obj){
                return obj.name.indexOf(_msg)>-1;
            });
      },
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
    h1, h2 {
      font-weight: normal;
    }
    ul {
      list-style-type: none;
      padding: 0;
      cursor: pointer;
      float: left;
      margin-right: 0px;
      max-height: 440px;
      overflow-y:auto;
      padding-top: 36px;
    }
    .input-item{
      margin-top: 50px;
    }
    #items1 li,#items2 li,#items3 li{
        color: #fff;
        padding: 5px 10px;
        background-color: #8dadc5;
        border-color: #8dadc5;
        border-radius: 4px;
        margin: 2px 5px;
        width: 160px;
    }
    #items3 li{
      width:250px;
      height: 25px;
      overflow: hidden;
    }
    #items1 li.current,#items2 li.current{
      background: #5a727d;
    }
    #items3 li.search input,#items2 li.search input{
      background: #8dadc5;
      border:none;
      outline:none;
      color: #fff;
      width: 130px;
    }
    ul li.search{
      position: absolute;
      top: -2px;
    }
    #items2 li.search:hover,#items3 li.search:hover{
       background: #8dadc5;
    }
    #items1 li:hover,#items2 li:hover,#items3 li:hover{
       background: #5a727d;
    }
      .student-list li{
        float: left;
        width: 100px;
      }
      .student-list  .el-checkbox{
        margin: 3px 0;
        width: 90px;
      }
      .look-all{
        position: absolute;
        right: 150px;
        top: 100px;
      }
</style>
<style>
  .term_time {
   float:left;

  }
  .input-item table td{
    padding: 1px 3px;
  }
  .input-item .el-table td{
    height: 30px;
  }
  .el-dialog__body{
    padding: 10px 20px;
  }
  .year .el-date-editor.el-input{
  width: 83px;
  }
  .term .el-input{
    width: 80px;
  }
</style>






