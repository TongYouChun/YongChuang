// 应急指挥 js
import mapPenetration from '@/components/map/index.vue'
import {
	companyUserList,
	meeting,
	companyList
} from '@/api/commandApi.js'
import {
	monitorList,
	updateInfo
} from '@/api/monitorApi.js'
export default {
	components: {
		mapPenetration
	},
	data() {
		return {
			// 数据加载
			loading: true,
			// 人员数据加载
			loadings: true,
			// 全部工程
			menusData: [],
			// 公司工程
			companyData: [],
			// 人员 数据
			filterText: '',
			// 打开弹窗
			decideLaunch: false,
			// 公司人员数据
			personnelData: [],
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			// 参加人员选项
			partakePeople: [],
			// 发起会议信息
			conferenceData: {}
		}
	},
	watch: {
		// 公司人员搜索
		filterText(val) {
			this.$refs.tree.filter(val); // 公司人员搜索查询
		}
	},
	mounted() {
		this.personnelList();
		this.menuList();
		this.companyProjectList();
		this.animation()
	},
	methods: {
		// 动画效果
		animation() {
			let commandLeft = document.querySelector('.command_left');	// DOM 
			let commandRight = document.querySelector('.command_right');	// DOM 
			 commandLeft.style.cssText = "animation: commandLeft 2s; opacity: 1;"
			 commandRight.style.cssText = "animation: commandRight 2s; opacity: 1;"
		},
		// 弹框 特效
		animationFrame() {
			let springFrame = document.querySelector('.spring_frame');
			springFrame.style.cssText = "animation: springFrameRight 1s; opacity: 1;"
		},
		//左 工程菜单
		menuList() {
			this.loading = true; // 数据加载
			monitorList().then(ser => { // 加载左 工程菜单接口
				if (ser.code == 200) {
					let menusData = ser.data; // 获取工程菜单的数据
					menusData.map(ser => { // 遍历添加 menusWitch 属性，做菜单打开和关闭的功能
						ser.menusWitch = false;
					})
					this.menusData = menusData; //将工程菜单数据赋值给 this.menusData;
					this.loading = false;
				}
			})
		},

		// 左 公司工程菜单
		companyProjectList() {
			this.loading = true; // 数据加载
			companyList().then(ser => { // 加载左 公司工程菜单接口
				if (ser.code == 200) {
					let companyData = ser.data; // 获取公司工程菜单的数据
					companyData.map(ser => {
						ser.menusWitch = false; // 遍历添加 menusWitch 属性，做菜单打开和关闭的功能
					})
					this.companyData = companyData; // 公司工程数据赋值给 this.companyData
					this.loading = false;
				}
			})
		},

		// 人员列表
		personnelList() { // 获取人员列表数据
			this.loadings = true;
			companyUserList().then(ser => { // 加载公司人员数据接口
				if (ser.code == 200) {
					this.loadings = false;
					this.personnelData = ser.data // 公司人员数据
				}
			})
		},

		// 查询人员
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},

		// 菜单列表 功能
		menuClick(index, data = 0) {
			if (data == 0) { // 判断 data 是否 传值;
				if (this.menusData[index].menusWitch) {
					return this.menusData[index].menusWitch = false; // 工程菜单关闭
				} else {
					this.menusData[index].menusWitch = true; // 工程菜单打开
				}
			} else {
				if (this.companyData[index].menusWitch) {
					return this.companyData[index].menusWitch = false; //公司菜单工程关闭
				} else {
					this.companyData[index].menusWitch = true; //公司菜单工程打开
				}
			}

		},

		// 添加和移除 工程
		enshrineClick(item) { // 将普通项目添加到重点项目中去，或者把重点项目添加到普通项目中去。
			if (item.type === 0) {
				item.type = 1;
				updateInfo(item).then(ser => { //修改工程项目接口
					if (ser.code == 200) {
						this.$message.success('已添加到重点项目中')
						this.menuList(); // 重新 更新左菜单列表数据
					}
				})
				return
			}
			if (item.type === 1) {
				item.type = 0;
				updateInfo(item).then(ser => { //修改工程项目接口
					if (ser.code == 200) {
						this.$message.success('已添加到普通项目中')
						this.menuList(); // 重新 更新左菜单列表数据
					}
				})
			}
		},
		

		// 点击打开 项目 指控 视频会议
		chargeClick() {
			this.personnelList();
			this.decideLaunch = true; // 打开会议
			this.animationFrame();
		},

		// 关闭指挥 视频会议
		clickClose() {
			this.decideLaunch = false; //关闭会议
			this.conferenceData = {};
			this.partakePeople = [];
			this.personnelData = [];
		},

		// 点击发起 视频会议
		clickLaunch() {
			let videoData = this.$refs.tree.getCheckedNodes(); // ref="tree"  获取全部勾选的数据；
			let peopleId = []; // 创建新的数组；
			videoData.map(ser => { //	遍历勾选的数据；
				if (!ser.node) {
					peopleId.push(ser.id) // 获取遍历的人员Id,保存到新的数组；
				}
			})
			if (peopleId.length !== 0) {
				if (this.conferenceData.theme) {
					this.conferenceData.personnelIds = `${peopleId}`
					meeting(this.conferenceData).then(ser => { // 发起视频会议接口
						if (ser.code == 200) {
							this.decideLaunch = false;
							window.location.href = ser.data; // 视频会议接口数据 （跳转到外部视频会议）
							this.$message.success('成功发起会议')
						} else {
							this.$message.error(`${ser.msg}`) // 视频会议发起失败, 提示信息
						}
					})
				} else {
					this.$message.error('请输入会议名称 ！') // 没有写会议名称, 提示
				}
			} else {
				this.$message.error('请选择添加人员 ！') // 没有添加公司人员, 提示
			}
		},

		// 添加 人员参与会议
		clickObtain(data, vale) {
			let videoData = this.$refs.tree.getCheckedNodes(); // ref="tree"  获取全部勾选的数据；
			let partakePeople = []; // 创建新的数组；

			videoData.map(ser => { // 遍历勾选的数据
				if (!ser.node) {
					partakePeople.push(ser.label) // 把遍历出来的勾选的名称存放到新的数组里面；
				}
			})
			this.partakePeople = partakePeople; // 将遍历出来的新的数组 赋值到 this.partakePeople；
		}
	}
}
