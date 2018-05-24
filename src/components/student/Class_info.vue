<template>
<div class="class-info">
    <el-row>
      <el-col :span='18' :offset='3'>
      <br>
       <el-tabs v-model="activeName"  @tab-click='clearBadge'>
              <el-tab-pane label="录入信息" name="first" class='info-list'>
                <el-collapse accordion>
                      <el-collapse-item v-for='(items,index,key) in classItemList' :key='items'>
                        <template slot="title">{{items[0].u_name}}
                        <el-tag type="gray">{{items.length}}</el-tag>
                        <el-tooltip class="item" effect="dark" content="补录" placement="right">
                              <el-button 
                              icon="plus" 
                              size="mini" 
                              @click.stop="openAddBox(index,items[0].u_name)">
                              </el-button>
                        </el-tooltip>
                        </template>
                        <el-table :data="items" border :row-class-name="tableRowClassName"
                        max-height='350'>
                              <el-table-column  prop="u_name" label="姓名" width='150'>
                              </el-table-column>
                              <el-table-column  prop="i_name" label="奖项" >
                              </el-table-column>
                              <el-table-column  prop="add_time" label="时间" width='150'>
                              </el-table-column>
                               <el-table-column  prop="i_status" label="状态" width='100'>
                              </el-table-column>
                              <el-table-column  label="操作" width='100'  >
                              <template scope="scope">
                                <el-button  
                                @click='open3(scope.$index,scope.row,items)'  
                                type="warning"  
                                size="small">删除</el-button>
                              </template>
                              </el-table-column>
                      </el-table>
                      </el-collapse-item>
                      <el-row v-if='classItemList.length==0'>
                         <el-col :offset='11'>还未录入</el-col>
                      </el-row>
                </el-collapse>
                
                <el-row v-if='classItemList.length!=0'>
                      <el-col :offset='10' style='margin-top:20px'>
                       <el-button type='info'  :disabled="canSubmit" @click='SubmitInfo'>提交</el-button>
                       <span v-show='canSubmit' v-text='tooltip' style='color:red'></span>
                      </el-col>
                </el-row>
                <!-- 奖项补录 -->
                <el-dialog :title="checkUname" :visible.sync="show3">
                            <div class="header">
                                <el-row>
                                      <el-col :span="20">
                                     <strong>添加奖项</strong>
                                      </el-col>
                                </el-row>
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
                                    <el-checkbox-group v-model="checkList"  >
                                    <li  v-for='(item,index) in items3' >
                                      <el-checkbox 
                                        :label="item">
                                        {{item.name}}
                                        </el-checkbox>
                                    </li>
                                    </el-checkbox-group>
                                    <li v-show='!items3.length'>暂无数据</li>
                                </ul>
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
                              <el-button type="primary" @click="addItem">添 加</el-button>
                            </div> 
                </el-dialog>
                <!-- 奖项补录 -->
              </el-tab-pane>
              <el-tab-pane name="second">
                  <el-badge  
                  :hidden="!badgeNum" 
                  class="item" 
                  :value="badgeNum"
                  slot="label" 
                  >反馈信息</el-badge>
                    <el-table :data="feedback" border >
                        <el-table-column  prop="u_name" label="姓名" width='100'>
                        </el-table-column>
                        <el-table-column  prop="b_content" label="反馈内容" >
                        </el-table-column>
                         <el-table-column  prop="time" label="时间"  width='200'>
                        </el-table-column>
                    </el-table>
              </el-tab-pane>
      </el-tabs>
      </el-col>
    </el-row>
