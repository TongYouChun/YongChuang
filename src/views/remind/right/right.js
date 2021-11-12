// 报警页面 右 统计图 js
import echarts from 'echarts'
import 'echarts-liquidfill'
export default {
	data() {
		return {
			// 供电 
			electricData: {
				floor: ['一层', '二层', '三层', '四层', '五层', '六层', '七层'],
				data: [{
						name: '上月供电统计',
						consume: [60, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '本月供电统计',
						consume: [120, 142, 106, 114, 190, 130, 220]
					}
				]
			},
			// 供电 水滴图
			electricDrop: {
				empty: '0.2',
				lighting: '0.6',
				equipment: '0.2',
			},
			// 供水
			waterData: {
				floor: ['一层', '二层', '三层', '四层', '五层', '六层', '七层'],
				data: [{
						name: '上月供水统计',
						consume: [60, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '本月供水统计',
						consume: [120, 142, 106, 114, 190, 130, 220]
					}
				]
			}
		}
	},
	mounted() {
		// 曲线图
		this.electricCurveEchart('electric_curve', this.electricData)
		// 供电水滴图
		this.electricDropEchart('waterChart', this.electricDrop.empty)
		// 供电水滴图
		this.electricDropEchart('waterChart2', this.electricDrop.lighting)
		// 供电水滴图
		this.electricDropEchart('waterChart3', this.electricDrop.equipment)
		// 曲线图
		this.electricCurveEchart('water_curve', this.waterData)
		// 供水桩图
		this.waterPileEchart('water_pile')
		// 动画效果
		this.animation()
	},
	methods: {
		// 动画效果
		animation() {
			let powerSupply = document.querySelector('.power_supply');
			let waterSupply = document.querySelector('.water_supply');
			powerSupply.style.cssText = 'animation: policeRight 2s; opacity: 1;'
			waterSupply.style.cssText = 'animation: policeRight 4s; opacity: 1;'
		},
		// 曲线图
		electricCurveEchart(id, data) {
			let electricCurveChart = echarts.init(document.getElementById(id))
			let electricCurveOption = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					textStyle: {
						fontSize: 10,
						color: '#fff'
					}

				},
				grid: {
					top: '24%',
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: data.floor,
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
						name: data.data[0].name,
						type: 'line',
						// stack: '总量',
						areaStyle: {},
						smooth: true,
						data: data.data[0].consume,
						itemStyle: {
							normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0.3,
									color: 'rgba(171,56,134,1)' // 100% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(255,255,255,0)' // 100% 处的颜色
								}]), //背景渐变色
								lineStyle: { // 系列级个性化折线样式
									width: 2,
									type: 'solid',
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#BC2423' // 0% 处的颜色
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
						symbolSize: 2,

					},
					{
						name: data.data[1].name,
						type: 'line',
						stack: '总量',
						// areaStyle: {},
						smooth: true,
						data: data.data[1].consume,
						itemStyle: {
							normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0.3,
									color: 'rgba(66,223,204,0.4)' // 100% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(255,255,255,0)' // 100% 处的颜色
								}]), //背景渐变色
								lineStyle: { // 系列级个性化折线样式
									width: 2,
									type: 'solid',
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#42dfcc' // 0% 处的颜色
									}, {
										offset: 0.2,
										color: '#29B6E1' // 100% 处的颜色
									}, {
										offset: 1,
										color: ' rgba(255,255,255,0) ' // 100% 处的颜色
									}])
								}
							},
							emphasis: {
								color: '#42dfcc',
								lineStyle: { // 系列级个性化折线样式
									width: 1,
									type: 'dotted',
									color: "#085871" //折线的颜色
								}
							}
						}, //线条样式
					}
				]
			};
			electricCurveChart.setOption(electricCurveOption)
		},
		// 供电水滴图
		electricDropEchart(id, value) {
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
										"if(value<0.3){'rgba(0, 159, 232, 1)'}else if(value<0.7){'rgba(250, 173, 20, 1)'}else{'rgba(248, 9, 65, 1)'}"
									),
								},
							},
						},

					],
					label: {
						normal: {
							color: eval(
								"if(value<0.4){'rgba(0, 159, 232, 1)'}else if(value<0.7){'rgba(250, 173, 20, 1)'}else{'rgba(248, 9, 65, 1)'}"
							),
							textStyle: {
								fontSize: 13,
								fontWeight: 500
							}
						}
					},
					outline: {
						show: true,
						borderDistance: 2,
						itemStyle: {
							borderColor: eval(
								"if(value<0.3){'rgba(0, 159, 232, 0.4)'}else if(value<0.7){'rgba(250, 173, 20, 0.4)'}else{'rgba(248, 9, 65, 0.4)'}"
							),
							borderWidth: 1
						}
					},
					backgroundStyle: {
						color: '#033c69'
					}
				}]
			}
			ballChart.setOption(ballOption)
		},
		// 供水桩图
		waterPileEchart(id) {
			let waterPileChart = echarts.init(document.getElementById(id))
			let waterPileOption = {
				title: {
					top: 15,
					text: '历史供水统计图',
					textStyle: {
						color: '#fff',
						fontWeight: 400,
						fontSize: 12,
					}
				},
				tooltip: {},
				grid: {
					top: '30%',
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
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
					type: 'bar',
					barWidth: 20,
					showBackground: true,
					backgroundStyle: {
						color: 'rgba(180, 180, 180, 0.2)',
						barBorderRadius: [8, 8, 0, 0],
					},
					itemStyle: {
						normal: {
							borderWidth: 1,
							borderColor: '#18CEE2',
							barBorderRadius: 28,
							color: new echarts.graphic.LinearGradient(
								0, 0, 1, 0,
								[{
										offset: 0,
										color: '#1e76e2'
									},
									{
										offset: 1,
										color: '#1bbff4'
									}
								]
							)
						},
						emphasis: {
							barBorderRadius: 13,
							shadowBlur: 18,
							shadowColor: 'rgba(28,154, 195, 0.7)'
						}
					},
					data: [220, 182, 191, 234, 290, 330, 310]
				}, {
					name: 'a',
					tooltip: {
						show: false
					},
					type: 'pictorialBar',
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 1, 0,
								[{
										offset: 0,
										color: '#2bc6dd'
									},
									{
										offset: 1,
										color: '#15afef'
									}
								]
							),
							borderWidth: 1,
							borderColor: '#18CEE2'
						}
					},
					symbol: 'circle',
					symbolSize: ['20', '20'],
					symbolPosition: 'end',
					data: [220, 182, 191, 234, 290, 330, 310],
					z: 3
				}]
				// 	  series: [
				// 	    {
				// 	      data: [120, 200, 150, 80, 70, 110, 130],
				// 	      type: 'bar',
				// 		  barWidth: 25,
				// 	      showBackground: true,
				// 	      backgroundStyle: {
				// 	        color: 'rgba(180, 180, 180, 0.2)'
				// 	      }
				// 	    }
				// 	  ],
				// 	  color: ['#1b8ae6']
			}
			// let option = {
			//     xAxis: {
			//         data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
			//     },
			//     yAxis: {},

			// };
			waterPileChart.setOption(waterPileOption)
		}
	}
}
