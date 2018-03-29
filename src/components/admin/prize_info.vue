<template>
  <div class="prize_info">
  <el-row>

     <h3>班级录入信息</h3>
  <el-col :offset='3' :span='20'>
  <el-form :inline="true"  class="demo-form-inline">
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
      <!--<el-button type="primary" @click='allInfoShow'>全部</el-button>-->
    </el-form-item>
  </el-form>
  </el-col>

  <el-col :span="18" :offset='3'>
                <div v-show='allShow'>
                    <el-collapse accordion>
                        <el-collapse-item v-for='(items,index) in allList' :key='items'>
                          <template slot="title">{{items[0].u_name}}
                          <el-tag type="gray">{{items.length}}</el-tag>
                          </template>
                          <el-table :data="items" border>
                                <el-table-column  prop="u_name" label="姓名" width='150'>
                                </el-table-column>
                                <el-table-column  prop="i_name" label="奖项" >
                                </el-table-column>
                                <el-table-column  prop="add_time" label="时间" width='130'>
                                </el-table-column>
                                 <el-table-column  prop="i_status" label="状态" width='100'>
                                </el-table-column>
                        </el-table>
                        </el-collapse-item>
                        <el-row  v-if='allList.length==0'>
                           <el-col :offset='11' :span='3'>没有提交记录</el-col>
                        </el-row>
                    </el-collapse>
                   <!--  shift56566<el-row v-if='allList.length!=0'>
                              <el-col :offset='11' :span='2' style='margin-top:20px'>
                              <el-button type='info' >一键确定</el-button>
                              </el-col>
                    </el-row> -->
                </div>
                <div v-show='classShow'>
                   <el-collapse accordion>
                      <el-collapse-item v-for='(items,index) in classItemList' :key='items'>
                        <template slot="title"><span :class="items.status">{{items[0].u_name}}</span>
                        <!--<el-tag :type="gray">{{items.length}}</el-tag>-->
                          <el-tag :type="items.status">{{items.length}}</el-tag>
                        </template>
                        <el-table :data="items" border>
                              <el-table-column  prop="u_name" label="姓名" width='100'>
                              </el-table-column>
                              <el-table-column  prop="i_name" label="奖项" >
                              </el-table-column>
                              <el-table-column  prop="add_time" label="时间" width='130'>
                                </el-table-column>
                               <el-table-column  prop="i_status" label="状态" width='100'>
                              </el-table-column>
                              <el-table-column  label="操作" width='160'  >
                              <template scope="scope">
                                <el-button
                                @click="openAddBox(scope.row,items)"  type="warning"
                                size="small">修改</el-button>
                                <el-button
                                @click='open3(scope.$index,scope.row,items)'
                                type="danger"
                                size="small">删除</el-button>
                              </template>
                              </el-table-column>
                      </el-table>
                      </el-collapse-item>
                      <el-row  v-if='classItemList.length==0'>
                         <el-col :offset='11' :span='2'>还未提交</el-col>
                      </el-row>
                   </el-collapse>
                   <el-row v-if='classItemList.length!=0'>
                            <el-col :offset='10' :span='6' style='margin-top:20px'>
                            <el-button type='info' @click='gainInfo' :disabled="canSubmit" v-show="statusl">班级确定</el-button>
                            <el-button type='danger' @click='openFeedbackBox'>班级驳回</el-button>
                            </el-col>
                   </el-row>
                </div>

                <el-dialog :title="checkUname" :visible.sync="show3">
                            <div class="header">
                             <strong>选择新的奖项</strong>
                            </div>
                            <div class="content">
                              <ul id="items1">
                                  <li @click='allitems' :class='{current:allitem}'>所有奖项</li>
                                  <li v-for='(item,index) in items1'
                                  @click="changeItem2(item.id,index)"
                                  :class="{current:item.iscurrent}">
                                 {{item.name}}
                                  </li>
                              </ul>
                              <ul id='items2'>
                                  <li class="search">
                                    <i class="fa fa-search"></i>
                                    <input placeholder="请输入内容"
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
                              <ul id="items3">
                                  <li class="search">
                                    <i class="fa fa-search"></i>
                                    <input placeholder="请输入内容"
                                    @keyup="filter3"
                                    @blur ="item3msg= '';"
                                    v-model="item3msg"></input>
                                  </li>
                                  <el-radio-group v-model="checkList"  >
                                  <li  v-for='(item,index) in items3' >
                                    <el-radio
                                      :label="item">
                                      {{item.name}}
                                      </el-radio>
                                  </li>
                                  </el-radio-group>
                                  <li v-show='!items3.length'>暂无数据</li>
                              </ul>
                            </div>
                             <div slot="footer" class="dialog-footer">
                                <el-button @click="closeCheckBox">取 消</el-button>
                                <el-button type="primary" @click="updateItem">修 改</el-button>
                            </div>
                </el-dialog>
                <el-dialog title="反馈" :visible.sync="feedbackBox" size='tiny'>
                      <label for="">输入驳回信息</label>
                      <el-input type="textarea" v-model="feedbackContent"></el-input>
                      <div slot="footer" class="dialog-footer">
                              <el-button @click='closefeedbackBox'>关 闭</el-button>
                              <el-button type="primary" @click='cancelSubmit'>反 馈</el-button>
                        </div>
                </el-dialog>
  </el-col>
