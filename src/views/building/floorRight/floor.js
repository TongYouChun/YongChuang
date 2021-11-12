// 智慧楼宇 右 楼层 js
export default {
	data() {
		return {
			// 楼层
			floorData: [
				{
					floorName: '楼',
					type: true,
				},
				{
					floorName: 'F9',
					type: false,
				},
				{
					floorName: 'F8',
					type: false,
				},
				{
					floorName: 'F7',
					type: false,
				},
				{
					floorName: 'F6',
					type: false,
				},
				{
					floorName: 'F5',
					type: false,
				},
				{
					floorName: 'F4',
					type: false,
				},
				{
					floorName: 'F3',
					type: false,
				},
				{
					floorName: 'F2',
					type: false,
				},
				{
					floorName: 'F1',
					type: false,
				},
				{
					floorName: 'B1',
					type: false,
				},
				{
					floorName: 'B2',
					type: false,
				}
			]
		}
	},
	mounted() {
		this.effect(); // 加载模型完成调用 this.effect() 函数；
		// let floor = document.querySelector('.floor');

	},
	methods: {
		// 点击楼层
		clickFloor(index) {
			this.floorData.map(ser => ser.type = false)	// 没有点击触发 没有状态
			this.floorData[index].type = true	// 点击触发 新的状态
			this.$store.commit('floorModel', this.floorData[index].floorName)
		},
		// 动态特效
		effect() {
			let floor = document.querySelector('.floor');
			floor.style.cssText = "animation: floorBottom 4s; opacity: 1"
		}
	}
}
