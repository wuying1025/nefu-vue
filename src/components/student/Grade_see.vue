<template>
    <div>
        <el-col :span="20" :offset='1'>
        <el-row>
          
           <label class="nowgrade"> 您目前的德育成绩为：</label>
           <div class="grade" v-text="grade"></div>
           <div class="detail">
             <el-button @click="show1=!show1" style="margin-left:50px;">详细查询</el-button>
           </div>
           
        </el-row>
        
        <div style="height:150px;">
             <transition name="el-zoom-in-center">
             <div v-show="show1" class="transition-box">
                 <el-select v-model="value5" placeholder="请选择学期">
                    <el-option
                    v-for="item in optionsl"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                  </el-select>

                  <el-select v-model="value4" placeholder="请选择月份">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
        
                <br>
                <br>
                <el-row>
                <el-col :span="20">
                    <el-button type="primary" @click="youClick">查看</el-button>
                    <el-button type="primary" plain @click="firstClick"  v-if="isMonitor">全班成绩</el-button>
                    <el-button type="primary" @click="toExcelLong">转EXCEL</el-button>
                </el-col>   
                </el-row>
             </div>
             </transition>
        </div>
        
        <el-table

            :data="tableData3"
            height="260"
            v-show="isMyTable"
            border
            class="table"
            style="width: 100%">
            <el-table-column
            label="序号"
            prop="index"
            type="index"  
            width="80">
            </el-table-column>
            <el-table-column
            prop="content"
            label="内容及加分事项"
            width="300">
            </el-table-column>
             <el-table-column
            prop="reason"
            label="理由"
            width="200">
            <template scope="scope">
                 <span>{{scope.row.reason}}</span>
            </template> 
            </el-table-column>
            <el-table-column
            label="操作"
            width="80">           
            <template scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">证明</el-button>
            </template>    
            </el-table-column>
            <el-table-column
            prop="grade"
            label="自评分"
            width="80">
            <template scope="scope">
                 <span>{{scope.row.grade}}</span>
            </template>            
            </el-table-column>
            <el-table-column
            prop="check"
            label="审核分"
            width="80">
             <template scope="scope">
                 <span>{{scope.row.check}}</span>
            </template> 
            </el-table-column>
            <el-table-column
            prop="person"
            label="审核人">
            <template scope="scope">
                 <span>{{scope.row.person}}</span>
            </template> 
            </el-table-column>
           
        </el-table> 
        <br>
        <el-table
            :data="tableData2"
            height="260"
            v-show="isMyTable"
            border
            class="table"
            style="width: 100%">
            <el-table-column
            type="index"
            prop="index" 
            label="序号" 
            width="80">
            </el-table-column>
            <el-table-column
            prop="content"
            label="内容及减分事项"
            width="300">
            </el-table-column>
            <el-table-column
            prop="reason"
            label="理由"
            width="200">          
           <template scope="scope">
                 <span>{{scope.row.reason}}</span>
            </template> 
            </el-table-column>
            <el-table-column
            prop="grade"
            label="自评分"
            width="80">
            <template scope="scope">
                 <span>{{scope.row.grade}}</span>
            </template>            
            </el-table-column>
            <el-table-column
            prop="check"
            label="审核分"
            width="80">
            <template scope="scope">
                 <span>{{scope.row.check}}</span>
            </template> 
            </el-table-column>
            <el-table-column
            prop="person"
            label="审核人">
            <template scope="scope">
                 <span>{{scope.row.person}}</span>
            </template> 
            </el-table-column>
           
        </el-table> 


        <el-table
                id="classall"
        :data="tableData"
        class="table"
        v-show="isTable"
        max-height="300"
        style="width:100%">
        <el-table-column
        prop="class"
        label="班级"
        width="150"
        >       
        </el-table-column>
        <el-table-column
        prop="id"
        label="学号"
        width="150"
        ></el-table-column>
        <el-table-column
        prop="name"
        label="姓名"
        width="100"
        ></el-table-column>
        <el-table-column label="总分" prop="num">
        </el-table-column>
        </el-table>
        
        <div v-if="termGrade" class="content">
            您的学期的总分为：<div v-text="nowNum"></div>
        </div>

         </el-col>
    </div>
