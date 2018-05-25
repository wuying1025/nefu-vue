<template>
  <div>
    <el-row>
      <el-col :span="2"><div class="filter"></div></el-col>
      <el-col :span="20">
        <el-card class="box-card">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="人查奖" name="first">
              <el-input v-model="sNumber" placeholder="请输入学号"></el-input>
              <el-input v-model="sName" placeholder="请输入姓名"></el-input>
              <el-select v-model="valueYP" placeholder="请选择学期">
                <el-option
                  v-for="item in optionsYP"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <br>
              <br>
              <el-button type="primary" @click="getMyPrize">确认搜索</el-button>
              <el-button type="primary" @click="toExcel">转EXCEL</el-button>
              <div class="block">
              <el-table
                      id="person"
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="s_name"
                  label="姓名"
                  width="250px">
                </el-table-column>
                  <el-table-column
                    prop="s_num"
                    label="学号"
                    width="250px">
                  </el-table-column>
                <el-table-column
                  prop="get_time"
                  label="获奖日期"
                  width="250px">
                </el-table-column>
                <el-table-column
                  prop="i_name"
                  label="所获奖项"
                  width="250px">
                </el-table-column>


              </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="奖查人" name="second">
              <el-select v-model="valueCo" placeholder="请选择学院">
                <el-option
                  v-for="item in optionsCo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              <el-select v-model="valueM" placeholder="请选择专业">
                <el-option
                  v-for="item in optionsM"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              <el-select v-model="valueY" placeholder="请选择年级" >
                <el-option
                  v-for="item in optionsY"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <br>
              <br>
              <el-select v-model="valueC" placeholder="请选择班级">
                <el-option
                  v-for="item in optionsC"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              <el-select v-model="valueT" placeholder="请选择学期">
                <el-option
                  v-for="item in optionsl"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>


                <el-cascader
                  placeholder="请选择奖项(可搜索关键字)"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange"
                  filterable
                  change-on-select>
                </el-cascader>


              <br>
              <br>
              <el-button type="primary"  @click="getPrizeToPerson">确认搜索</el-button>
              <el-button type="primary" @click="toExcelLong">转EXCEL</el-button>
              <div class="block">
              <el-table
                      id="prize"
                :data="tableDataMany"
                border
                style="width: 100%">
                <el-table-column
                  prop="u_name"
                  label="姓名"
                  width="250px">
                </el-table-column>
                <el-table-column
                  prop="s_num"
                  label="学号"
                  width="250px">
                </el-table-column>
                <el-table-column
                  prop="i_name"
                  label="所获奖项"
                  width="250px">
                </el-table-column>
                <el-table-column
                  prop="get_time"
                  label="获奖时间"
                  width="250px">
                </el-table-column>

              </el-table>
              </div>
            </el-tab-pane>

          </el-tabs>
        </el-card>

      </el-col>
      <el-col :span="2"><div class="filter"></div></el-col>
    </el-row>


    <div class="toexcel" v-if="show">

    </div>



  </div>
</template>

