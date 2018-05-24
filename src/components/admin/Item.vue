<template>
  <div class="item">
      <el-row>
      <el-col :span='3' :offset='1'>
              奖项：
             <el-steps :space="100" direction="vertical" :active="step">
                <el-step title="奖项查看"></el-step>
                <el-step title="奖项增加"></el-step>
                <el-step title="奖项删除"></el-step>
             </el-steps>
        </el-col>
        <el-col :span="18" :offset="2">
                <ul id="items1">
                      <li @click='allitems' :class='{current:allitem}' class="search">所有奖项</li>

                      <li v-for='(item,index) in items1'
                      @click="changeItem2(item.id,index)"
                      :class="{current:item.iscurrent}">
                     {{item.name}}
                     <span class="delete-item" @click.stop='deleteItems1(item.id)'><i class='fa fa-close'></i></span>
                      </li>
                      <li class="add-item-input" v-show='addItems1Name'>
                        <input type="text"
                        v-model='newItem1'

                        placeholder="请输入新建奖项名"
                        @blur="addItemshide(1)"
                       >
                        <span @click.stop='addItems1'><i class='fa fa-check'></i></span>
                      </li>
                      <div class='add-item'
                      @click="addItems1show"> <i class="fa fa-plus"></i> 添加一级奖项</div>
                </ul>
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
                       <span class="delete-item" @click.stop='deleteItems2(item.id)'><i class='fa fa-close'></i></span>
                      </li>

                      <li v-show='!items2.length'>暂无数据</li>
                       <li class="add-item-input" v-show='addItems2Name'>
                        <input type="text"
                        v-model='newItem2'
                        placeholder="请输入新建奖项名"
                         @blur="addItemshide(2)">
                        <span @click.stop='addItems2'><i class='fa fa-check'></i></span>
                      </li>
                      <div class='add-item'
                      @click="addItems2show"> <i class="fa fa-plus"></i> 添加二级奖项</div>
                </ul>
                <ul id="items3">
                      <li class="search">
                          <i class="fa fa-search"></i>
                          <input
                          placeholder="请输入内容"
                          @keyup="filter3"
                          @blur ="item3msg= '';"
                          v-model="item3msg" ></input>
                      </li>

                      <li v-for='item in items3' >
                      {{item.name}}
                       <span class="delete-item" @click.stop='deleteItems3(item.id)'><i class='fa fa-close'></i></span>
                      </li>

                      <li v-show='!items3.length'>暂无数据</li>
                      <li class="add-item-input" v-show='addItems3Name'>
                        <input type="text"
                        placeholder="请输入新建奖项名"
                        v-model='newItem3'
                        @blur="addItemshide(3)">
                        <span @click.stop='addItems3'><i class='fa fa-check'></i></span>
                      </li>
                      <div class='add-item'
                      @click="addItems3show">
                      <i class="fa fa-plus"></i> 添加三级奖项</div>
                </ul>
        </el-col>
      </el-row>
  </div>

  </template>

<script>
  import $ from 'jquery'
  import Axios from "axios"
