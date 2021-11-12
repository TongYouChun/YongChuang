// 主页面 js
import landmark from "@/views/landmark/index.vue";
import model from "@/components/mapModel/mapModel.vue";
import {
	mapState
} from 'vuex'
export default {
	// 组件
	components: {
		landmark,
		model
	},
	data() {
		return {
			// 左 菜单
			menuData1: [{
				name: '数字地标',
				type: true,
				route: '/landmark', //路由
				id: 0
			}, {
				name: '智慧楼宇',
				type: false,
				route: '/building', //路由
				id: 2
			}],
			// 右 菜单
			menuData2: [{
				name: '运维监控',
				type: false,
				route: '/operation', //路由
				id: 3
			}, {
				name: '应急指挥',
				route: '/command', //路由
				type: false,
				id: 4
			}],

			// 当前日期和时间
			nowDate: "", // 当前日期
			openType: false,
			
			displayModel: true, // 模型显示


		}
	},
	mounted() {
		// 当前路由
		this.currentRoute();
		this.animation();
		this.currentTime();
	},
	computed: {
		...mapState({ //等价于上面的写法
			hideDecide: state => state.hideDecide
		})
	},
	watch: {
		hideDecide(vaue){
			if(vaue === 'hide'){
				this.displayModel = false
			};
			if(vaue === 'display'){
				this.displayModel = true
			}
		}
	},
	methods: {
		// 日期 时间 星期  刷新
		currentTime() {
			setInterval(this.formatDate, 500); // 每 0.5秒 刷新 获取时间 数据
		},
		// 日期 时间 星期
		formatDate() {
			let date = new Date();
			let year = date.getFullYear(); // 年
			let month = date.getMonth() + 1; // 月
			let day = date.getDate(); // 日
			let week = date.getDay(); // 星期
			let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
			let hour = date.getHours(); // 时
			hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
			let minute = date.getMinutes(); // 分
			minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
			let second = date.getSeconds(); // 秒
			second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
			this.nowDate = `${year}/${month}/${day} ${hour}:${minute}:${second} ${weekArr[week]}`;
		},
		// 动画效果
		animation() {
			let imgsSetting = document.querySelector('.imgs_setting'); // 边框
			let navigationMain = document.querySelector('.navigation_main'); // 文字
			let navigationUlMenuLeft = document.querySelector('.navigation_ul_menu_left'); // 左
			let navigationUlMenuRight = document.querySelector('.navigation_ul_menu_right'); // 右
			imgsSetting.style.cssText = 'animation: imgsSettingTop 1s; opacity: 1;'
			navigationMain.style.cssText = 'animation: imgsSettingTop 2s; opacity: 1;'
			navigationUlMenuLeft.style.cssText = 'animation: navigationBottom 3s; opacity: 1;'
			navigationUlMenuRight.style.cssText = 'animation: navigationBottom 3s; opacity: 1;'

			this.$refs.userName.style.cssText = 'animation: imgsSettingTop 3s; opacity: 1;' // 用户名称
			this.$refs.timeDate.style.cssText = 'animation: navigationBottom 3s; opacity: 1;' // 时间日期
		},
		// 当前路由
		currentRoute() { // 当前页面路由
			let path = this.$route.path //获取 当前路由 地址
			this.menuData1.map(ser => {
				if (ser.route == path) { //当前路由是否和该菜单路由相同, 如果相同就 ser.type = true  (改变菜单样式)
					ser.type = true
					this.displayModel = true
				} else {
					ser.type = false
				}
			})
			this.menuData2.map(ser => {
				if (ser.route == path) { //当前路由是否和该菜单路由相同, 如果相同就 ser.type = true  (改变菜单样式)
					ser.type = true
					this.displayModel = false
				} else {
					ser.type = false
				}
			})
		},
		// 左菜单
		clickLeftMenu(index) { // 左菜单栏 按钮
			// console.log(index)
			this.menuData1.map(ser => ser.type = false)
			this.menuData2.map(ser => ser.type = false)
			this.menuData1[index].type = true //(改变菜单样式)
			if(this.menuData1[index].name === '数字地标'){
				this.$store.commit('reduction', '数字地标')
			}
			if(this.menuData1[index].name === '智慧楼宇'){
				this.$store.commit('reduction', '智慧楼宇')
			}
			this.displayModel = true
		},
		// 右菜单
		clickRightMenu(index) { // 右菜单栏 按钮
			this.menuData1.map(ser => ser.type = false)
			this.menuData2.map(ser => ser.type = false)
			this.menuData2[index].type = true //(改变菜单样式)
			this.displayModel = false
		},
		// 告警
		clickRemind() { // 告警跳转
			this.menuData1.map(ser => ser.type = false)
			this.menuData2.map(ser => ser.type = false)
			this.$router.push({
				path: '/remind'
			}) // 告警 路由 跳转
		},
		// 模型加载完成
		loadingModel(vaue) {
			this.$store.commit('changeModel', vaue)
			this.openType = true;
			// this.modeltype = vaue;
		}
	},
	// 销毁定时器
	beforeDestroy() { // 当页面关闭 自动 销毁 定时器
		if (this.formatDate) {
			clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
		}
	}
}
