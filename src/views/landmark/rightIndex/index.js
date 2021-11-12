// 数字地标 右 统计图 js
import echarts from 'echarts';
export default {
	props: ['digitData', 'wordEffect'], // 父传子  digitData是数据， wordEffect是判断文字弹框是否加载完成
	data() {
		return {
			materialData: [{
				name: '预算量',
				type: true,
			}, {
				name: '消耗量',
				type: false,
			}],
			// 人员情况
			renyuanqingkuang: {},
			// 内部人员
			insideData: [],
			insideName: [],
			// 外部人员
			externalData: [],
			externalName: [],

			// 物资情况
			wuziqingkuang: {},
			// 物资全部数据
			wuziqingkuangData: [],
			// 预算量
			budgetData: [],
			// 消耗量
			consumeData: [],

			// 设备
			shebeiqingkuang: {},
			equipmentData: {}

		}
	},
	mounted() {

	},
	watch: {
		// 动画特效
		wordEffect(ser) {
			if (ser == 'written') { // 判断 公司文字介绍弹框是否加载完成；
				let personnel = document.querySelector('.personnel_li');
				let material = document.querySelector('.material_li');
				let equipment = document.querySelector('.equipment_li');
				// 动画效果
				personnel.style.cssText = "animation: myfirstRight 2s; opacity: 1;"
				material.style.cssText = "animation: myfirstRight 3s; opacity: 1;"
				equipment.style.cssText = "animation: myfirstRight 4s; opacity: 1;"
			}
		},
		digitData(val) { // 获取 人员饼图数据
			this.renyuanqingkuang = val.renyuanqingkuang;  // 获得 人员饼图数据
			let jsonData = JSON.parse(val.renyuanqingkuang.data.jsonData); // 将字符串 转换成 json
			// console.log(jsonData)
			this.insideData = jsonData.inside; // 内部人员信息
			this.insideData.map(ser => this.insideName.push(ser.name))
			this.externalData = jsonData.external; // 外部人员信息
			this.externalData.map(ser => this.externalName.push(ser.name))
			// 内部人员
			this.insideMain();
			// 外部人员
			this.externalMain();

			// 物资情况
			this.wuziqingkuang = val.wuziqingkuang;	// 获得 物资情况数据
			let wuziqingkuangData = this.wuziqingkuang.data // 物资统计图 信息
			this.budgetData.push(['product', '混粘土', '钢筋', '沥青'])
			this.consumeData.push(['product', '混粘土', '钢筋', '沥青'])
			wuziqingkuangData.map(ser => {
				this.budgetData.push([ser.name, ser.concreteBudget, ser.rebarBudget, ser.asphaltBudget])
				this.consumeData.push([
					ser.name,
					ser.concreteConsumption,
					ser.rebarConsumption,
					ser.asphaltConsumption
				])
			})
			this.wuziqingkuangData = this.budgetData
			// 物资情况
			this.materialMain();

			// 设备
			this.shebeiqingkuang = val.shebeiqingkuang;	// 获取 设备数据
			this.equipmentData = JSON.parse(this.shebeiqingkuang.data.jsonData); // 将字符串 转换成 json

		}
	},
	methods: {
		// 内部人员
		insideMain() {
			let insideChart = echarts.init(document.getElementById('inside'));
			let insideOption = {
				legend: {
					bottom: 0,
					icon: "circle",
					data: this.insideName,
					textStyle: { //图例文字的样式
						color: '#fff',
						fontSize: 8
					}
				},
				tooltip: {
					show: false,
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c}<br/>({d}%)",
					position: ['50%', '50%']
				},
				// grid: {
				// 	top: '30%',
				// 	containLabel: true
				// },
				title: {
					zlevel: 0,
					text: `内部人员`,
					left: '0',
					top: '0',
					textStyle: {
						color: '#fff',
						fontSize: 14,
						align: 'center'
					}
				},
				series: [{
					name: '项目合同额对比',
					type: 'pie',
					roseType: 'angle',
					radius: ['35%', '55%'],
					aavoidLabelOverlap: false,
					// silent:true,
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
							fontWeight: 'bold',
							formatter: "{b}\r\n\r\n{c}人",
						}
					},
					data: this.insideData,
				}],
				color: ['#0ce3f7', '#fd9d73', '#fefd05', '#4c9ffd'] // 颜色
			}
			insideChart.setOption(insideOption)
		},
		// 外部人员
		externalMain() {
			let externalChart = echarts.init(document.getElementById('external'));
			let externalOption = {
				legend: {
					bottom: 0,
					icon: "circle",
					data: this.externalName,
					textStyle: { //图例文字的样式
						color: '#fff',
						fontSize: 8
					}
				},
				tooltip: {
					show: false,
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c}<br/>({d}%)",
					position: ['50%', '50%']
				},
				title: {
					zlevel: 0,
					text: `外部人员`,
					left: '0',
					top: '0',
					textStyle: {
						color: '#fff',
						fontSize: 14,
						align: 'center'
					}
				},
				series: [{
					name: '项目合同额对比',
					type: 'pie',
					roseType: 'angle',
					radius: ['35%', '55%'],
					avoidLabelOverlap: false,
					hoveranination: false,
					// silent:true,
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
							fontWeight: 'bold',
							formatter: "{b}\r\n\r\n{c}人",
						}
					},
					data: this.externalData,
				}],
				color: ['#0ce3f7', '#fd9d73', '#fefd05', '#4c9ffd']
			}
			externalChart.setOption(externalOption)
		},
		// 物资情况
		materialMain() {
			let materialChart = echarts.init(document.getElementById('material'));
			let materialOption = {
				legend: {
					right: '0',
					data: ['混粘土', '钢筋', '沥青'],
					textStyle: { //图例文字的样式
						color: '#ccc',
						fontSize: 12
					}
				},
				tooltip: {},
				grid: {
					top: '18%',
					left: '3%',
					right: '4%',
					bottom: '5%',
					containLabel: true
				},
				dataset: {
					source: this.wuziqingkuangData
				},
				dataZoom: [{
					textStyle: false,
					show: true,
					realtime: true,
					start: 0,
					end: 50,
					bottom: 4,
					height: 24, //这里可以设置dataZoom的尺寸
				}, ],
				xAxis: {
					type: 'category',
					axisLine: {
						show: false, //不显示坐标轴轴线
					},
					axisLabel: {
						interval: 0,
						textStyle: {
							color: '#fff',
							fontSize: '12'
						},
					},
					axisTick: {
						show: false //不显示坐标轴刻度
					},

				},
				yAxis: {
					axisTick: { //y轴刻度线
						show: false
					},
					splitLine: { //网格线
						show: false
					},
					axisLine: {
						show: false, //不显示坐标轴轴线
					},
					axisTick: {
						show: false //不显示坐标轴刻度
					},
					axisLabel: {
						interval: 0,
						textStyle: {
							color: '#fff',
							fontSize: '12'
						},
					},
				},
				series: [{
						type: 'bar',
						barWidth: 20,
						itemStyle: {
							normal: {
								// barBorderRadius: [10, 10, 0, 0],
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[{
											offset: 0,
											color: 'rgb(109,205,230)'
										}, //柱图渐变色
										{
											offset: 1,
											color: 'rgb(56,160,214)'
										}, //柱图渐变色
									]
								)
							},
						},
						showBackground: true,
						backgroundStyle: {
							color: 'rgba(56,160,214, 0.4)'
						}
					}, {
						type: 'bar',
						barWidth: 20,
						itemStyle: {
							normal: {
								// barBorderRadius: [15, 15, 0, 0],
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[{
											offset: 0,
											color: 'rgb(29,67,243)'
										}, //柱图渐变色
										{
											offset: 1,
											color: 'rgb(67,102,243)'
										}, //柱图渐变色
									]
								)
							},
						},
						showBackground: true,
						backgroundStyle: {
							color: 'rgba(67,102,243, 0.4)'
						}
					},
					{
						type: 'bar',
						barWidth: 20,
						itemStyle: {
							normal: {
								// barBorderRadius: [15, 15, 0, 0],
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[{
											offset: 0,
											color: 'rgb(201,140,4)'
										}, //柱图渐变色
										{
											offset: 1,
											color: 'rgb(241,229,85)'
										}, //柱图渐变色
									]
								)
							},
						},
						showBackground: true,
						backgroundStyle: {
							color: 'rgba(201,140,4,0.4)'
						}
					}
				]
			};
			materialChart.setOption(materialOption)
		},
		// 点击物资菜单 （预算量 和 消耗量 切换）
		clickMaterial(index) {
			this.materialData.map(ser => ser.type = false)
			this.materialData[index].type = true; 	// 点击选中的菜单
			if (this.materialData[index].name == '预算量') {
				this.wuziqingkuangData = this.budgetData	// 预算量的数据
				// 物资情况
				this.materialMain();
			}
			if (this.materialData[index].name == '消耗量') {
				this.wuziqingkuangData = this.consumeData	// 消耗量的数据
				// 物资情况
				this.materialMain();
			}
		}

	}
}