</el-row>

  </div>
</template>

<script>
  import Axios from "axios"
  export default {
    data() {
      return {
        red:'',
        statusl:true,
        gray:'danger',
        profession:'',
        classlist:'',
        allList:[],
        selectprofession:'',
        selectclass:'',
        classItemList:[],
        a_url:'http://127.0.0.1/nefu/Admin/',
        c_url:'http://127.0.0.1/nefu/Common/',
        s_url:'http://127.0.0.1/nefu/Student/',
        show3: false,
        itemlist:[],
        items1:[],
        items2:[],
        items3:[],
        allitems2:[],
        allitems3:[],
        item2msg:'',
        item3msg:'',
        allitem:true,
        checkList:[],
        checkUname:'',
        checkPid:'',
        allShow:true,
        classShow:false,
        canSubmit:false,
        row:'',
        scopeRow:'',
        feedbackContent:'',
        feedbackBox:false
      }
    },
    watch: {
      selectprofession(val) {
       this.getPro(val);
       this.selectprofession = '';
       this.selectclass = '';
      },
      selectprofession(val) {
        this.getClass(val);
       this.selectclass = '';
      }
    },
     mounted:function(){
        this.grade = this.$cookie.get('grade');
        this.college_id = this.$cookie.get('college_id');
        this.getPro();
        Axios.get(this.c_url+'get_all_item')
          .then((res)=>{
           this.itemlist = res.data;
           this.items1 = this.checkItem(0);
        });
        Axios.get(this.c_url+'get_third_items')
          .then((res)=>{
            this.allitems3 = res.data;
            this.items3 = res.data;
        });
        Axios.get(this.c_url+'get_second_items')
          .then((res)=>{
            this.allitems2 = res.data;
            this.items2 = res.data;
        });
        this.allInfo();
    },
    methods: {
      allInfo:function(){
        Axios.get(this.a_url+'get_info_by_college_grade',{params:{
              grade:this.grade,
              college_id:this.college_id
            }})
            .then((res)=>{
                this.allList = res.data;
            });
      },
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
      allInfoShow:function(){
            this.allInfo();
            this.classShow = false;
            this.allShow = true;
      },
      //通过选择的班级id 查询相应班级录入的信息
      onSubmit:function(){
        Axios.get(this.a_url+'get_class_info',{params:{class_id:this.selectclass}})
        .then((res)=>{
        		var status = '';
        		var x = [];
        		x = res.data;
        		for(var pI in x) {
              for (var i = 0; i < x[pI].length; i++) {
//                x[pI][i].i_status = '未确定'
                if (x[pI][i].i_status != "已确定") {
                  status = 'all';
                }

              }
              x[pI].status = status;
            }
          for(var pI in x) {
        				console.log(x[pI].status)
          }

            if(status == 'all'){
        				this.statusl = false
            }
            console.log(x);
//            this.classItemList = res.data;
          this.classItemList = x;
            this.classShow = true;
            this.allShow = false;
            this.canSubmitCheck();
      });
      },
      canSubmitCheck:function(){
        this.canSubmit = false;
         for(var pI in this.classItemList){
          var personInfo = this.classItemList[pI];
            for(var i=0;i<personInfo.length-1;i++){
              if(personInfo[i].i_id == personInfo[i+1].i_id){
                this.canSubmit = true;
                return;
              }
            }
         }
      },
      checkByPid: function(item) {
          return item.pid == this.pid;
      },
      checkItem: function(pid) {
          this.pid=pid;
          return this.itemlist.filter(this.checkByPid);
      },
      checkItem3: function(pid) {
          this.pid=pid;
          return this.allitems3.filter(this.checkByPid);
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
              this.items3 = this.checkItem3(this.items2[0].id);
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
      changeItem2:function(pid,index){
          this.items2 = this.checkItem(pid);
          this.items3 = this.checkItem3(this.items2[0].id);
          this.allitem = false;
          this.mapItem(this.items1,index);
          this.mapItem(this.items2,0);
      },
      changeItem3:function(pid,index){
         this.mapItem(this.items2,index);
         this.items3 = this.checkItem3(pid);
      },
      mapItem:function(items,index){
        items.map(function(v,i){
           i==index? v.iscurrent=true: v.iscurrent=false;
        });
      },
      openAddBox:function(row,items){
        this.show3 = true;
        this.checkUname = row.u_name;
        this.checkPid= row.p_id;
        this.row = row;
        this.scopeRow = items;
      },
      closeCheckBox:function(){
          this.show3 = false;
          this.checkList = [];
      },
      //更换奖项
      updateItem:function(){
        Axios.get(this.c_url+'update_prize_info',{params:{
          p_id:this.checkPid,
          i_name:this.checkList.name,
          i_id:this.checkList.id
        }})
        .then((res)=>{
          if(res.data=='success'){
              this.row.i_name = this.checkList.name;
              this.row.i_id = this.checkList.id;
              this.show3 = false;
              //对更改后的信息排序-再次检测
              this.scopeRow.sort(this.Itemsort);
              this.canSubmitCheck();
              this.checkList = [];
            }
        });
      },
      Itemsort:function(a,b){
          return a.i_id - b.i_id;
      },
      open3(index,row,data) {
        this.$confirm('此操作将删除该学生奖项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteInfo(index,row.p_id,data);
        });
      },
      deleteInfo:function(itemIndex,pid,data){
          Axios.get(this.s_url+'delete_info',{params:{p_id:pid}})
          .then((res)=>{
            if(res.data=='success'){
              data.splice(itemIndex, 1);
                if(data.length==0){
                    var r = [];
                    for(var iTEM in this.classItemList){
                      if(this.classItemList[iTEM].length!=0){
                        r.push(this.classItemList[iTEM]);
                      }
                    }
                    this.classItemList = r;
                }
              this.canSubmitCheck();
            }else{
              this.$message({
                    type: 'danger',
                    message: '删除失败'
                  });
            }
         });
      },
      //驳回班长的提交
      cancelSubmit:function(){
       for(var pI in this.classItemList){
          var u_id = this.classItemList[pI][0].u_id;
            break;
         }
        Axios.get(this.s_url+'info_feedback',{params:{
              u_id:u_id,
              p_id:0,
              content:this.feedbackContent==''?'驳回提交，没有说明原因':this.feedbackContent,
              u_name:this.$cookie.get('a_name')
            }}).then((res)=>{
              if(res.data=='success'){
                Axios.get(this.a_url+'cancel_sub',{params:{
                  class_id:this.selectclass}}).then((res)=>{
                    if(res.data=='success'){
                      this.classItemList = [];
                      this.$message({
                        type: 'info',
                        message: '已驳回'
                      });
                    this.feedbackBox = false;
                    }
               });
              }
          });

      },
      openFeedbackBox:function(){
          this.feedbackBox = true;
          this.feedbackContent = '';
      },
      closefeedbackBox:function(){
          this.feedbackBox = false;
      },
      //提交到已获奖项表
      gainInfo:function(){
          Axios.get(this.a_url+'gain_info',{params:{class_id:this.selectclass}})
           .then((res)=>{
              if(res.data=='success'){
                  this.classItemList = [];
                  this.allList = [];
                  this.$message({
                    type: 'info',
                    message: '添加完成'
                  });
              }
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
  .prize_info .content{
      width: 640px;
      float: left;
    }
    .prize_info .content ul{
      float: left;
      cursor: pointer;
      height: 300px;
      margin-bottom: 30px;
    }
    #items1{
      background: #EDF1F2;
      border-right: 1px solid #DEE5E7;
    }
    #items1 li{
      width: 180px;
      padding: 6px 10px;
      color:#555;
      border-bottom: 1px solid #DEE5E7;
    }
    #items1 li.current{
      background: #d2f1ed;
    }
    #items1 li:hover{
      background: #d2f1ed;
    }
    #items2{
      background: #F6F8F8;
      overflow-y: auto;
      border-right: 1px solid #e7ecee;
      padding-top: 37px;
      height: 265px;
      width: 150px;
    }
    #items2 li{
      width: 130px;
      padding: 6px 10px;
      color:#555;
      border-bottom: 1px solid #e7ecee;
    }
    #items2 li.current{
      background: #d8e8dc;
    }
    #items2 li.search{
      position: absolute;
      background: #F6F8F8;
      top: 80px;
    }
    #items2 li.search:hover input{
      background: #F6F8F8;
    }
    #items2 li.search:hover{
      background: #F6F8F8;
    }
    #items2 li:hover{
      background: #d8e8dc;
    }

    #items2 .search input{
      display: inline-block;
      width: 100px;
      height: 20px;
      border:none;
      outline:none;
      background: #F6F8F8;
      text-indent: 5px;
    }
    #items3{
      background: #e8eaea;
      overflow-y: auto;
      padding-top: 40px;
      height: 260px;
    }
    #items3 li{
      width: 230px;
      padding: 8px 10px;
      color:#555;
      border-bottom: 1px solid #9eadb1;
      overflow: hidden;
    }
    #items3 li.current{
      background: #E9F1D2;
    }
    #items3 li:hover{
      background: #E9F1D2;
    }
    #items3 li.search{
      position: absolute;
      background: #e8eaea;
      top: 80px;
      padding-top:4px;
      z-index: 100;
    }
    #items3 li.search:hover{
      background: #e8eaea;
    }
    #items3 .search input{
      display: inline-block;
      width: 200px;
      height: 20px;
      border:none;
      outline:none;
      background: #e8eaea;
      text-indent: 5px;
    }
    #items3 li.search:hover input{
      background: #e8eaea;
    }
  .all{
    background:red;
    color:#fff;
  }

</style>
<style>
  .el-dialog__body{
    padding: 10px 20px;
  }
  .el-dialog--small{
    width: 650px;
  }
</style>