export default {
    data () {
      return {
        itemlist:[],
        items1:[],
        items2:[],
        items3:[],
        allitems2:[],
        allitems3:[],
        checkItems1Id:'',
        checkItems2Id:'',
        checkItems1Index:-1,
        checkItems2Index:-1,
        item2msg:'',
        item3msg:'',
        step:1,
        c_url:'http://222.27.161.5/nefu/Common/',
        a_url:'http://222.27.161.5/nefu/Admin/',
        pid:0,
        allitem:true,
        addItems1Name:false,
        addItems2Name:false,
        addItems3Name:false,
        newItem1:'',
        newItem2:'',
        newItem3:'',
      };
  },
  mounted:function () {
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

      checkByPid: function(item) {
          return item.pid == this.pid;
      },

      checkItem: function(pid) {
          this.pid=pid;
          return this.itemlist.filter(this.checkByPid);
      },
      //二三级奖项随一级奖项点击切换
      changeItem2:function(pid,index){
          this.items2 = this.checkItem(pid);
          if(this.items2.length>0){
              this.items3 = this.checkItem(this.items2[0].id);
          }else{
            this.items3 =[];
          }
          this.checkItems1Id = pid;
          this.checkItems1Index = index;
          this.mapItem(this.items1,index);
          this.mapItem(this.items2,0);
          this.allitem = false;
          this.addItems1Name=false;
          this.addItems2Name=false;
          this.addItems3Name=false;

      },
      //三级奖项随二级奖项点击切换
      changeItem3:function(pid,index){
         this.mapItem(this.items2,index);
         this.checkItems2Id = pid;
         this.checkItems2Index = index;
         this.items3 = this.checkItem(pid);
         this.addItems1Name=false;
         this.addItems2Name=false;
         this.addItems3Name=false;
      },
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
        this.checkItems1Id = '';
        this.checkItems2Id = '';
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
      addItems1show:function(){
        this.addItems2Name=false;
        this.addItems3Name=false;
        this.addItems1Name=true;
        this.newItem1='新建一级项';
        $('#items1 li:last,#items1 input:last').css('background',"#f0ad4e");
      },
      addItems2show:function(){
        this.addItems1Name=false;
        this.addItems3Name=false;
        this.addItems2Name = this.checkItems1Id?true:false;
        this.newItem2='新建二级项';
        $('#items2 li:last,#items2 input:last').css('background',"#f0ad4e");
      },
      addItems3show:function(){
        this.addItems1Name=false;
        this.addItems2Name=false;
        this.addItems3Name = this.checkItems2Id?true:false;
        this.newItem3='新建三级项';
        $('#items3 li:last,#items3 input:last').css('background',"#f0ad4e");
      },
      addItemshide:function(i){
        var itemname = 'addItems'+i+'Name';
        this[itemname]=true;
      },

      addItems3:function(){
        if(this.newItem3!=''){
          Axios.get(this.a_url+'add_items',{params:{
         pid:this.checkItems2Id,name:this.newItem3
             }}).then((res)=>{
                 if(res.data == 'success'){
                   Axios.get(this.c_url+'get_all_item')
                   .then((res)=>{
                         this.itemlist = res.data;
                   });
                   Axios.get(this.c_url+'get_second_items')
                    .then((res)=>{
                         this.allitems2 = res.data;
                         this.items2 = res.data;
                         this.changeItem2(this.checkItems1Id,this.checkItems1Index);
                         Axios.get(this.c_url+'get_third_items')
                          .then((res)=>{
                              this.allitems3 = res.data;
                              this.items3 = res.data;
                              this.changeItem3(this.checkItems2Id,this.checkItems2Index);
                    });
                    });

                       this.addItems3Name = false;
                       this.newItem3 = '';
                  }
              });
        }
      },
      addItems2:function(){

        if(this.newItem2!=''){
         Axios.get(this.a_url+'add_items',{params:{
         pid:this.checkItems1Id,name:this.newItem2
             }}).then((res)=>{
                 if(res.data == 'success'){
                   Axios.get(this.c_url+'get_all_item')
                   .then((res)=>{
                         this.itemlist = res.data;
                         Axios.get(this.c_url+'get_second_items')
                        .then((res)=>{

                            this.allitems2 = res.data;
                            this.items2 = res.data;
                            this.changeItem2(this.checkItems1Id,this.checkItems1Index);
                     });
                   });
                      this.addItems2Name = false;
                      this.newItem2 = '';
                  }
              });
        }
      },
      addItems1:function(){
         if(this.newItem1!=''){
               Axios.get(this.a_url+'add_items',{params:{
                 pid:0,name:this.newItem1
               }}).then((res)=>{
                console.log(res.data);
                 if(res.data == 'success'){
                   Axios.get(this.c_url+'get_all_item')
                   .then((res)=>{
                    this.itemlist = res.data;
                    this.items1 = this.checkItem(0);
                    });
                    this.newItem1 = '';
                    this.addItems1Name = false;
                  }
               });
        }
      },
      deleteItems1:function(itemid){
        if(confirm('确定要删除该一级奖项吗，删除不可以恢复！')){
          Axios.get(this.a_url+'delete_items1',{params:{itemid:itemid}})
            .then((res)=>{
              if(res.data == 'success'){
                Axios.get(this.c_url+'get_all_item')
                  .then((res)=>{
                  this.itemlist = res.data;
                this.items1 = this.checkItem(0);
                Axios.get(this.c_url+'get_second_items')
                  .then((res)=>{
                  this.allitems2 = res.data;
                this.items2 = res.data;
                Axios.get(this.c_url+'get_third_items')
                  .then((res)=>{
                  this.allitems3 = res.data;
                this.items3 = res.data;
              });
              });
              });
            }
          });
        }
      },
      deleteItems2:function(itemid){
        if(confirm('确定要删除该二级奖项吗，删除不可以恢复！')) {
          Axios.get(this.a_url + 'delete_items2', {params: {itemid: itemid}})
            .then((res) => {
            if(res.data == 'success'
        )
          {
            Axios.get(this.c_url + 'get_all_item')
              .then((res) => {
              this.itemlist = res.data;
            Axios.get(this.c_url + 'get_second_items')
              .then((res) => {
              this.allitems2 = res.data;
            this.items2 = res.data;
            this.changeItem2(this.checkItems1Id, this.checkItems1Index);
            Axios.get(this.c_url + 'get_third_items')
              .then((res) => {
              this.allitems3 = res.data;
            this.items3 = res.data;
            this.changeItem3(this.checkItems2Id, this.checkItems2Index);
          })
            ;
          })
            ;

          })
            ;
          }
        })
          ;
        }
      },
      deleteItems3:function(itemid){
        if(confirm('确定要删除该三级奖项吗，删除不可以恢复！')) {
          Axios.get(this.a_url + 'delete_items3', {params: {itemid: itemid}})
            .then((res) => {
            if(res.data == 'success'
        )
          {
            Axios.get(this.c_url + 'get_all_item')
              .then((res) => {
              this.itemlist = res.data;
            Axios.get(this.c_url + 'get_third_items')
              .then((res) => {
              this.allitems3 = res.data;
            this.items3 = res.data;
            this.changeItem3(this.checkItems2Id, this.checkItems2Index);
          })
            ;
          })
            ;
          }
        })
          ;
        }
      },

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    ul {
      cursor: pointer;
      float: left;
      height: 460px;
      overflow-y:auto;
      padding-top: 36px;
      margin-top: 5px;
    }
    i{
      color: #fff;
    }
    .input-item{
      margin-top: 50px;
    }
    #items1 li,#items2 li,#items3 li{
        padding: 5px 10px;
        background-color: #dce1e4;
        border-color: #dce1e4;
        border-radius: 4px;
        margin: 2px 5px;
        width: 190px;
    }

    ul div.add-item{
      padding: 5px 10px;
      position: absolute;
      top: -42px;
      background-color: #5bc0de;
      color: #fff;
      margin:5px 5px 5px 20px;
      border-radius: 10px;
    }
    #items3 li{
      width:250px;
    }
    #items1 li.current,#items2 li.current{
      background: #b3aeb5;
    }
    #items3 li.search input,#items2 li.search input{
      background: #dce1e4;
      border:none;
      outline:none;
      color: #fff;
      width: 130px;
    }
    ul li.search{
      position: absolute;
      top: 2px;
    }
    #items2 li.search:hover ,#items3 li.search:hover{
       background: #9ebcda;
    }
    #items2 li.search:hover input,#items3 li.search:hover input{
       background: #9ebcda;
    }
    #items1 li:hover,#items2 li:hover,#items3 li:hover{
       background: #b3aeb5;
    }
    #items1 li:hover .delete-item,#items2 li:hover .delete-item,#items3 li:hover .delete-item{
       display: inline-block;
    }
    ul li .delete-item{
      display: none;
      float: right;
    }
    #item1,#item2,#item3{
      position: relative;
    }
    ul .add-item-input{
      position: absolute;
      bottom: 0;
    }
    ul li.add-item-input input{
      background: #6599ce;
      border: none;
      outline: none;
      color:#fff;
      width: 140px;
    }
    li.add-item-input input:hover,#items1 li.add-item-input:hover,#items2 li.add-item-input:hover,#items3 li.add-item-input:hover{
       background-color: #9ebcda;
    }
    .el-row{
      margin-top: 60px;
    }
</style>



