<template>
    <div>
        <div class="steps">
            <el-steps :active="active" >
                <el-step title="填写申请"></el-step>
                <el-step title="提交审核"></el-step>
                <el-step title="审核完成"></el-step>
            </el-steps>
        </div>
        <div class="form">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-row>
                <el-form-item label="备注" >
                    <el-select v-model="form.remark" placeholder="备注">
                    <el-option label="院点表" value="院点表"></el-option>
                    <el-option label="院通表" value="院通表"></el-option>
                    <el-option label="校点表" value="校点表"></el-option>
                    <el-option label="校通表" value="校通表"></el-option>
                    </el-select>
                </el-form-item>
                    <!-- <el-date-picker
                    v-model="form.year"
                    type="year"
                    value-format="yyyy"
                    placeholder="选择年">
                    </el-date-picker> -->
                    <!-- 由于element ui的data picker提供的value-format方法并没有起作用，但是date-fns可以更好地处理
                    但是比较麻烦，所以采用固定年份的处理方式 什么时候element ui的value-format好用，即可解锁以上方式-->
                    <el-form-item label='学年'>      
                    <el-select v-model="form.year" placeholder="请选择学年">
                        <el-option label="2015年" value="2015"></el-option>
                        <el-option label="2016年" value="2016"></el-option>
                        <el-option label="2017年" value="2017"></el-option>
                        <el-option label="2018年" value="2018"></el-option>
                        <el-option label="2019年" value="2019"></el-option>
                    </el-select>
                    </el-form-item> 
                <!-- 期间 -->
                <el-form-item label='学期'>
                    <el-select v-model="form.period" placeholder="请选择学期">
                        <el-option label="春期" value="春期"></el-option>
                        <el-option label="秋期" value="秋期"></el-option>
                    </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                <!-- 月份 -->
                 <el-form-item label='月份'>      
                    <el-select v-model="form.month" placeholder="请选择月份">
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
                <!-- 分数 -->
                <el-form-item
                    label="分数"
                    prop="form.grade"
                    
                    :rules="[
                    { required: true, message: '分数不能为空'},
                    { type: 'number', message: '分数必须为数字值'}
                    ]"
                >
                    <el-input type="number" v-model.number="form.grade" auto-complete="off"></el-input>
                </el-form-item>
                </el-row>
                <el-row>
                    <!-- 事由 -->
                    <el-form-item label="事由">
                    <el-input v-model="form.affair" placeholder="事由" style="width:400px"></el-input>
                </el-form-item>
                </el-row>
                <el-button style="margin:0 80px" @click="dialog= true" :disabled="disabled">下一步</el-button>
            </el-form>
            <!-- 弹出层 -->
            <div class="dialog">
                <el-dialog
                    title="提示"
                    :visible.sync="dialog"
                    width="30%"
                    center>
                    <span>确定提交申请？</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialog = false">取 消</el-button>
                        <el-button type="primary" @click="onSubmit">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
     </div>
    </div>
</template>


<script>
import Axios from "axios"

export default {
  data() {
      return {
            form:{
                    year:'',
                    period:'',
                    month:'',
                    affair:'',
                    remark:'',
                    grade:'',
                    
                    },
            dialog:false,
            disabled:false,
            active:0,
            college:[],
            profession:[],
            selectcollege:'',
            c_url:'http://127.0.0.1/nefu/Common/',
            swi_url:'http://127.0.0.1/nefu/Student/set_wenti',
            }
        },
    methods: {
        onSubmit() {
            Axios.get(this.swi_url,{params:{
                    s_num:this.$cookie.get('s_num'),
                    get_term:this.form.year+"年"+this.form.period,
                    month:this.form.month,
                    w_why:this.form.affair,
                    w_type:this.form.remark,
                    w_self:this.form.grade,
            }}
            ).then((res)=>{
        
            this.active++;
            this.dialog=false;
            this.disabled=true;
            
          }).catch(()=>{
              alert("failed!");
          });
        },
    }
}
</script>
<style scoped>
    .content{
        padding:20px 60px;
        /* position:relative; */
    }
    .steps{
        margin: 20px;
        padding-left: 140px;
    }
    .form{
        text-align:center;
        margin: 60px;
    }
    .el-steps{
        width: 100%;
    }
    .button{
        width: 100%;
        text-align: center;
    }
</style>


