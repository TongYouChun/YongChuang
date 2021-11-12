// 历史回放 js
export default {
	data() {
		return {
			value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],  // 选择的 开始和结束日期
		}
	},
	methods: {
		// 历史回放 监控视频 关闭
		clickClose() {
			this.$emit('monitorPlayback', 'close');	// 子传父, 发起关闭历史回放指令
		}
	}
}