<script>
  import Axios from "axios"
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    name: 'search',
    data () {
    		return {
          excelString:false,
          toExcelUrlA:'',
          toExcelUrlB:'',
          show:false,
          selectedOptions:[],
          tableData: [],
          tableDataMany:[],
          theItem:'',
          myPrizeUrl:'http://127.0.0.1/nefu/Common/person_to_prize',
          getThreeUrl:'http://127.0.0.1/nefu/Common/get_third_items',
          getProfissionUrl:'http://127.0.0.1/nefu/Common/get_profession',
          getClassUrl:'http://127.0.0.1/nefu/Common/get_class_by_pid_grade',
          getAllCollege:'http://127.0.0.1/nefu/Common/get_all_college',
          getCollege:'http://127.0.0.1/nefu/Common/get_college',
          getPrizePerson:'http://127.0.0.1/nefu/Common/prize_to_person',
          toExcelUrl:'http://127.0.0.1/nefu/Common/to_excel',
          activeName: 'second',
    				sNumber:'',
            sName:'',
          valueM:'',
          valueY:'',
          valueC:'',
          valueT:'',
          valueCo:'',
          valueYP:'',
          optionsYP:[],
          optionsCo:[],
          optionsM:[],
          optionsC:[],
          optionsY:[],
          optionsl: [],
          value: '',
          options: [],

        }
    },
    methods: {
        toExcel(){
          /* generate workbook object from table */
            var wb = XLSX.utils.table_to_book(document.querySelector('#person'))
          /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '获奖名单.xlsx')
            } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
            return wbout
        },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      handleChange(value) {
        console.log(value);
        this.theItem = value[2];
      },
      getMyPrize(){
        Axios.get(this.myPrizeUrl,{params:{
          num:this.sNumber,name:this.sName,term:this.valueYP}})
          .then((res)=>{
            this.tableData = res.data;
            //console.log(JSON.stringify(this.tableData))
            // var x = [];
            // x = this.tableData;
            // var y = {s_name:'姓名',s_num:'学号',get_time:'获奖日期',i_name:'所获奖项'}
            // x.unshift(y);
            // console.log(JSON.stringify(x));
          });


      },
      getPrizeToPerson(){
        Axios.get(this.getPrizePerson,{
        		params:{
            college:this.valueCo,
            grade:this.valueY,
            major:this.valueM,
            class:this.valueC,
            prize:this.theItem,
            term:this.valueT
        		}})
          .then((res)=>{
        		// console.log(this.valueCo,this.valueY,this.valueM,this.valueC,this.theItem,this.valueT)
            this.tableDataMany = res.data;
            // var x = [];
            // x = this.tableData;
            // var y = {s_name:'姓名',s_num:'学号',get_time:'获奖日期',i_name:'所获奖项'}
            // x.unshift(y);
            // console.log(res.data);
          });
      },
      toExcelLong(){
        /* generate workbook object from table */
          var wb = XLSX.utils.table_to_book(document.querySelector('#prize'))
        /* get binary string as output */
          var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
          try {
              FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '获奖人.xlsx')
          } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
          return wbout
      }
    },
    mounted () {


      Axios.get(this.getThreeUrl)
        .then((res)=>{
          var x = res.data

          x.forEach(element => {
              this.options.push({
                value: element.id,
                label: element.name
              });
          });
          // this.options = x;
        });





      if(this.$cookie.get('genre')!=1){
        var grade = parseInt(this.$cookie.get('grade'))
        var arr = new Array(8);
        arr[0] = {'value': grade + '年秋期','label':grade + '年秋期'}
        arr[1] = {'value': grade + 1+ '年春期','label':grade + 1+ '年春期'}
        arr[2] = {'value': grade + 1+ '年秋期','label':grade + 1+ '年秋期'}
        arr[3] = {'value': grade + 2+ '年春期','label':grade + 2+ '年春期'}
        arr[4] = {'value': grade + 2+ '年秋期','label':grade + 2+ '年秋期'}
        arr[5] = {'value': grade + 3+ '年春期','label':grade + 3+ '年春期'}
        arr[6] = {'value': grade + 3+ '年秋期','label':grade + 3+ '年秋期'}
        arr[7] = {'value':  grade + 4 + '年春期','label': grade + 4 + '年春期'}
        this.optionsl = arr;



        Axios.get(this.getProfissionUrl,{params:{
          pid:this.$cookie.get('college_id')}})
          .then((res)=>{
            var x = [];
            for(var i = 0;i<res.data.length;i++){
              var obj = new Object();
              obj.label = res.data[i].name;
              obj.value = res.data[i].c_id;
              obj.pid = res.data[i].cid;
              x[i] = obj;

            }
            this.optionsM = x;
          });

        var obj = new Object();
        obj.value = this.$cookie.get('grade');
        obj.label = this.$cookie.get('grade');
        this.optionsY[0] = obj;
        Axios.get(this.getCollege)
          .then((res)=>{
        		var x = [];
            for(var i = 0;i<res.data.length;i++){
              var obj = new Object();
              obj.value = res.data[i].c_id;
              obj.label = res.data[i].name;
              x[i] = obj;
            }
            this.optionsCo = x;
          });
      }else{
        var date=new Date;
        var year=parseInt(date.getFullYear());
        this.optionsY[0] = {'value':year,'label':year};
        this.optionsY[1] = {'value':year - 1,'label':year - 1};
        this.optionsY[2] = {'value':year - 2,'label':year - 2};
        this.optionsY[3] = {'value':year - 3,'label':year - 3};


        // console.log(year);
        Axios.get(this.getAllCollege)
          .then((res)=>{
        		var x = [];
            for(var i = 0;i<res.data.length;i++){
              var obj = new Object();
              obj.value = res.data[i].c_id;
              obj.label = res.data[i].name;
              x[i] = obj;
            }
            this.optionsCo = x;
          });


      }
    },
    watch:{
        valueY:function(val){
          var arr = new Array(8);
          var grade = parseInt(val);
          arr[0] = {'value': grade + '年秋期','label':grade + '年秋期'}
          arr[1] = {'value': grade + 1+ '年春期','label':grade + 1+ '年春期'}
          arr[2] = {'value': grade + 1+ '年秋期','label':grade + 1+ '年秋期'}
          arr[3] = {'value': grade + 2+ '年春期','label':grade + 2+ '年春期'}
          arr[4] = {'value': grade + 2+ '年秋期','label':grade + 2+ '年秋期'}
          arr[5] = {'value': grade + 3+ '年春期','label':grade + 3+ '年春期'}
          arr[6] = {'value': grade + 3+ '年秋期','label':grade + 3+ '年秋期'}
          arr[7] = {'value':  grade + 4 + '年春期','label': grade + 4 + '年春期'}
          this.optionsl = arr;

          console.log(this.valueM);
          Axios.get(this.getClassUrl,{params:{
            grade:val,pid:this.valueM}})
            .then((res)=>{
          		console.log(res.data);
              var x = [];
              for(var i = 0;i<res.data.length;i++){
                var obj = new Object();
                obj.label = res.data[i].class_name;
                obj.value = res.data[i].id;
                x[i] = obj;

              }
              this.optionsC = x;
            });
        },
        valueCo:function(val){
          Axios.get(this.getProfissionUrl,{params:{
            pid:val}})
            .then((res)=>{
              var x = [];
              for(var i = 0;i<res.data.length;i++){
                var obj = new Object();
                obj.label = res.data[i].name;
                obj.value = res.data[i].c_id;
                obj.pid = res.data[i].cid;
                x[i] = obj;

              }
              this.optionsM = x;
            });
        },
        sNumber:function(val){
        		if(val.length >=4){
              var str = val.slice(0,4);
              var arr = new Array(8);
              var grade = parseInt(str);
              arr[0] = {'value': grade + '年秋期','label':grade + '年秋期'}
              arr[1] = {'value': grade + 1+ '年春期','label':grade + 1+ '年春期'}
              arr[2] = {'value': grade + 1+ '年秋期','label':grade + 1+ '年秋期'}
              arr[3] = {'value': grade + 2+ '年春期','label':grade + 2+ '年春期'}
              arr[4] = {'value': grade + 2+ '年秋期','label':grade + 2+ '年秋期'}
              arr[5] = {'value': grade + 3+ '年春期','label':grade + 3+ '年春期'}
              arr[6] = {'value': grade + 3+ '年秋期','label':grade + 3+ '年秋期'}
              arr[7] = {'value':  grade + 4 + '年春期','label': grade + 4 + '年春期'}
              this.optionsYP = arr;
            }
        }
    }
  }
</script>

<style scoped>
  .filter{
    width: 100%;
    height: 1px;
  }
  .el-tabs{
    text-align: center;
  }
  .el-input{
    width: 20%;
  }
  .toexcel{

  }
  .block{
    width: 100%;
    margin-top: 50px;
  }
</style>
