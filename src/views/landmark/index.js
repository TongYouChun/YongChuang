// 数字地标 js
import leftIndex from './leftIndex/index.vue'
import rightIndex from './rightIndex/index.vue'
import {
	landmark
} from '@/api/landmarkApi.js'
import typing from './typing/typing.vue'
export default {
	// 组件
	components: {
		leftIndex,
		rightIndex,
		typing
	},
	data() {
		return {
			digitData: {},
			// 加载完成模型
			loadtype: '',
			// 文字特效完成
			wordEffect: '',

		}
	},
	mounted() {
		// 地标数据
		this.landmarkData();
		this.animation()
	},
	methods: {
		// 动画效果
		animation() {
			this.loadtype = 'complete';
			let writingRight = document.querySelector('.writing_right'); // DOM .writing_right
			let indexLeft = document.querySelector('.index_left'); // DOM .index_left
			let indexRight = document.querySelector('.index_right'); //DOM .index_right
			indexLeft.style.cssText = "z-index: 1;"
			indexRight.style.cssText = "z-index: 1;"
			writingRight.style.cssText = "z-index: 1;"
		},
		// 数字地标数据
		landmarkData() { // 获取数字地标页面 所有数据
			landmark().then(ser => { //数字地标全部数据接口
				if (ser.code == 200) {
					this.digitData = ser.data;
					
				}
			})
		},
		// 文字效果
		writtenWords(ser) { // 加载公司介绍弹窗效果；
			this.wordEffect = ser // 公司文字介绍 弹窗加载完成 指令；
			let writingRight = document.querySelector('.writing_right');
			writingRight.style.cssText = "display: none;"
		}
	}
}
