import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import details from '@/pages/details/details'
import login from '@/pages/login/login'
import information from '@/pages/information/information'
import apply from '@/pages/apply/apply'
import loan from '@/pages/loanListRecommendation/loanListRecommendation'
import query from '@/pages/query/query'
import InquireDetails from '@/pages/InquireDetails/InquireDetails'
import aboutus from '@/pages/more/AboutUs'
import myinformation from '@/pages/more/myInformation'
import comment from '@/pages/comment/comment'
import commentList from '@/pages/commentList/commentList'
Vue.use(Router)

  const routes = [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: { keepAlive: true }
        
      },{
        path: '/details',
        name: 'details',
        component: details,
      },{
        path: '/login',
        name: 'login',
        component: login
      },{
        path: '/information',
        name: 'information',
        component: information
      },
      {
        path: '/apply',
        name: 'apply',
        component: apply
      },{
        path: '/loan',
        name: 'loan',
        component: loan,
        meta: { keepAlive: true }
      },
      {
        path: '/query',
        name: 'query',
        component: query
      },
      {
        path: '/InquireDetails',
        name: 'InquireDetails',
        component: InquireDetails
      },
      {
        path: '/aboutus',
        name: 'aboutus',
        component: aboutus,
        meta: { keepAlive: true }
      },
      {
        path: '/myinformation',
        name: 'myinformation',
        component: myinformation
      },
      {
        path: '/comment',
        name: 'comment',
        component: comment
      },
      {
        path: '/commentList',
        name: 'commentList',
        component: commentList
      }
  ]

  const router = new Router({
      routes
  })
  router.beforeEach((to, from, next) => {
        if(to.path == '/details') {
            if(localStorage.lastId) {

            }else {
              return next({path:'/login'})
            }
        }
        if(to.path == '/details') {
            if(localStorage.userName) {    //到时候寸apply
          
            }else {
                return next({path:'/apply?pages=details'})
            }
        }
        if(to.path == '/information') {
            if(localStorage.lastId) {
                console.log(to)
            }else {
                return next({path:'/login'})
            }
        }

        if(to.path == '/information') {
            if(localStorage.userName) {

            }else {
                return next({path:'/apply?pages=information'})
            }
        }

      next()
  })

  export default router