// 视频播放 js
export default {
	data() {
		return {
			layoutType: 0,
		}
	},
	methods: {
		// 视频 分屏
		layoutClick(type) { // 判断 视频分屏
			this.layoutType = type;
		}
	}
}
