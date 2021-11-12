import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载

//首页 + 导航栏
const index = () => import('@/views/index/index.vue')
// 数字地标
const landmark = () => import('@/views/landmark/index.vue')
// 智慧楼宇
const building = () => import('@/views/building/index.vue')
// 铃声提醒
const remind = () => import('@/views/remind/index.vue')
// 运维监控
const operation = () => import('@/views/operation/index.vue')
// 应急指挥
const command = () => import('@/views/command/index.vue')
// 监控详情视频
const monitorDetails = () => import('@/views/monitorDetails/index.vue')


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/landmark' },
  { path: '/', 
	component: index ,
	children: [{
	    path: '/landmark',
	    name: '数字地标',
	    component: landmark,
	    meta: {
	        requireAuth: true
	    }
	},{
	    path: '/building',
	    name: '数字楼宇',
	    component: building,
	    meta: {
	        requireAuth: true
	    }
	},{
	    path: '/operation',
	    name: '运维监控',
	    component: operation,
	    meta: {
	        requireAuth: true
	    }
	},{
	    path: '/command',
	    name: '应急指挥',
	    component: command,
	    meta: {
	        requireAuth: true
	    }
	},{
	    path: '/monitorDetails/:id',
	    name: '监控详情视频',
	    component: monitorDetails,
	    meta: {
	        requireAuth: true
	    }
	},{
	    path: '/remind',
	    name: '铃声提醒',
	    component: remind,
	    meta: {
	        requireAuth: true
	    }
	}]
  },
  // { path: '/landmark', component: landmark },
	// { path: '/building', component: building},
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
