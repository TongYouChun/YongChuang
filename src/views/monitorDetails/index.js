// 监控详情视频 js
import play from './play/play.vue';
import history from './history/history.vue';
import {
	monitorVideo
} from '@/api/monitorApi.js'
export default {
	components: {
		play,
		history
	},
	data() {
		return {
			// 菜单 列表
			monitorData: [{
					name: '全部',
					switchType: true
				},
				{
					name: '工地大门',
					switchType: false
				},
				{
					name: '生活区',
					switchType: false
				},
				{
					name: '磅房',
					switchType: false
				},
				{
					name: '物业服务中心',
					switchType: false
				}
			],
			// 关闭回放视频
			closePlayback: false

		}
	},
	mounted() {
		this.detailsMonitorVideo();
		this.animation()
	},
	methods: {
		// 动画效果
		animation() {
			let monitorDetailsLeft = document.querySelector('.monitor_details_left');
			let monitorDetailsRight = document.querySelector('.monitor_details_right');
			// let monitorList = document.querySelector('.monitor_list');
			// monitorList.style.cssText = 'animation: monitorListRight 3s; opacity: 1;'
			monitorDetailsLeft.style.cssText = 'animation: monitorDetailsLeft 2s; opacity: 1;'
			monitorDetailsRight.style.cssText = 'animation: monitorDetailsRight 2s; opacity: 1;'
		},
		// 详情监控视频
		detailsMonitorVideo() { // 获取详情视频页面数据
			let dataId = {
				id: this.$route.params.id //详情接口视频Id
			}
			monitorVideo(dataId).then(ser => { //调用详情监控视频的接口
				console.log(ser)
			})
		},
		// 菜单选项
		menuClick(index) { // 菜单按钮功能
			this.monitorData.map(ser => ser.switchType = false);
			this.monitorData[index].switchType = true;
		},
		// 返回 运营监控
		clickReturn() {
			this.$router.push({ // 跳转到 运营监控页面
				path: '/operation'  //路由跳转
			})
		},
		// 历史回放监控视频
		clickPlayback() { // 打开历史回放监控视频弹框
			this.closePlayback = true;
		},
		// 关闭历史回放
		monitorPlayback(val) { // 子传父获取到的信息      关闭历史回放监控视频弹框
			if (val == 'close') {
				this.closePlayback = false;
			}
		}
	}
}
