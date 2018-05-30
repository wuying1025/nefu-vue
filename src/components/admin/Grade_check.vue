<template>
    <div>
    <el-row>
      <el-col :span="2"><div class="filter"></div></el-col>
      <el-col :span="20">
        <el-card class="box-card">   
            <el-tabs v-model="activeName">       
            <el-tab-pane label="德育查询" name="first">
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
               <el-select v-model="valueC" placeholder="请选择班级">
                <el-option
                  v-for="item in optionsC"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> 
               <br>
               <br>
              <el-select v-model="valueS" placeholder="请选择学生">
                <el-option
                  v-for="item in optionsS"
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

              <el-select v-model="value" placeholder="请选择月份">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

                


              <br>
              <br>
              <el-button type="primary" @click="getMyPrize">确认搜索</el-button>
              <el-button type="primary" @click="toExcel" v-show="excel">转EXCEL</el-button>
              
              <div class="block">
              <el-table
                :data="tableData3"
                height="260"
                border
                v-show="isTable"
                style="width: 100%">
                <el-table-column
                label="序号"
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
                width="100">
                <template scope="scope">
                <span class="cell-edit-input">
                <el-input v-model="scope.row.check" placeholder="请输入理由" @click="handleUp(scope.row.name)" size="small"></el-input>
                </span>
            </template>   
                </el-table-column>
                <el-table-column
                prop="person"
                label="审核人">
                 <template scope="scope">
                <span class="cell-edit-input">
                <el-input v-model="scope.row.person" placeholder="请输入理由" @click="handleUp(scope.row.name)" size="small"></el-input>
                </span>
            </template>   
                </el-table-column>
                  <el-table-column
                          label="保存加分"
                          prop="add"
                          width="80">
                      <template scope="scope">
                          <el-button @click="handleClick(scope.row)" type="text" size="small" v-show="scope.row.add">保存加分</el-button>
                      </template>
                  </el-table-column>
            </el-table> 
            <br>
            <!--<el-button type="primary" v-show="safe" @click="getSafe">保存加分</el-button>-->
            <br>
            <el-table
                :data="tableData2"
                height="260"
                border
               v-show="isTable"
                style="width: 100%">
                <el-table-column
                type="index" 
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
                width="100">
                <template scope="scope">
                <span class="cell-edit-input">
                <el-input v-model="scope.row.check" placeholder="请输入理由" @click="handleUp(scope.row.name)" size="small"></el-input>
                </span>
            </template>    
                </el-table-column>
                <el-table-column
                prop="person"
                label="审核人">
                <template scope="scope">
                <span class="cell-edit-input">
                <el-input v-model="scope.row.person" placeholder="请输入理由" @click="handleUp(scope.row.name)" size="small"></el-input>
                </span>
            </template>    
                </el-table-column>
                <el-table-column
                        label="保存减分"
                        prop="short"
                        width="80">
                    <template scope="scope">
                        <el-button @click="shortClick(scope.row)" type="text" size="small" v-show="scope.row.short">保存减分</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br> 
              <!--<el-button type="primary" v-show="safe" @click="getDownSafe">保存减分</el-button>-->
              </div>

              <div class="block">
                <el-table
            :data="tableData4"
            height="260"
            v-show="isMyTable"
            border
            class="table"
            style="width: 100%">
            <el-table-column
            label="序号"
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
            :data="tableData5"
            height="260"
            v-show="isMyTable"
            border
            class="table"
            style="width: 100%">
            <el-table-column
            type="index" 
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

              </div>

              <div class="block">
                <el-table  id="my-table"
              :data="tableData"
              class="table"
              v-show="isShow"
              max-height="300"
              style="width:100%">
              <el-table-column
              prop="class"
              label="班级"
              width="150"
              ></el-table-column>
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

              </div>
            </el-tab-pane>
            <el-tab-pane label="文体查询" name="second">
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

              <el-select v-model="valueY" placeholder="请选择年级" @keyup='address'>
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

              <el-select v-model="value" placeholder="请选择月份">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>  
              </el-select>
              <br><br>
              <div>
                 <el-button type="primary" @click="search">查看</el-button>
                 <el-button type="primary" @click="mysafe" v-show="isSafe">保存</el-button>
              </div>
              <div class="block">
                <el-table :data="table" v-show="show2" style="width: 95%">
                        <el-table-column prop="id" label="学号">                          
                        </el-table-column>
                        <el-table-column prop="name" label="姓名">
                        </el-table-column>
                        <el-table-column prop="major" label="专业">         
                        </el-table-column>
                         <el-table-column prop="class" label="班级">
                        </el-table-column>
                        <el-table-column prop="month" label="月份">    
                        </el-table-column>
                        <el-table-column prop="affair" label="加分事由" width="350">
                        </el-table-column>
                        <el-table-column prop="remark" label="备注">
                        </el-table-column>
                        <el-table-column prop="mark" label="自评分">
                        </el-table-column>
                         <el-table-column prop="check" label="审核分" width="200"> 
                            <template scope="scope">
                              <span class="cell-edit-input">
                                <el-input v-model="scope.row.check" placeholder="请输入理由" @click="handleUp(scope.row.name)" size="small"></el-input>
                              </span>
                            </template>    
                        </el-table-column>
                        <el-table-column prop="person" label="审核人" width="200">
                           <template scope="scope">
                              <span class="cell-edit-input">
                                <el-input v-model="scope.row.person" placeholder="请输入理由" @click="handleUp(scope.row.name)" size="small"></el-input>
                              </span>
                            </template>  
                        </el-table-column>
                    <el-table-column
                            label="保存"
                            prop="safe"
                            width="80">
                        <template scope="scope">
                            <el-button @click="safeClick(scope.row)" type="text" size="small" v-show="scope.row.safe">保存</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
              </div>
              <div class="block">
                <el-table :data="table3" v-show="show3" style="width: 95%">
                        <el-table-column prop="id" label="学号">                          
                        </el-table-column>
                        <el-table-column prop="name" label="姓名">
                        </el-table-column> 
                        <el-table-column prop="major" label="专业">         
                        </el-table-column>
                         <el-table-column prop="class" label="班级">
                        </el-table-column>
                        <el-table-column prop="month" label="月份">    
                        </el-table-column>
                        <el-table-column prop="affair" label="加分事由" width="350">
                        </el-table-column>
                        <el-table-column prop="remark" label="备注">
                        </el-table-column>
                        <el-table-column prop="mark" label="自评分">
                        </el-table-column>
                         <el-table-column prop="check" label="审核分">
                        </el-table-column>                  
                    </el-table>
              </div>
               <div class="block">
                <el-table
              :data="table2"
              v-show="classgrade"
              max-height="300"
              style="width:100%">
              <el-table-column
              prop="class"
              label="班级"
              width="150"
              ></el-table-column>
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

              </div>




            </el-tab-pane>

            </el-tabs> 
        </el-card>

      </el-col>
      <el-col :span="2"><div class="filter"></div></el-col>
    </el-row>

  </div>
