// 项目监控视频列表 js
import {
	companyUserList,
	meeting
} from '@/api/commandApi.js'
export default {
	props: ['cameraList'], // 父传子  cameraList 监控视频列表数据
	data() {
		return {
			loading: true,
			loadings: true,
			// 菜单
			videoMenuData: [{
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
			// 打开弹窗
			decideLaunch: false,
			// 人员 数据
			filterText: '',
			// 公司人员数据
			personnelData: [],
			// 参加人员名单
			partakePeople: [],
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			// 列表数据
			controlList: [],
			// 发起会议信息
			conferenceData: {}
		}
	},
	watch: {
		// 查询人员名称
		filterText(val) {
			this.$refs.tree.filter(val);	// 人员名称 搜索
		},
		// 列表数据
		cameraList(val) { // 父传子参数。
			this.loading = true;
			if (val) {
				this.controlList = val; // 监控视频列表数据
				this.loading = false;
			}
		}
	},
	mounted() {
		this.personnelList()
	},
	methods: {
		// 动画框
		animationFrame() {
			let springFrame = document.querySelector('.spring_frame');
			springFrame.style.cssText = 'animation: springFrameRight 1s; opacity: 1;'
		},
		// 人员 过滤事件
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		// 菜单
		menuClick(index) { //菜单点击按钮功能
			this.videoMenuData.map(ser => ser.switchType = false)
			this.videoMenuData[index].switchType = true
		},
		// 进入 视频详情
		videoClick(id) { // 从 监控视频列表 进入 监控详情视频页面
			this.$router.push({
				path: `/monitorDetails/${id}` //路由 传参 带 监控视频 Id
			})
		},
		// 人员列表
		personnelList() { //获取 该用户权限下， 公司人员列表
			this.loadings = true;
			companyUserList().then(ser => { //获取公司人员的接口
				if (ser.code == 200) {
					this.loadings = false;
					this.personnelData = ser.data; //将公司人员数据赋值给 this.personnelData
				}
			})
		},
		
		// 添加 人员参与会议
		clickObtain(data, vale) { // 将勾选的数据存入列表中
			let videoData = this.$refs.tree.getCheckedNodes(); // ref="tree"  获取所有勾选信息。
			let partakePeople = []; // 创建一个空的数组
			videoData.map(ser => { // 遍历勾选信息。
				if (!ser.node) {
					partakePeople.push(ser.label) // 遍历出来 需要的数据(名称) 存入创建的新数组里面去 
				}
			})
			this.partakePeople = partakePeople; // 遍历出来的新数组赋值给 this.partakePeople
		},
		// 点击发起 视频会议
		clickLaunch() { //将勾选的数据id和发起发起会议名称,发送给接口
			let videoData = this.$refs.tree.getCheckedNodes(); // ref="tree"  获取所有勾选信息。
			let peopleId = []; // 创建一个空的数组
			videoData.map(ser => { // 遍历勾选信息。
				if (!ser.node) {
					peopleId.push(ser.id) // 遍历出来 的人员Id 存入新的数组里面
				}
			})
			if (peopleId.length !== 0) { // 判断新创建的数组是不是空。
				if (this.conferenceData.theme) {
					this.conferenceData.personnelIds = `${peopleId}`

					meeting(this.conferenceData).then(ser => { // 发起视频会议接口
						if (ser.code == 200) {
							this.decideLaunch = false;
							window.location.href = ser.data; // 将获取的接口地址, 路由跳转到(外部)视频会议界面
							this.$message.success('成功发起会议')
						} else {
							this.$message.error(`${ser.msg}`) // 发起会议失败的提示信息
						}
					})
				} else {
					this.$message.error('请输入会议名称 ！') // 没有填写视频会议名称的提示信息
				}
			} else {
				this.$message.error('请选择添加人员 ！') // 没有添加公司人员的提示信息
			}
		},
		// 打开 指挥 视频会议
		clickCommand() {
			this.personnelList();
			this.decideLaunch = true; // 打开视频会议
			this.animationFrame();
		},
		// 关闭指挥 视频会议
		clickClose() {
			this.decideLaunch = false; // 关闭视频会议
			this.conferenceData = {};
			this.partakePeople = [];
			this.personnelData = [];
		},

	}
}
