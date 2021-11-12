// 报警页面 左 统计图 js
export default {
	data() {
		return {
			// 弹框判断
			elasticType: false,
			// 弹框详情
			seeType: false,
		}
	},
	mounted() {
		this.animation()
	},
	methods: {
		// 动画效果
		animation() {
			let urgent = document.querySelector('.chart_li_urgent');
			let lighting = document.querySelector('.chart_li_lighting');
			urgent.style.cssText = 'animation: policeLeft 2s; opacity: 1;'
			lighting.style.cssText = 'animation: policeLeft 4s; opacity: 1;'
		},
		// 告警内容
		clickList() {
			this.elasticType = true;
		},
		// 告警详情
		clickDetails() {
			this.seeType = true;
		},
		// 点击返回
		clickReturn() {
			this.seeType = false;
		},
		// 点击取消
		clickCancel() {
			this.elasticType = false;
			this.seeType = false;
		}
	}
}
