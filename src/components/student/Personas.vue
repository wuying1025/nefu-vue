<template>
<div class="personas">
	<div class='content'>
	  <div class='steps'>
		  <div class="grid-content bg-purple-light">
		  		<el-steps :space="70" direction="vertical" :active="1">
			  <el-step title="基本信息"></el-step>
			  <el-step title="学院专业"></el-step>
			  <el-step title="评奖评优"></el-step>
			  <el-step title="社团信息"></el-step>
			  <el-step title="日常生活"></el-step>
			  <el-step title="个人属性"></el-step>
				</el-steps>
		  </div>
	  </div>
	  <div class='item_left'>
	  		<div class="self_left">
			<div class="div1">
				<h4>基本信息</h4>
				<el-tag type="gray" v-for='item in basicInformation' :key='item' v-text='item'></el-tag>
			</div>
			<div class="div2">
				<h4>学院专业</h4>
				<el-tag type="gray" v-for='item in collegeInformation' :key='item' v-text='item'></el-tag>
			</div>			
			<div class="div3">
				<h4>xxxxxxx</h4>
			</div>
			</div>
	  </div>
	  <div class='photo'>
	  		<div class="self_mid">
	  		<img :src='personas_img' alt="">			
			<div class="line1"></div>
			<div class="line2"></div>
			<div class="line3"></div>			
			<div class="line4"></div>
			<div class="line5"></div>
			<div class="line6"></div>
			</div>
	  </div>
	  <div class='item_right'>
	  		<div class="self_right">
			<div class="div4">
				<h4>政治思想评价</h4>
				<span v-for='item in prizeInformantion.political'>
				 	<el-tooltip effect="dark" :content="item.get_time" placement='right'>
					<el-tag type="gray" v-text='item.i_name' :key='item'></el-tag>
					</el-tooltip>
				</span>
				<span v-if='!prizeInformantion.political.length' class='tooltip'>暂无奖项...</span>
			</div>
			<div class="div5">
				<h4>智能素质评价</h4>
				<span v-for='item in prizeInformantion.intelligence'>
				<el-tooltip effect="dark" :content="item.get_time" placement='right'>
					<el-tag type="gray" v-text='item.i_name' :key='item'></el-tag>
				</el-tooltip>
				</span>
				<span v-if='!prizeInformantion.intelligence.length' class='tooltip'>暂无奖项...</span>
			</div>
			<div class="div6">
				<h4>能力发展评价</h4>
				<span v-for='item in prizeInformantion.ability'>
				<el-tooltip effect="dark" :content="item.get_time" placement='right'>
					<el-tag type="gray" v-text='item.i_name' :key='item'></el-tag>
			    </el-tooltip>
				</span>
				<span v-if='!prizeInformantion.ability.length' class='tooltip'>暂无奖项...</span>
			</div>
			</div>
	  </div>
	</div>
</div>
</template>
<script>
  import Axios from "axios"
export default {
  name: 'stu',
    data() {
      return {
         activeIndex: '1',
         a:true,
         s_url:'http://222.27.161.5/nefu/Student/',
         basicInformation:{
         	s_name:'姓名',
         	s_num:'学号',
         	sex:'性别'
         },
         collegeInformation:{
         	grade:'年级',
         	college_name:'学院',
         	profession:'专业',
         	class:'班级',
         	'job':'暂无职务'
         },
         prizeInformantion:{
         	political:[],
         	intelligence:[],
         	ability:[]
         },
         personas_img:''
      };
    },
    mounted:function(){
    	if(!this.$cookie.get('s_id')){
    		this.$router.push('/');
    	}
    	//基本信息
    	Axios.get(this.s_url+'student_basic_information',{params:{
              s_id:this.$cookie.get('s_id')
            }})
            .then((res)=>{
            	this.basicInformation.s_name = res.data[0].s_name;
            	this.basicInformation.s_num = res.data[0].s_num;
            	this.basicInformation.sex = res.data[0].sex;
            	this.collegeInformation.grade = res.data[0].grade;
            	this.collegeInformation.college_name = res.data[0].name;
            	this.collegeInformation.job = res.data[0].is_monitor=='1'?'班长':'暂无职务';
            	this.personas_img = res.data[0].personas_img;
            	
            	//获取学院信息
            	Axios.get(this.s_url+'student_college_information',{params:{
              		class_id:res.data[0].class_id
            		}}).then((res)=>{
            			this.collegeInformation.profession = res.data[0].name;
            			this.collegeInformation.class = res.data[0].class_name;
            		});
         });
            //获取奖项信息
          Axios.get(this.s_url+'student_prize_information',{params:{
          	s_id:this.$cookie.get('s_id')
          }}).then((res)=>{
          	this.prizeInformantion = res.data;
          });

    	
    },
     methods: {
     	logout:function(){
     	this.$cookie.delete('s_id');
     	this.$router.push('/');
     },
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    }
}
</script>
<style>

	 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
<style scoped>
	.personas{
		margin-top: 50px;

	}
	.personas .content{
		width: 1106px;
		margin:50px auto;
	}
	.personas .content>div{
		float: left;
	}
	.content .steps{
		width: 150px;
	}
	.content .item_left,.content .item_right{
		width: 250px;
	}

	.header img{
		float: left;
	    width: 40px;
	    padding: 10px;
	}
	.title{
	  color: #ccc;
	  float: left;
	  font-size: 20px;
	  font-weight: normal;
	  line-height: 60px;
	  display: inline-block;
	  text-align: center;
	}
	.self_mid{
		width: 451px;
		height: 350px;
		position: relative;
	}
	.self_mid div{
		background: #ccc;
	}
	.self_mid img{
		width: 150px;
		height: 150px;
		position: absolute;
		left: 153px;
		top: 100px;
	}
	.self_mid .line1{
		width: 210px;
		height: 1px;
		position: absolute;
		left: -31px;
    	top: 75px;
		transform: rotate(45deg);
	}
	.self_mid .line2{
		width: 140px;
	    height: 1px;
	    position: absolute;
	    left: 0;
	    top: 174px;
	}
	.self_mid .line3{
		width: 210px;
	    height: 1px;
	    position: absolute;
	    left: -31px;
	    top: 274px;
		transform: rotate(135deg);
	}
	.self_mid .line4{
		width: 210px;
		height: 1px;
		position: absolute;
		left: 272px;
		top: 75px;
		transform: rotate(135deg);
	}
	.self_mid .line5{
		width: 150px;
		height: 1px;
		position: absolute;
		left: 310px;
		top: 174px;
	}
	.self_mid .line6{
		width: 210px;
		height: 1px;
		position: absolute;
		left: 272px;
		top: 274px;
		transform: rotate(45deg);
	}
	.self_left{
		float: right;
	}
	.self_left div{
		width:100%;
		height: 173px;
		border-top:1px solid #ccc;
		position: relative;
	}
	div>h4{
		position: absolute;
		top: -25px;
		font-size: 14px;
	}
	.self_right div{
		width: 100%;
		height: 173px;
		border-top:1px solid #ccc;
		position: relative;	
	}
	.self_right div>h4{
		position: absolute;
		right:0px;
		top: -25px;
	}
	.personas h4{
		color: #73c3ff;
		font-weight: 700;
	}
	.el-tag{
		margin: 3px;
	}
	.self_right .el-tag{
		float: right;
	}
	.self_right .tooltip{
		float: right;
		color:#94b2d2;
		font-size: 12px;
	}
	span.el-tag{
		cursor: pointer;
	}
</style>
