// 运维监控 js
import monitor from './video/video.vue';
import mapPenetration from '@/components/map/index.vue'
import {
	monitorList,
	monitorPageInfo,
	updateInfo
} from '@/api/monitorApi.js'
export default {
	components: {
		monitor,
		mapPenetration
	},
	data() {
		return {
			decideType: false,
			loading: true,
			menusData: [],
			cameraList: []
		}
	},
	mounted() {
		this.leftList();
		this.animation();
	},
	methods: {
		// 动画效果
		animation() {
			let operationLeft = document.querySelector('.operation_left');
			let operationRight = document.querySelector('.operation_right');
			 operationLeft.style.cssText = "animation: monitorLeft 2s; opacity: 1;"
			 operationRight.style.cssText = "animation: monitorRight 2s; opacity: 1;"
		},
		// 左侧列表栏
		leftList() {
			monitorList().then(ser => { // 获取 左侧列表数据接口
				if (ser.code == 200) {
					let menusData = ser.data;	//获取接口数据
					menusData.map(ser => {	// 遍历 接口数据;
						ser.menusWitch = false;	//遍历出来的数据添加 ser.menusWitch = false
					})
					this.menusData = menusData;	// 将 menusData 赋值给 this.menusData
					this.loading = false;
				}
			})
		},
		// 菜单列表 判断 打开关闭
		menuClick(index) {
			if (this.menusData[index].menusWitch) {  // 判断 菜单是否 打开
				return this.menusData[index].menusWitch = false;  // 菜单 关闭
			} else {
				this.menusData[index].menusWitch = true	// 菜单 打开
			}
		},
		// 添加和移除 工程
		enshrineClick(item) { // 将普通项目添加到重点项目中去，或者把重点项目添加到普通项目中去。
			if (item.type === 0) {
				item.type = 1;
				updateInfo(item).then(ser => { //修改工程项目接口
					if (ser.code == 200) {
						this.$message.success('已添加到重点项目中')
						this.leftList() // 重新 更新左菜单列表数据
					}
				})
				return
			}
			if (item.type === 1) {
				item.type = 0;
				updateInfo(item).then(ser => { //修改工程项目接口
					if (ser.code == 200) {
						this.$message.success('已添加到普通项目中')
						this.leftList() // 重新 更新左菜单列表数据
					}
				})
			}
		},
		// 返回
		clickReturn() {
			this.decideType = false;	// 返回到地图
		},
		// 应急指挥 
		clickCommand() {
			this.$router.push({
				path: '/command'	//路由跳转到 应急指挥页面
			})
		},
		// 点击 子菜单 
		chargeClick(id) { //点击菜单,获取工程项目 id 跳转到工程项目监控视频列表。
			let data = {
				companyId: id	// 获取选中的id
			}
			this.decideType = true;

			monitorPageInfo(data).then(ser => { //获取视频列表的接口。
				this.cameraList = ser.data	// 将视频列表数据 赋值给 this.cameraList
			})
		}
	}
}
