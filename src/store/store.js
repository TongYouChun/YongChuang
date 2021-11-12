
import Vue from 'vue'
import Vuex from 'vuex'
// import {log} from 'util';
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
	  modeltype: null,	// 判断 模型是否加载完成
	  hideDecide: true, // 隐藏和显示模型
	  floor: null, // 切换楼层
	  reductionModel: null, // 页面跳转 模型还原初始状态
  },
  getters: {
  },
  mutations: {
	  // 加载模型是否完成
	  changeModel (state, payload) {
		  state.modeltype = payload
	  },
	  // 模型显示隐藏
	  displayModel (state, payload) {
		  state.hideDecide = payload
	  },
	  // 模型楼层
	  floorModel(state, payload) {
		state.floor = payload
	  },
	  // 跳转页面 模型还原成初始状态
	  reduction(state, payload) {
		  state.reductionModel = payload
	  }
  },
  actions: {
  }
})