</template>
<script>
import Axios from "axios";
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
//Vue.prototype.Axios = Axios;
export default {
  data(){
      return{
        excelString:false,
        isMonitor:true,
        isTable:false,
        isMyTable:false,
        value4:'',
        value5:'',
        show1:false,
        basic:60,
        tableData:[],
        optionsl:[],
        options:[],
        getClassGrade:'http://127.0.0.1/nefu/Student/get_class_deyu',
        getNowGrade:'http://127.0.0.1/nefu/Student/cur_term_deyu',
        getMyGrade:'http://127.0.0.1/nefu/Student/get_self_deyu',
        toExcelUrlB:'',
        toExcelUrl:'',
        grade:'',
        nowNum:'',
        termGrade:false,    //所选学年的成绩
        // ontermGrade:'',     //所选当前学期的总分
        optionsl:[{value:"春期",label:"春期"},{value:"秋期",label:"秋期"}],
        add_time:{year:new Date(),term:"秋期"},
         tableData3: [{
         content:'政治上要求进步，以实际行动积极向党组织靠拢，加1分；获得党校培训《结业证书》并积极参加相关活动者，加2分 ',
          reason:'',
          grade:'',
          check:'',
          person:''
        }, {
         content:'敢于同不良行为作斗争，凭相关有效证明每次加10-20分',
          reason:'',
           grade:'',
          check:'',
          person:''
        }, {
         content:'捐献造血干细胞者，凭相关有效证明在捐献所在学期一次性加15分',
          reason:'',
           grade:'',
          check:'',
          person:''
        }, {
          content:'无偿献血者，凭相关有效证明在献血所在学期一次性加5分',
          reason:'',
           grade:'',
          check:'',
          person:''
          
        }, {
          content:'好人好事在社会上影响较大者，受到省级以上（含省级）部门书面表扬，或在国家级主流媒体给予充分报道加5分 ',
          reason:'',
           grade:'',
          check:'',
          person:''
         
        }, {
          content:'主动维护社会（校园）公共秩序，举报、揭发、劝阻违纪现象（行为）者，能够查证核实，每次加5分',
          reason:'',
           grade:'',
          check:'',
          person:''
         
        }, {
          content:'经常参加义工（不含因德育学分重修参加的义工）、志愿者活动等公益活动，每次加1分。受到省级以上部门（含省级）书面表扬，或在国家级主流媒体给予充分报道加8——10分',
          reason:'',
           grade:'',
          check:'',
          person:''
         
        },{
          content:'积极参加义务支教活动，较好地完成相应的责任和义务，每次加5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'参加爱心捐助，助人为乐，每次加1分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'自觉维护社会、校园安全稳定，加1分；文明使用互联网，遵守互联网“七条底线”，做文明网民，加1分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'爱护公共财物，保护花草树木，节约水、电、粮食，自觉维护校园环境卫生，加1分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'养成良好的卫生习惯，维护校园公共卫生，保持宿舍干净整洁，宿舍人际关系和谐，加1分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'具有拾金不昧等产生积极影响的良好行为表现者，加1——3分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'取得各类各级（以德育类为基础的）荣誉称号和有关奖励者（与专业技能相关的除外），获奖学生可以在该学期内凭奖励证书和有关证明申请加分：取得国家级荣誉称号和国家奖学金的，加15分；取得省级荣誉称号的，加10分；取得校级荣誉称号和奖励的（三好学生标兵、三好学生、优秀毕业生、优秀学生干部、东林励志之星、“五四”青年奖章、模范团干部、优秀团员等），每次加6分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'在学院或学校开展的德育工作中表现突出，院级点名表扬加2分，院级通报表扬加3分；校级点名表扬加3分，校级通报表扬加5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'获得校级优秀集体（含先进班集体、优秀团支部、优秀寝室等），成员按参加贡献程度加1——5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'被评为优秀学生分会、五四红旗团委、校级以上（含校级）优秀学生社团组织等优秀集体的成员按参与贡献程度加2——5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'严格遵守校规校级，学期内未受到校院点名批评、通报批评以及未受到任何处分者，每学期加5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'每学期无迟到、早退、旷课者，上课率100%，加3分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'按要求参加学院、学校组织的专题教育活动、讲座、报告，每次加1分',
          reason:'',
           grade:'',
          check:'',
          person:''
        }],
        tableData2:[{
          content:'在学校组织的各种政治学习、党团组织生活和其他活动中无故缺席一次减3分；迟到、早退一次减2分；事假累计三次减1分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'在网络等媒体、公开场合发表不当言论，视情节轻重减5——10分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'宣扬不良思想，参与违规违纪活动，尚未造成严重后果减5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'凡违反校规校级，每次学院点名批评减2分，每次学院通报批评减3分；每次学校点名批评减3分，每次学校通报批评减5分，警告减20分，严重警告减30分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'离校未履行请假手续，没有造成不良后果减5分；请假回校后未履行销假手续减1分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'节假日、寒暑假期满未按时返校，因故请假但不能提供有效证明减3分，未请假减6分；不按规定办理报到、注册手续，减10分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'不遵守作息时间，无正当理由晚归减5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'不遵守校园公共场所秩序，造成不良影响视情节减3——5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'有意损坏公物但情节轻微、尚未达到处分减5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'因个人床铺卫生不合格而影响寝室卫生减2——3分。卫生不合格的寝室，寝室成员每人减1分，寝室长减2分，值日生减2分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'无故不按时交纳学费，每次减10分；恶意欠交学费，每次减20分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'作为学生当事人不能妥善处置相关事件，引发关联人员干扰或影响学校的正常教学、办公或日常校园秩序，减30分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'其他违反校规校纪情况，视情节酌情减分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'上课迟到早退一次减3分，无故旷课一次减5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'扰乱课堂秩序（包括大声喧哗、玩手机、吃食物等影响别人听课的行为），一次减5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'对于学校组织的集体活动（包括文体、劳动、公益、班会、团日等），无故不到或早退者，每次减3分。不按要求参与学校组织的重大活动，每次减5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'在各项活动中不听从命令、不服从指挥者一次减3分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'校院两级组织机构学生干部，工作严重失职、对突发事件或恶性违法违纪案件不报告、不及时处理、不制止或不补救的减20分；在事故中负领导、组织责任减30分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'在校内外给学校、学院带来不良影响或做出有损大学生形象的不文明、不道德行为，视情况减5——10分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'乱说、乱写污言秽语或不尊重教职工和同学减5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'不能自觉维护校园清洁环境，在宿舍或教室墙壁乱写乱画或致墙面污损，减3分',
          reason:'',
           grade:'',
          check:'',
          person:''
        },{
          content:'自私自利，妨碍他人正常学习、生活或给他人带来一定影响，视情节减3——5分',
          reason:'',
           grade:'',
          check:'',
          person:''
        }],
        tableData:[]
      }
  },
  methods:{
      //查看全班成绩
        firstClick(){
          this.termGrade=false;
            this.isMyTable=false;
            this.isTable=true;
            Axios.get(this.getClassGrade,{params:{
               s_num:this.$cookie.get('s_num'),get_term:this.value5,month:this.value4
            }})
            .then((res)=>{
                this.tableData=res.data;
                for(var i=0;i<res.data.length;i++){
                this.tableData[i].class=res.data[i].class_id;
                this.tableData[i].name=res.data[i].s_name;
                this.tableData[i].id=res.data[i].s_num;
                this.tableData[i].num=res.data[i].score;}
               // console.log(this.tableData);
                var x = [];
                x = this.tableData;
                var y = {class_name:'班级',s_num:'学号',s_name:'姓名',d_num:'总分'}
                // x.unshift(y)
            });
        },
        //查看自己的成绩
        youClick(){
          console.log(Axios);          
            
              Axios.get('http://127.0.0.1/nefu/Student/get_self_deyu',{params:{s_num:this.$cookie.get('s_num'),get_term:this.value5,
              month:this.value4
              }}).then((res)=>{

                   console.log(this.tableData3[0].content);
                   console.log(res.data[0].d_content);  
               if(res.data.constructor == Array){
                 this.isMyTable=true;
                  this.termGrade=false;
                   this.isTable=false;
                   for(var i=0;i<this.tableData3.length;i++){                   
                     for(var j=0;j<res.data.length;j++){
                      
                    if(this.tableData3[i].content.trim()==res.data[j].d_content.trim()){
                     //console.log(res.data[j].d_content);
                      this.tableData3[i].reason=res.data[j].d_why;
                      console.log(111);
                      this.tableData3[i].grade=res.data[j].d_self;
                      //后端要把审核分和审核人拼接到数组中，用JSON传过来
                    }else{
                      // console.log(res.data[j].d_content);
                    }
                  }
                }
                 for(var i=0;i<this.tableData2.length;i++){
                  for(var j=0;j<res.data.length;j++){
                    if(this.tableData2[i].content.trim()==res.data[j].d_content.trim()){
                      this.tableData2[i].reason=res.data[j].d_why;
                      this.tableData2[i].grade=res.data[j].d_self;
                      //后端要把审核分和审核人拼接到数组中，用JSON传过来
                    }
                  }
                }

               }else{
                  this.isMyTable=false;
                 this.termGrade=true;
                 this.isTable=false;
                  this.nowNum=res.data;
               }
               
              }).catch();
              
            
            this.isTable=false;
           
        },
        handleClick(row){
            console.log(row);
        },
        toExcelLong(){
//
            /* generate workbook object from table */
            var wb = XLSX.utils.table_to_book(document.querySelector('#classall'))
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '全班成绩.xlsx')
            } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
            return wbout
      }
  },
  mounted(){   
    console.log(Axios); 
      if(this.$cookie.get('is_monitor')==1){
    			this.isMonitor = true;
    	}
      var date=new Date;
        var year=parseInt(date.getFullYear());
        console.log(year);
        this.optionsl[0] = {'value': year + '年春期','label':year + '年春期'};
        this.optionsl[1] = {'value': year - 1+ '年秋期','label':year - 1+ '年秋期'};
        this.optionsl[2] = {'value': year - 2+ '年春期','label':year - 2+ '年春期'};
        this.optionsl[3] ={'value': year - 2+ '年秋期','label':year - 2+ '年秋期'};      
          // arr[5] = {'value': grade + 3+ '年春期','label':grade + 3+ '年春期'}
          // arr[6] = {'value': grade + 3+ '年秋期','label':grade + 3+ '年秋期'}
          // arr[7] = {'value':  grade + 4 + '年春期','label': grade + 4 + '年春期'}

        var month=1;
        this.options[0]={'value':month,'label':month+'月'};
        this.options[1]={'value':month+1,'label':month+1+'月'};
        this.options[2]={'value':month+2,'label':month+2+'月'};
        this.options[3]={'value':month+3,'label':month+3+'月'};
        this.options[4]={'value':month+4,'label':month+4+'月'};
        this.options[5]={'value':month+5,'label':month+5+'月'};
        this.options[6]={'value':month+6,'label':month+6+'月'};
        this.options[7]={'value':month+7,'label':month+7+'月'};
        this.options[8]={'value':month+8,'label':month+8+'月'};
        this.options[9]={'value':month+9,'label':month+9+'月'};
        this.options[10]={'value':month+10,'label':month+10+'月'};
        this.options[11]={'value':month+11,'label':month+11+'月'};
        //获取当前成绩
        console.log(this.$cookie.get('s_num'));
       Axios.get('http://127.0.0.1/nefu/Student/cur_term_deyu',{params:{s_num:this.$cookie.get('s_num')}}).then((res)=>{
          this.grade=res.data;
       });
  }
}
</script>

<style>
    .table{
        margin-top:10px;
    }
    .transition-box {
    
    width:100%;
    height: 70px;
    border-radius: 4px;
    /* background-color: #fff; */
    text-align: center;
    color: #fff;
    padding: 40px 0;
    box-sizing: border-box;
    margin-right: 20px;
  }
 
  html,body{
      height:100%;
  }
  .term{
        margin-left:1%;
        margin-right:1%;
    }
    #grade{
        float:left;
        /* font-size:18px;
        font-weight:bold; */
    }
    .nowgrade{
        float:left;
        font-size:18px;
        font-weight:bold;
    }
    .content{
        font-size:18px;
        /* width:50px; */
        /* font-weight:bold; */
    }
    .detail{
      float:left;
    }
</style>

