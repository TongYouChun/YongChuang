// 数字地标 公司介绍 js
export default {
	props: ['loadtype'], // 子传父
	data() {
		return {
			str: '永昌集团有限公司成立某某年，发展XXXXXXX.',
			i: 0,
			cal: ''
		}
	},
	mounted() {},
	watch: {
		loadtype(ser) {
			if (ser == 'complete') { // 判断 模型是否加载完成；
				let typing = document.querySelector('.typing');
				typing.style.cssText = "animation: myfirstBottom 2s; z-index: 1;" // 2秒钟 公司文字介绍 弹窗弹出
				setTimeout(this.print, 2000); // 2秒钟显示 公司介绍文字；
			}
		}
	},
	methods: {
		// 显示文字
		print() {
			let typing = document.querySelector('.typing')
			if (typing) {
				if (this.i < this.str.length) {
					this.cal = this.str.substring(0, this.i++) + "_";
					typing.innerHTML = this.cal;
					setTimeout(this.print, 300); // 每 0.3秒显示一个文字。
				} else {
					typing.innerHTML = this.str; // 相当于清除下划线以及计时器效果
					setTimeout(this.virtualization, 1500); // 1.5秒触发 this.virtualization() 函数
				}
			}
		},
		// 文字虚化
		virtualization() {
			let typing = document.querySelector('.typing');
			typing.style.cssText = "animation: diaphaneity 2s; opacity: 0;" // 2秒让 公司文字介绍 弹窗 虚化掉 （移除）
			setTimeout(this.complete, 2000); // 2秒中 调用 this.complete() 函数
		},
		// 文字特效完成
		complete() {
			this.$emit("writtenWords", "written") // 子传父  文字特效加载完成。 （提示）
		}
	}
}
