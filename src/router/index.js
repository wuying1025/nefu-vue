import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

import Stu from '@/components/student/Student'
import Personas from '@/components/student/Personas'
import Input_item from '@/components/student/Input_item'
import Item_info from '@/components/student/Item_info'
import Class_info from '@/components/student/Class_info'
import Grade_man from '@/components/student/Grade_man'
import Grade_input from '@/components/student/Grade_input'
import Grade_see from '@/components/student/Grade_see'

import stu_center from '@/components/student/personal_center/stu_center'
import face from '@/components/student/personal_center/face'
import password from '@/components/student/personal_center/password'
import log from '@/components/student/personal_center/log'
import my_message from '@/components/student/personal_center/my_message'
import S_literature from '@/components/student/literature/S_literature'
import S_w_query from '@/components/student/literature/S_w_query'
import S_w_input from '@/components/student/literature/S_w_input'

import Admin from '@/components/admin/Admin'
import Student from '@/components/admin/Student'
import College from '@/components/admin/College'
import Item from '@/components/admin/item'
import College_admin from '@/components/admin/College_admin'
import Class from '@/components/admin/Class'
import Check from '@/components/admin/Check'
import Prize_info from '@/components/admin/prize_info'
import Admin_log from '@/components/admin/Admin_log'
import Stu_log from '@/components/admin/Stu_log'
import Get_prize from '@/components/admin/get_prize'
import Grade_check from '@/components/admin/Grade_check'

import a_center from '@/components/admin/personal_center/Admin_center'
import a_password from '@/components/admin/personal_center/password'
import Message from '@/components/admin/personal_center/Message'
import Message_back from '@/components/admin/personal_center/Message_back'
import Search from '../components/admin/search.vue'

Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/',
      component: Login
    },
    {
      path:"/student",
      redirect:'/student/personas'
    },
    {
      path: '/student',
      component: Stu,
      children:[
        {path:'/student/personas',component:Personas},
        {path:'/student/input_item',component:Input_item},
        {path:'/student/grade_man',component:Grade_man,
        redirect:'/student/grade_man/grade_input',
          children:[
            {path:'/student/grade_man',component:Grade_input},
            {path:'/student/grade_man/grade_input',component:Grade_input},
            {path:'/student/grade_man/grade_see',component:Grade_see}
          ]
      },
      {path:'/student/literature',component:S_literature,
      redirect:'/student/literature/S_w_query',
      children:[
        {path:'/student/literature/S_w_query',component:S_w_query},
        {path:'/student/literature/S_w_input',component:S_w_input}
      ]
    },            
        {path:'/student/class_info',component:Class_info},
        {path:'/student/stu_center',component:stu_center,
          children:[
           {path:'/student/stu_center',component:Item_info},
           {path:'/student/stu_center/item_info',component:Item_info},
           {path:'/student/stu_center/face',component:face},
           {path:'/student/stu_center/password',component:password},
           {path:'/student/stu_center/log',component:log},
           {path:'/student/stu_center/my_message',component:my_message}
          ]
      },
      ]
    },
    {
      path:'/admin',
      component:Admin,
      children:[
        {path:"/admin/college", component: College},
        {path:"/admin/class", component: Class},
        {path:"/admin/student", component: Student},
        {path:"/admin/college_admin", component:College_admin},
        {path:"/admin/item", component:Item},
        {path:"/admin/check", component:Check},
        {path:"/admin/grade_check",component:Grade_check},
        {path:"/admin/prize_info", component:Prize_info},
        {path:"/admin/admin_log", component:Admin_log},
        {path:"/admin/stu_log", component:Stu_log},
         {path:"/admin/get_prize", component:Get_prize},
        {path:"/admin/get_search", component:Search},
        {path:'/admin/admin_center',component:a_center,
          children:[
            {path:'/admin/admin_center',component:a_password},
            {path:'/admin/admin_center/message_back',component:Message_back},
            {path:"/admin/admin_center/message", component:Message},
            {path:'/admin/admin_center/password',component:a_password},

          ]
        },


      ]
    }

  ]
})
