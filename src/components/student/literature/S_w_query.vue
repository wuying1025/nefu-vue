<template>
    <div>
        <div class="bar">
            <el-row>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-col :span="7">
                    <el-form-item lable='年份'>      
                    <el-select v-model="year" placeholder="请选择学年">
                        <!-- <el-option label="2015年春期" value="2015年春期"></el-option>
                        <el-option label="2016年春期" value="2016年春期"></el-option> -->
                        <el-option label="2017年秋期" value="2017年秋期"></el-option>
                        <el-option label="2018年春期" value="2018年春期"></el-option>
                        <el-option label="2018年秋期" value="2018年秋期"></el-option>
                        <el-option label="2019年春期" value="2019年春期"></el-option>
                    </el-select>
                    </el-form-item> 
                   </el-col>
                
                <el-col :span="7">
                    <el-form-item lable='月份'>      
                    <el-select v-model="month" placeholder="请选择月份">
                        <el-option label="一月" value="1"></el-option>
                        <el-option label="二月" value="2"></el-option>
                        <el-option label="三月" value="3"></el-option>
                        <el-option label="四月" value="4"></el-option>
                        <el-option label="五月" value="5"></el-option>
                        <el-option label="六月" value="6"></el-option>
                        <el-option label="七月" value="7"></el-option>
                        <el-option label="八月" value="8"></el-option>
                        <el-option label="九月" value="9"></el-option>
                        <el-option label="十月" value="10"></el-option>
                        <el-option label="十一月" value="11"></el-option>
                        <el-option label="十二月" value="12"></el-option>
                    </el-select>
                    </el-form-item> 
                </el-col>
                
                <br>
                <el-col :span="6">
                    <el-form-item>
                        <el-button type="primary" @click="search_self">查看本人成绩</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item>
                        <el-button type="primary" @click="search_class" v-show="isMonitor">查看学期班级成绩</el-button>
                    </el-form-item>
                </el-col> 
               
                
                </el-form>      
            </el-row>
         </div>

        <div class="content" v-show="isShow">
            <el-row>
                <el-col>
                    <el-table :data="table" stripe style="width: 98%">
                        <el-table-column prop="s_num" label="学号">
                        </el-table-column>
                        <el-table-column prop="s_name" label="姓名">
                        </el-table-column>
                        <el-table-column prop="get_term" label="时间" width="250">
                        </el-table-column>
                        <el-table-column prop="w_why" label="事务" width="250">
                        </el-table-column>
                        <el-table-column prop="w_cfm" label="审核分">
                        </el-table-column>                   
                        <el-table-column prop="w_type" label="备注">
                        </el-table-column>
                    </el-table>
                </el-col> 
            </el-row>
        </div>
        <div v-if="termGrade">
            <!-- 您本学期的总分为： -->
            <div v-text="nowNum"></div>
        </div>
    </div>
</template>


<script>
import Axios from 'axios'

export default {
  data(){
      return{
          isMonitor:0,
          isShow:true,
          termGrade:false,
          nowNum:'',
          year:'',
          month:'',
          form:{},
          ws_url:'http://222.27.161.5/nefu/Student/get_self_wenti',
          wc_url:'http://222.27.161.5/nefu/Student/get_class_wenti',
          table:[],             
          option:"",        
  }
  },

  mounted(){
      if(this.$cookie.get('is_monitor')==1){
    			this.isMonitor = 1;
        }else{
            this.isMonitor = 0;
        }
  },
  methods: {     
      search_self(){
          Axios.get(this.ws_url,{params:{
               s_num:this.$cookie.get('s_num'),
               get_term:this.year,
               month:this.month,
          }})
            .then(res=>{
           console.log(res);
          if(res.data.constructor == Array){
               this.termGrade=false;
              this.isShow=true;
              this.table=res.data;
               for(var i=0;i<res.data.length;i++){
                this.table[i].s_num=res.data[i].s_num;
                this.table[i].s_name=res.data[i].s_name;
       
                this.table[i].w_why=res.data[i].w_why;
                this.table[i].w_cfm=res.data[i].score;
                this.table[i].w_type=res.data[i].w_type;}
          }else{
              this.termGrade=true;
              this.isShow=false;
               this.nowNum=res.data;
          }
            
          }).catch(res=>{
              alert("failed!");
          });
          
      },
     search_class(){
           
            Axios.get(this.wc_url,{params:{
                s_num:this.$cookie.get('s_num'),
                get_term:this.year,
                month:this.month
                }}
                ).then((res)=>{
                 this.table=res.data;
                  this.isShow=true;
                  this.termGrade=false;
               for(var i=0;i<res.data.length;i++){
                this.table[i].s_num=res.data[i].s_num;       
                this.table[i].w_why=res.data[i].w_why;
                this.table[i].w_cfm=res.data[i].score;
                this.table[i].w_type=res.data[i].w_type;
                this.table[i].s_name=res.data[i].s_name;
                }               
            }).catch(()=>{
                alert("class failed!");
            });
          }
    }
}
</script>
<style scoped>

    .el-col{
        text-align:center;
        margin:10px 0;
    }
    .el-row{
        margin:0 auto;
    }
    .el-table{
        margin: 0 auto;
    } 
    
    .content{
        margin:50px;
    }
</style>


