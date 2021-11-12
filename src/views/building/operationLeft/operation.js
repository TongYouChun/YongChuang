// 智慧楼宇 左 操作功能栏 js
import echarts from 'echarts'
export default {
	data() {
		return {
			value: 0.3,
			// 操作功能
			handleData: [{
					initialImgs: require('../../../../public/imges/building/ico/lou.png'),
					type: false,
					name: '楼控',
					Imgs: require('../../../../public/imges/building/ico/lou2.png')
				},
				{
					initialImgs: require('../../../../public/imges/building/ico/anfang.png'),
					type: false,
					name: '安防',
					Imgs: require('../../../../public/imges/building/ico/anfang2.png')
				},
				{
					initialImgs: require('../../../../public/imges/building/ico/xiao2.png'),
					type: false,
					name: '消防',
					Imgs: require('../../../../public/imges/building/ico/xiao.png')
				},
				{
					initialImgs: require('../../../../public/imges/building/ico/haoneng.png'),
					type: false,
					name: '能耗',
					Imgs: require('../../../../public/imges/building/ico/haoneng2.png')
				},
				{
					initialImgs: require('../../../../public/imges/building/ico/men.png'),
					type: false,
					name: '门禁',
					Imgs: require('../../../../public/imges/building/ico/men2.png')
				},
				{
					initialImgs: require('../../../../public/imges/building/ico/ting.png'),
					type: false,
					name: '车位',
					Imgs: require('../../../../public/imges/building/ico/ting2.png')
				},
			],

			// 判断模型
			judgeType: '',

			// 子类系统 类型
			subclassData: [{
					name: '新风',
					type: true
				},
				{
					name: '冷热源',
					type: false
				},
				{
					name: '空调',
					type: false
				},
				{
					name: '交配电',
					type: false
				}
			],
			// 资料
			meansData: [],
			// 新风
			drawingData: [{
					name: '系统平面图',
					type: false
				},
				{
					name: '系统结构图',
					type: true
				}
			],

			// 热能源
			heatData: [{
					name: '冷源',
					type: true
				},
				{
					name: '热源',
					type: false
				}
			],
			// 列表
			listData: [],
			// 新风 列表
			freshAir: [{
					model: '新风系统',
					code: 'Pcmciaer',
					state: 1,
					system: '新风'
				},
				{
					model: '新风系统',
					code: 'Pcmciaer',
					state: 2,
					system: '新风'
				},
				{
					model: '新风系统',
					code: 'Pcmciaer',
					state: 3,
					system: '新风'
				}
			],
			// 冷热 列表
			coldDtat: [{
					model: '冷热系统',
					code: 'Pcmciaer',
					state: 1,
					system: '冷热'
				},
				{
					model: '冷热系统',
					code: 'Pcmciaer',
					state: 2,
					system: '冷热'
				},
				{
					model: '冷热系统',
					code: 'Pcmciaer',
					state: 3,
					system: '冷热'
				}
			],
			// 是否操作
			operate: false,
			// 显示隐藏
			showHide: false,
			// 开关 
			switchs: false,
			// 全控
			control: false,
			// 图纸
			attribute: false,
		}
	},
	mounted() {
		this.effect();
		this.meansData = this.drawingData;
		this.listData = this.freshAir;
	},
	methods: {
		// 所有 Echart
		wholeEchart() { // 加载 Echart 图
			this.pieChart('expend', this.value)
			this.curveEchart('broken')
			this.curveEchart('broken2');
			this.policeEchart('police_echart')
		},
		// 水滴
		pieChart(id, value) {
			let ballChart = echarts.init(document.getElementById(id));
			let ballOption = {
				series: [{
					name: '水球图',
					type: 'liquidFill',
					radius: '80%',
					center: ['50%', '50%'],
					waveAnimation: 10, // 动画时长
					amplitude: 5, // 振幅
					data: [{
							value: value,
							direction: "left",
							itemStyle: {
								normal: {
									//这里就是根据不同的值显示不同球体的颜色
									color: eval(
										"if(value<0.4){'rgba(39, 227, 223, .7)'}else if(value<0.7){'rgba(250, 173, 20, 0.7)'}else{'rgba(248, 9, 65, 0.7)'}"
									),
								},
							},
						},

					],
					label: {
						normal: {
							color: eval(
								"if(value<0.4){'rgba(39, 227, 223, 1)'}else if(value<0.7){'rgba(250, 173, 20, 1)'}else{'rgba(248, 9, 65, 1)'}"
							),
							textStyle: {
								fontSize: 14,
								fontWeight: 500
							}
						}
					},
					outline: {
						show: true,
						borderDistance: 2,
						itemStyle: {
							borderColor: eval(
								"if(value<0.4){'rgba(0, 159, 232, 04)'}else if(value<0.7){'rgba(250, 173, 20, 0.4)'}else{'rgba(248, 9, 65, 0.4)'}"
							),
							borderWidth: 1
						}
					},
					backgroundStyle: {
						// shadowColor: 'rgba(0, 0, 0, 0.4)',
						color: 'rgba(3, 60, 105, 0.3)'
					}
				}]
			}
			ballChart.setOption(ballOption)
			window.addEventListener("resize", function() {
				ballChart.resize();
			});
		},
		//曲线图
		curveEchart(id) {
			let curveChart = echarts.init(document.getElementById(id));
			let curveOption = {
				grid: {
					left: 10,
					top: 10,
					bottom: 10,
					right: 10,
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						},
					},
					formatter: function(prams) {
						// console.log(prams)
						return prams[0].name + " 能耗：" + prams[0].data
					}
				},
				xAxis: {
					data: ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00",
						"11:00", "12:00"
					],
					boundaryGap: false,
					axisLine: {
						show: false,
					},

					axisLabel: {

						textStyle: {
							color: '#fff'
						}
					},
					axisTick: {
						show: false
					}
				},
				yAxis: {
					ayisLine: {
						"show": false
					},
					axisLabel: {
						color: '#fff',
						// formatter: '{value} %'
					},
					"axisTick": { //y轴刻度线
						"show": false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#012780'
						}
					},
					axisLine: {
						show: false,
						lineStyle: {
							color: '#384157'
						}
					}
				},

				series: [{
					// name: '建课',
					type: 'line',
					// stack: '总量',
					smooth: true,
					data: [22, 16, 27, 30, 40, 32, 40, 32, 29, 40, 32, 20],
					itemStyle: {
						normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0.1,
								color: 'rgba(171,56,134,0.3)' // 100% 处的颜色
							}, {
								offset: 1,
								color: 'rgba(255,255,255,0)' // 100% 处的颜色
							}]), //背景渐变色
							lineStyle: { // 系列级个性化折线样式
								width: 2,
								type: 'solid',
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#5646e7' // 0% 处的颜色
								}, {
									offset: 0.2,
									color: '#fd2d2b' // 100% 处的颜色
								}, {
									offset: 1,
									color: ' rgba(255,255,255,0) ' // 100% 处的颜色
								}])
							}
						},
						emphasis: {
							color: '#fd2d2b',
							lineStyle: { // 系列级个性化折线样式
								width: 1,
								type: 'dotted',
								color: "#fd2d2b" //折线的颜色
							}
						}
					}, //线条样式

					symbolSize: 2, //折线点的大小
					// symbol: 'image://../imgs/feijixia.png',
					areaStyle: {
						normal: {}
					},

				}]
			};
			curveChart.setOption(curveOption)
			window.addEventListener("resize", function() {
				curveChart.resize();
			});
		},
		// 告警 饼图
		policeEchart(id) {
			let policeChart = echarts.init(document.getElementById(id));
			let policeOption = {
				legend: {
					orient: 'vertical',
					right: 0,
					bottom: 0,
					icon: "circle",
					textStyle: { //图例文字的样式
						color: '#fff',
						fontSize: 10,
					}
				},
				series: [{
					name: '耗能',
					type: 'pie', // 设置图表类型为饼图
					// roseType: 'angle',
					radius: ['45%', '60%'],
					center: ['20%', '50%'],
					label: {
						show: false,
						position: 'center'
					},
					labelLine: {
						show: false
					},
					emphasis: {
						label: {
							show: true,
							fontSize: 12,
							// color: '#02feff',
							formatter: "{c}%",
						}
					},
					data: [ // 数据数组，name 为数据项名称，value 为数据项值
						{
							value: 40,
							name: '解决'
						},
						{
							value: 20,
							name: '正常'
						},
						{
							value: 20,
							name: '异常'
						},
						{
							value: 20,
							name: '告警'
						}
					]
				}],
				color: ['#63e6f8', '#5fafd4', '#fffe7f', '#f9699e']
			};
			policeChart.setOption(policeOption)
			window.addEventListener("resize", function() {
				policeChart.resize();
			});
		},
		// 操作功能
		clickOperation(index) {
			this.handleData.map(ser => ser.type = false)
			this.handleData[index].type = true
			this.$emit('hideModel', 'hide') // 子传父   隐藏模型 信息；
			this.operate = true
			this.showHide = true
			if (this.handleData[index].name == '楼控') {
				this.judgeType = '1'
			}
			if (this.handleData[index].name == '安防') {
				this.judgeType = '2'
			}
			if (this.handleData[index].name == '消防') {
				this.judgeType = '3'
			}
			if (this.handleData[index].name == '能耗') {
				this.judgeType = '4'
				this.showHide = false;
				setTimeout(this.wholeEchart, 500);

			}
			if (this.handleData[index].name == '门禁') {
				this.judgeType = '5'
			}
			if (this.handleData[index].name == '车位') {
				this.judgeType = '6'
			}
			// this.control = true,
			// this.attribute = true
		},
		// 特效
		effect() {
			let operation = document.querySelector('.operation');
			operation.style.cssText = "animation: operationLeft 2s; opacity: 1"
		},
		// 开关按钮
		clickSwitch() {
			if (this.switchs) {
				this.switchs = false
				this.showHide = true
				return
			} else {
				this.switchs = true
				this.showHide = false
			}
		},
		// 子系统功能
		clickSystem(index) {
			this.subclassData.map(ser => ser.type = false)
			this.subclassData[index].type = true
			if (this.subclassData[index].name == '冷热源') {
				this.meansData = this.heatData
				this.listData = this.coldDtat
			}
			if (this.subclassData[index].name == '新风') {
				this.meansData = this.drawingData
				this.listData = this.freshAir
			}
		},
		// 资料
		clickMaterial(index) {
			this.meansData.map(ser => ser.type = false)
			this.meansData[index].type = true
		},
		// 全控
		clickControl() {
			this.control = false
		},
		//控制
		clickAttribute() {
			this.attribute = false
		},
		// 点击选择
		clickChoice(index, system) {
			if (system == '新风') {
				this.attribute = true
			}
			if (system == '冷热') {
				this.control = true
			}

		},
		// 返回
		clickReturn() {
			// 是否操作
			this.operate = false;
			// 显示隐藏
			this.showHide = false;
			// 开关 
			this.switchs = false;
			// 全控
			this.control = false;
			// 图纸
			this.attribute = false;
			this.judgeType = '';
			this.handleData.map(ser => ser.type = false)
			this.$emit('hideModel', '') // 子传父 显示模型
		}
	}
}
