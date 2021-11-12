// 智慧楼宇 js
import leftBuiding from './left/leftBuiding.vue'
import rightBuiding from './right/rightBuiding.vue'
// 楼层
import floorRight from './floorRight/floor.vue'
// 功能栏
import operationLeft from './operationLeft/operation.vue'
export default {
	components: {
		leftBuiding,
		rightBuiding,
		floorRight,
		operationLeft
	},
	data() {
		return {
			hideDecide: true,
		}
	},
	methods: {
		// 开始操作 （隐藏加载模型）
		hideModel(value) {
			if (value == 'hide') {
				// this.$store.commit('displayModel', 'hide')  //隐藏模型
			} else {
				// this.$store.commit('displayModel', 'display') // 显示模型
			}
		}
	}
}