</div>
</template>
<script>
import Axios from "axios"
export default {
    data () {
        return {
            s_url:'http://127.0.0.1/nefu/Student/',
            c_url:'http://127.0.0.1/nefu/Common/',
            classItemList:[],
            feedback:[],
            itemlist:[],
            items1:[],
            items2:[],
            items3:[],
            allitems2:[],
            allitems3:[],
            item2msg:'',
            item3msg:'',
            class_id:'',
            activeName:'first',
            activeNames: [],
            canSubmit:false,
            checkUname:'',
            checkUid:'',
            show3:false,
            checkList:[],
            allitem:true,
            tooltip:'提示',
            badgeNum:0,
            options:[{value:'秋期',label:'秋期'},{value:'春期',label:'春期'}],
            add_time:{year:new Date(),term:'秋期'}
        };
    },
    mounted:function (row) {
        this.class_id = this.$cookie.get('class_id');

        Axios.get(this.s_url+'get_class_info',{params:{class_id:this.class_id}})
        .then((res)=>{
            this.classItemList = res.data;
            this.canSubmitCheck();
        });

        Axios.get(this.s_url+'get_class_feedback_unread_num',{params:{class_id:this.class_id}})
        .then((res)=>{
          this.badgeNum = res.data;
        });
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
    },
    methods:{
      clearBadge:function(e){
        if(e.name=='second'&& this.badgeNum){
          this.badgeNum = 0;
          Axios.get(this.s_url+'get_class_feedback',{params:{class_id:this.class_id}})
            .then((res)=>{
            this.feedback= res.data;
          });
          Axios.get(this.s_url+'class_feedback_seen',{params:{class_id:this.class_id}})
            .then((res)=>{
              console.log(res.data);
          });
        }
      },
      tableRowClassName(row, index) {
        if (row.i_status == '待确定') {
         return 'info-row';
        } 
        return '';
      },
      //检测班级录入信息
      canSubmitCheck:function(){
        this.canSubmit = false;
         for(var pI in this.classItemList){
          var personInfo = this.classItemList[pI];
          if(personInfo.length==1){
              if(personInfo[0].i_status == '待确定'){
                this.tooltip = '录入待确定';
                this.canSubmit = true;
                return;
              }
          }else{
            for(var i=0;i<personInfo.length-1;i++){
              //待确定 和 重复
              if((personInfo[i].i_status=='待确定')||(personInfo[i+1].i_status=='待确定')){
                this.tooltip = '录入待确定';
                this.canSubmit = true;
                return;
              }else if((personInfo[i].i_id == personInfo[i+1].i_id)){
                this.tooltip = '录入重复';
                this.canSubmit = true;
                return;
              }
            }
          }
         }
      },
      open3(index,row,data) {
        const h = this.$createElement;
        this.$msgbox({
          title: '确定删除',
          message: h('div', null, [
            h('h5', '姓名：'+row.u_name),
            h('h6', '奖项：'+row.i_name),
            h('h6', '当前状态：'+row.i_status),
            h('h6', '添加时间：'+row.add_time),

          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance,done) => {
            if (action === 'confirm') {
               this.deleteInfo(index,row.p_id,data);
              done();
            } else {
              done();
            }
          }
        });
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
      //删除某一信息
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
             }
         });
      },
      openAddBox:function(uid,uname){
        this.show3 = true;
        this.checkUname = uname;
        this.checkUid = uid;
      },
      closeCheckBox:function(){
          this.show3 = false;
          this.checkList = [];
      },
      addItem:function(){
        var add_time = this.add_time.year.getFullYear()+'年'+this.add_time.term;
        Axios.get(this.s_url+'add_person_item_info',{params:{
          u_id:this.checkUid,
          u_name:this.checkUname,
          items:this.checkList,
          add_time:add_time
        }})
        .then((res)=>{
          if(res.data=='success'){
             this.show3 = false;
             this.checkList = [];
             Axios.get(this.s_url+'get_class_info',{params:{class_id:this.class_id}})
             .then((res)=>{
                  this.classItemList = res.data;
                  this.canSubmitCheck();
            });
            this.$message({
                  type: 'info',
                  message: '添加成功'
            });

          }else{
            this.$message({
                  type: 'danger',
                  message: '添加失败'
            });
          }
        });
      },
      SubmitInfo:function(){
        Axios.get(this.s_url+'sub_class_info',{params:{class_id:this.class_id}})
             .then((res)=>{
              if(res.data=='success'){
                  this.classItemList = [];
                  this.canSubmitCheck();
                  this.$message({
                    type: 'info',
                    message: '提交成功'
                  });
              }else{
                  this.$message({
                    type: 'danger',
                    message: '提交失败'
                  });
              }
            });
      }

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
 .class-info .el-table .info-row {
    background: #eff5bf;
  }
</style>
<style scoped>
 .show-item{
  width: 700px;
  left: 50%;
  margin-left: -350px;
  position: fixed;
  top: 150px;
  z-index: 100;
 }
 .class-info .info-list .el-button--mini{
   float: right;
   margin-right: 20px;
   margin-top: 11px;
  }
    .class-info  .item-checkbox{
        position: fixed;
        top: 0;
        bottom: 0;  
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        padding-left: 50%;
        z-index: 200;
      }
    .content ul{
      float: left;
      cursor: pointer;
      height: 300px;
      margin-bottom: 20px;
    }
    .class-info .content{
      width: 640px;
      float: left;
    }
    #items1{
      background: #EDF1F2;
      border-right: 1px solid #DEE5E7;
    }
    #items1 li{
      width: 150px;
      padding: 6px 0 6px 10px;
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
      padding-top: 38px;
      height: 262px;
      width: 165px;
    }
    #items2 li{
      width: 140px;
      padding: 6px 0 6px 10px;
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
      padding-top: 38px;
      height: 262px;
    }
    #items3 li{
      width: 250px;
      padding: 6px 10px;
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
  
</style>
<style>
  .el-dialog__body{
    padding: 10px 20px;
  }
  .el-dialog--small{
    width: 650px;
  }
  .class-info .el-tabs__item{
    padding-top:10px; 
    height: 54px;
  }
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