</template>
<script>
import Axios from "axios"
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
    data(){
        return{
          count:0,
          activeName: 'second',
          valueM:'',    //专业
          valueY:'',    //年级
          valueC:'',    //班级
          valueT:'',    //学期
          valueS:'',    //学生
          valueCo:'',  //学院
          optionsCo:[],
          optionsM:[],
          optionsC:[],
          optionsY:[],
          optionsl: [],
          optionsS:[],
          table:[],
          table2:[],
          table3:[],
          value:'',
        //  mon:'',    //监听年级
          options: [],  //月份
          classgrade:false,
          show2:true,
          show3:false,
          excel:'true',
          safe:'false',
          isTable:'true',
          isMyTable:'false',
          isShow:'false',
          isSafe:'true',
          i_num:'',   //用于记录查询的学号
          i_select:'',//标志位加分
          i_downSelect:'',//标志位减分
          i_stu:true, //是否发送请求的标志位
         // i_cum:[],  //建立一个数组储存id
          getProfissionUrl:'http://127.0.0.1/nefu/Common/get_profession',
          getClassUrl:'http://127.0.0.1/nefu/Common/get_class_by_pid_grade',
          getAllCollege:'http://127.0.0.1/nefu/Common/get_all_college',
           getCollege:'http://127.0.0.1/nefu/Common/get_college',
           getNameUrl:'http://127.0.0.1/nefu/Common/get_student_by_class_id',   //得到每个人的名字
           checkAdd:'http://127.0.0.1/nefu/Admin/reset_add_deyu',
           checkShort:'http://127.0.0.1/nefu/Admin/reset_short_deyu',
           research:'http://127.0.0.1/nefu/Admin/adm_get_wenti',//文体搜索
           checkUpdate:'http://127.0.0.1/nefu/Admin/reset_wenti',//文体的审核分审核人
          
          getClassSearch:'http://127.0.0.1/nefu/Admin/adm_get_deyu',  //全班搜索
          tableData:[],
          tableData3: [{
          content:'政治上要求进步，以实际行动积极向党组织靠拢，加1分；获得党校培训《结业证书》并积极参加相关活动者，加2分 ',
          reason:'',
          grade:'',
          check:'',
              person:'',
              add:false,
              i_select:1
          }, {
              content:'敢于同不良行为作斗争，凭相关有效证明每次加10-20分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          }, {
              content:'捐献造血干细胞者，凭相关有效证明在捐献所在学期一次性加15分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          }, {
              content:'无偿献血者，凭相关有效证明在献血所在学期一次性加5分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1

          }, {
              content:'好人好事在社会上影响较大者，受到省级以上（含省级）部门书面表扬，或在国家级主流媒体给予充分报道加5分 ',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1

          }, {
              content:'主动维护社会（校园）公共秩序，举报、揭发、劝阻违纪现象（行为）者，能够查证核实，每次加5分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1

          }, {
              content:'经常参加义工（不含因德育学分重修参加的义工）、志愿者活动等公益活动，每次加1分。受到省级以上部门（含省级）书面表扬，或在国家级主流媒体给予充分报道加8——10分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1

          },{
              content:'积极参加义务支教活动，较好地完成相应的责任和义务，每次加5分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          },{
              content:'参加爱心捐助，助人为乐，每次加1分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          },{
              content:'自觉维护社会、校园安全稳定，加1分；文明使用互联网，遵守互联网“七条底线”，做文明网民，加1分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          },{
              content:'爱护公共财物，保护花草树木，节约水、电、粮食，自觉维护校园环境卫生，加1分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          },{
              content:'养成良好的卫生习惯，维护校园公共卫生，保持宿舍干净整洁，宿舍人际关系和谐，加1分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          },{
              content:'具有拾金不昧等产生积极影响的良好行为表现者，加1——3分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          },{
              content:'取得各类各级（以德育类为基础的）荣誉称号和有关奖励者（与专业技能相关的除外），获奖学生可以在该学期内凭奖励证书和有关证明申请加分：取得国家级荣誉称号和国家奖学金的，加15分；取得省级荣誉称号的，加10分；取得校级荣誉称号和奖励的（三好学生标兵、三好学生、优秀毕业生、优秀学生干部、东林励志之星、“五四”青年奖章、模范团干部、优秀团员等），每次加6分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          },{
              content:'在学院或学校开展的德育工作中表现突出，院级点名表扬加2分，院级通报表扬加3分；校级点名表扬加3分，校级通报表扬加5分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          },{
              content:'获得校级优秀集体（含先进班集体、优秀团支部、优秀寝室等），成员按参加贡献程度加1——5分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          },{
              content:'被评为优秀学生分会、五四红旗团委、校级以上（含校级）优秀学生社团组织等优秀集体的成员按参与贡献程度加2——5分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          },{
              content:'严格遵守校规校级，学期内未受到校院点名批评、通报批评以及未受到任何处分者，每学期加5分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          },{
              content:'每学期无迟到、早退、旷课者，上课率100%，加3分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          },{
              content:'按要求参加学院、学校组织的专题教育活动、讲座、报告，每次加1分',
              reason:'',
              grade:'',
              check:'',
              person:'',
              add:false,
              i_select:1
          }],
            tableData2:[{
                content:'在学校组织的各种政治学习、党团组织生活和其他活动中无故缺席一次减3分；迟到、早退一次减2分；事假累计三次减1分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'在网络等媒体、公开场合发表不当言论，视情节轻重减5——10分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'宣扬不良思想，参与违规违纪活动，尚未造成严重后果减5分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'凡违反校规校级，每次学院点名批评减2分，每次学院通报批评减3分；每次学校点名批评减3分，每次学校通报批评减5分，警告减20分，严重警告减30分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'离校未履行请假手续，没有造成不良后果减5分；请假回校后未履行销假手续减1分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'节假日、寒暑假期满未按时返校，因故请假但不能提供有效证明减3分，未请假减6分；不按规定办理报到、注册手续，减10分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'不遵守作息时间，无正当理由晚归减5分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'不遵守校园公共场所秩序，造成不良影响视情节减3——5分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'有意损坏公物但情节轻微、尚未达到处分减5分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'因个人床铺卫生不合格而影响寝室卫生减2——3分。卫生不合格的寝室，寝室成员每人减1分，寝室长减2分，值日生减2分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'无故不按时交纳学费，每次减10分；恶意欠交学费，每次减20分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'作为学生当事人不能妥善处置相关事件，引发关联人员干扰或影响学校的正常教学、办公或日常校园秩序，减30分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'其他违反校规校纪情况，视情节酌情减分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'上课迟到早退一次减3分，无故旷课一次减5分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'扰乱课堂秩序（包括大声喧哗、玩手机、吃食物等影响别人听课的行为），一次减5分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'对于学校组织的集体活动（包括文体、劳动、公益、班会、团日等），无故不到或早退者，每次减3分。不按要求参与学校组织的重大活动，每次减5分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'在各项活动中不听从命令、不服从指挥者一次减3分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'校院两级组织机构学生干部，工作严重失职、对突发事件或恶性违法违纪案件不报告、不及时处理、不制止或不补救的减20分；在事故中负领导、组织责任减30分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'在校内外给学校、学院带来不良影响或做出有损大学生形象的不文明、不道德行为，视情况减5——10分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'乱说、乱写污言秽语或不尊重教职工和同学减5分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'不能自觉维护校园清洁环境，在宿舍或教室墙壁乱写乱画或致墙面污损，减3分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
            },{
                content:'自私自利，妨碍他人正常学习、生活或给他人带来一定影响，视情节减3——5分',
                reason:'',
                grade:'',
                check:'',
                person:'',
                short:false,
                i_downSelect:1
        }],
        tableData4: [{
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
        tableData5:[{
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
          input:''   //月份
        }
    },
     created(){
         this.isShow=false;
        if(this.$cookie.get('genre')!=1){
         this.safe=false;
         this.excel=false;
         this.isTable=false;
         this.isMyTable=true;
         this.isSafe=false;
         this.show3=true;
         this.show2=false;
         // this.check=false;
        }else{
           this.isTable=true;
         this.isMyTable=false;
         this.isSafe=true;
         this.show3=false;
         this.show2=true;
        }
        

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
        var date=new Date;
        var year=parseInt(date.getFullYear());
        this.optionsY[0] = {'value':year,'label':year};
        this.optionsY[1] = {'value':year - 1,'label':year - 1};
        this.optionsY[2] = {'value':year - 2,'label':year - 2};
        this.optionsY[3] = {'value':year - 3,'label':year - 3};

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

     },
     watch:{
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
        valueC:function(val){
          console.log(this.$cookie.get('class_id'));
           Axios.get(this.getNameUrl,{params:{
            class_id:val}})
            .then((res)=>{
          		console.log(res.data);
              var x = [];
              for(var i = 0;i<res.data.length;i++){
                var obj = new Object();
                obj.label = res.data[i].s_name;
                obj.value = res.data[i].s_id;
                x[i] = obj;

              }
              this.optionsS = x;
            });
        },
        valueY:function(val){
         // console.log(grade);
           var arr = new Array(8);
          var grade = parseInt(val);
          arr[0] = {'value': grade + '年秋期','label':grade + '年秋期'}
          arr[1] = {'value': grade + '年春期','label':grade + '年春期'}
          arr[2] = {'value': grade + 1+ '年秋期','label':grade + 1+ '年秋期'}
          arr[3] = {'value': grade + 1+ '年春期','label':grade + 1+ '年春期'}
          arr[4] = {'value': grade + 2+ '年秋期','label':grade + 2+ '年秋期'}
          arr[5] = {'value': grade + 2+ '年春期','label':grade + 2+ '年春期'}
          arr[6] = {'value': grade + 3+ '年秋期','label':grade + 3+ '年秋期'}
          arr[7] = {'value':  grade + 3 + '年春期','label': grade + 3 + '年春期'}
          this.optionsl = arr;
    
          Axios.get(this.getClassUrl,{params:{
            grade:val,
           pid:this.valueM}})  
            //grade:this.$cookie.get("s_grade")}})
            .then((res)=>{
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
       
     },
     methods:{
         toExcel(){
             /* generate workbook object from table */
             var wb = XLSX.utils.table_to_book(document.querySelector('#my-table'))
             /* get binary string as output */
             var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
             try {
                 FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
             } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
             return wbout
         },
       getMyPrize(){
         //普通管理员搜索
        if(this.$cookie.get('genre')!=1){
           Axios.get(this.getClassSearch,{params:{
            class_id:this.valueC,
           get_term:this.valueT,
          month:this.value ,
           s_id:this.valueS
          }}).then((res)=>{
            //console.log(res.data[0].score);
              if(res.data[0].score){
                 this.isMyTable=false;
                 this.isShow=true;  
                
                  this.tableData=res.data;
               for(var i=0;i<res.data.length;i++){
                this.tableData[i].class=res.data[i].class_id;
                this.tableData[i].name=res.data[i].s_name;
                this.tableData[i].id=res.data[i].s_num;
                this.tableData[i].num=res.data[i].score;}
                var x = [];
                x = this.tableData;
                var y = {pid:'专业',class_name:'班级',s_num:'学号',s_name:'姓名',d_num:'总分'}
               //  x.unshift(y)  
              }else{
                this.isShow=false;
                this.isMyTable=true;
              
             for(var i=0;i<this.tableData4.length;i++){
                     for(var j=0;j<res.data.length;j++){                  
                    if(this.tableData4[i].content.trim()==res.data[j].d_content.trim()){
                     //console.log(res.data[j].d_content);
                      this.tableData4[i].reason=res.data[j].d_why;
                      console.log(111);
                      this.tableData4[i].grade=res.data[j].d_self;
                      this.tableData4[i].check=res.data[j].d_cfm;
                      this.tableData4[i].person=res.data[j].d_who;
                      //后端要把审核分和审核人拼接到数组中，用JSON传过来
                    }else{
                      // console.log(res.data[j].d_content);
                    }
                  }
                }
                 for(var i=0;i<this.tableData5.length;i++){
                  for(var j=0;j<res.data.length;j++){
                    if(this.tableData5[i].content.trim()==res.data[j].d_content.trim()){
                      this.tableData5[i].reason=res.data[j].d_why;
                      this.tableData5[i].grade=res.data[j].d_self;
                       this.tableData5[i].check=res.data[j].d_cfm;
                      this.tableData5[i].person=res.data[j].d_who;
                      //后端要把审核分和审核人拼接到数组中，用JSON传过来
                    }
                  }
                }
              }
            
            
          });        
        }else{
        //高级管理员搜索           
          Axios.get(this.getClassSearch,{params:{
            class_id:this.valueC,
           get_term:this.valueT,
          month:this.value ,
           s_id:this.valueS
          }}).then((res)=>{
            //console.log(res.data[0].score);
              if(res.data[0].score){
                 this.isTable=false;
                 this.isShow=true;  
                 this.safe=false;
                  this.tableData=res.data;
               for(var i=0;i<res.data.length;i++){
                this.tableData[i].class=res.data[i].class_id;
                this.tableData[i].name=res.data[i].s_name;
                this.tableData[i].id=res.data[i].s_num;
                this.tableData[i].num=res.data[i].score;}
                var x = [];
                x = this.tableData;
                var y = {pid:'专业',class_name:'班级',s_num:'学号',s_name:'姓名',d_num:'总分'}
               //  x.unshift(y)  
              }else{
                this.isShow=false;
                this.isTable=true;
                this.safe=true; 
                this.i_num=res.data[0].s_num;              
//              this.i_select=res.data[0].d_sta;
                //this.i_downSelect=res.data[0].d_sta;
                 console.log(this.i_select);
             for(var i=0;i<this.tableData3.length;i++){                   
                     for(var j=0;j<res.data.length;j++){                  
                    if(this.tableData3[i].content.trim()==res.data[j].d_content.trim()){
                     //console.log(res.data[j].d_content);
                      this.tableData3[i].reason=res.data[j].d_why;
                      this.tableData3[i].grade=res.data[j].d_self;
                        this.tableData3[i].i_select=res.data[j].d_sta;
                        if(this.tableData3[i].i_select==2){
                            this.tableData3[i].add=false;
                        }else{
                            this.tableData3[i].add=true;
                        }
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
                        if(i_downSelect==2){
                            this.tableData2[i].short=false;
                        }else {
                            this.tableData2[i].short = true;
                        }
                      //后端要把审核分和审核人拼接到数组中，用JSON传过来
                    }
                  }
                }
              }
            
            
          });
       
          

         
        }       
       },
       getSafe(){
          console.log(this.i_select);
          if(this.i_select==2){
            alert("已经审核过了！");
          }else{
          var num=new Array();
          for(var i=0;i<this.tableData3.length;i++){
             if(this.tableData3[i].check!='' && this.tableData3[i].person!=''){
               this.tableData3[i].index=i;
               this.tableData3[i].get_term=this.valueT;
               this.tableData3[i].month=this.value;
               this.tableData3[i].d_tag=1;
               this.tableData3[i].s_num=this.i_num;
                num.push(this.tableData3[i]);
               
             }
          }        
              var bim=num;
            Axios.get(this.checkAdd,{params:{pim:bim}
            
            }).then((res)=>{
              alert('保存成功');
              this.i_select=2;
             console.log(i_select);
            });
          }
       },
       getDownSafe(){
         console.log(this.i_select);
         if(this.i_downSelect==2){
           alert('已经审核过了');
         }else{
           var num1=new Array();
           for(var i=0;i<this.tableData2.length;i++){
             
              if(parseInt(this.tableData2[i].check)>=0){
                 alert('请输入小于0的数');
                 this.tableData2[i].check='';
                 this.i_stu=false;
               }else if(this.tableData2[i].check!='' && this.tableData2[i].person!=''){              
               this.tableData2[i].index=i;
               this.tableData2[i].get_term=this.valueT;
               this.tableData2[i].month=this.value;
               this.tableData2[i].d_tag=2;
               this.tableData2[i].s_num=this.i_num;
                num1.push(this.tableData2[i]);
                this.i_stu=true;
             
           }
          }
         var cim=num1;
            console.log(cim);
            if(this.i_stu==true){
            Axios.get(this.checkShort,{params:{pim:cim}
            
            }).then((res)=>{
              alert('保存成功');
              this.i_downSelect=2;
             console.log(res);
            });
            }
         }
       },//文体搜索
       search(){
         if(this.$cookie.get('genre')!=1){  
           Axios.get(this.research,{params:{

              class_id:this.valueC,
              get_term:this.valueT,
               month:this.value
              
            }}).then((res)=>{
              if(res.data[0].score){

                this.table2=res.data;
                 this.show3=false;
                 this.classgrade=true;  
               for(var i=0;i<res.data.length;i++){
                this.table2[i].class=res.data[i].class_name;
                this.table2[i].name=res.data[i].s_name;
                this.table2[i].id=res.data[i].s_num;
                this.table2[i].num=res.data[i].score;

               }
                var x = [];
                x = this.table2;
                var y = {pid:'专业',class_name:'班级',s_num:'学号',s_name:'姓名',d_num:'总分'}
               //  x.unshift(y)  
              }else{
                this.classgrade=false;
                 this.show3=true;  
                this.table3=res.data;
                for(var i=0;i<res.data.length;i++){
                this.table3[i].class=res.data[i].class_name;
                this.table3[i].name=res.data[i].s_name;
                this.table3[i].id=res.data[i].s_num;
                this.table3[i].major=res.data[i].cname;
                this.table3[i].month=res.data[i].month;
                this.table3[i].affair=res.data[i].w_why;
                this.table3[i].remark=res.data[i].w_type;
                this.table3[i].mark=res.data[i].w_self;
                  this.table3[i].check=res.data[i].w_cfm;
                }
              }
            });
           }else{ 
             Axios.get(this.research,{params:{
              class_id:this.valueC,
              c_id:this.valueM,
              get_term:this.valueT,
              month:this.value             
            }}).then((res)=>{
            console.log(res.data[0].score);
              if(res.data[0].score){
                this.table2=res.data;
                 this.show2=false;
                 this.classgrade=true;  
               for(var i=0;i<res.data.length;i++){
                this.table2[i].class=res.data[i].class_name;
                this.table2[i].name=res.data[i].s_name;
                this.table2[i].id=res.data[i].s_num;
                this.table2[i].num=res.data[i].score;
                console.log(this.table2);
                }
                var x = [];
                x = this.table2;
                var y = {pid:'专业',class_name:'班级',s_num:'学号',s_name:'姓名',d_num:'总分'}
                
              }else{
                this.classgrade=false;
                this.show2=true;                
                this.table=res.data;
                
                for(var i=0;i<res.data.length;i++){
                this.table[i].class=res.data[i].class_name;
                this.table[i].name=res.data[i].s_name;
                this.table[i].id=res.data[i].s_num;
                this.table[i].major=res.data[i].cname;
                this.table[i].month=res.data[i].month;
                this.table[i].affair=res.data[i].w_why;
                this.table[i].remark=res.data[i].w_type;
                this.table[i].mark=res.data[i].w_self;
                this.table[i].imi=res.data[i].w_id;
                    this.table[i].safe=true;
                this.count++;
                
                }
                console.log(this.count);
              }
            });
           }
       },
       mysafe(){
           var num2=new Array();
          for(var i=0;i<this.count;i++){
          
             if(this.table[i].check!='' && this.table[i].person!=''){
         
               this.table[i].index=i;
               this.table[i].get_term=this.valueT;
               this.table[i].month=this.value;
               this.table[i].d_tag=1;
               this.table[i].s_num=this.$cookie.get('s_num');
                 this.table[i].w_who=this.table[i].person;
                  this.table[i].w_cfm=this.table[i].check;
                 
                num2.push(this.table[i]);
               
             }
         
          }        
   
              var bim=num2;
              console.log(bim);
            Axios.get(this.checkUpdate,{params:{pim:bim}

            }).then((res)=>{
              alert('保存成功');
             console.log(res);
            });
       },
         handleClick(row){
             console.log(row);
             var obj=new Object();
             obj.get_term=this.valueT;
             obj.month=this.value;
             obj.d_tag=1;
             obj.s_num=this.i_num;
             obj.check=row.check;
             obj.person=row.person;
             obj.reason=row.reason;
             Axios.get(this.checkAdd,{params:{pim:obj}

             }).then((res)=>{
                 alert('保存成功');
                 row.i_select=2;
                 row.add=false;
                 // this.i_select=2;
                 //console.log(i_select);
             });

         },
         shortClick(row){
             var num1=new Object;
             if(row.check>=0){
                 alert('请输入小于0的数');
                 row.check='';
                 this.i_stu=false;
             }else{
                 num1.get_term=this.valueT;
                 num1.month=this.value;
                 num1.d_tag=2;
                 num1.s_num=this.i_num;
                 num1.check=row.check;
                 num1.person=row.person;
                 obj.reason=row.reason;
                 this.i_stu=true;
             }
             if(this.i_stu==true){
                 Axios.get(this.checkShort,{params:{pim:num1}

                 }).then((res)=>{
                     alert('保存成功');
                     //this.i_downSelect=2;
                     row.short=false;
                     console.log(res);
                 });
             }
         },
         safeClick(row){
             console.log(row);
             var num2=new Object();
             num2.get_term=this.valueT;
             num2.month=this.value;
             num2.d_tag=1;
             num2.s_num=this.$cookie.get('s_num');
             num2.w_who=row.person;
             num2.w_cfm=row.check;
             num2.imi=row.imi;
             Axios.get(this.checkUpdate,{params:{pim:num2}

             }).then((res)=>{
                 alert('保存成功');
                 // this.i_wtselect=2;
                 // row.safe=false;
                 console.log(res);
             });
       }
     }
}
</script>
<style>
  .filter{
    width: 100%;
    height: 1px;
  }
  .el-tabs{
    text-align: center;
  }
  .block{
    width: 100%;
    margin-top: 30px;
  }
   .cell-edit-input{
        width:100px;
    }
  
</style>
