// 智慧楼宇 右 统计图 js
import echarts from 'echarts'
import 'echarts-liquidfill'
export default {
	data() {
		return {
			// 防盗报警
			policeData: [{
				ico: require('../../../../public/imges/building/ico/open.png'),
				attribute: '状态',
				name: '撤防'
			}, {
				ico: require('../../../../public/imges/building/ico/zong.png'),
				attribute: '总数',
				name: '56个'
			}, {
				ico: require('../../../../public/imges/building/ico/police.png'),
				attribute: '报警次数',
				name: '13个'
			}],

			// 视频监控
			monitor: [{
					name: '硬盘录相机',
					value: 155,
					percentage: "50%",
					color: '#989c52',
					total: 550
				},
				{
					name: '摄相机',
					value: 155,
					percentage: "70%",
					color: '#0d83c1',
					total: 550
				},
				{
					name: '矩阵',
					value: 155,
					percentage: "60%",
					color: '#4180f2',
					total: 550
				}
			],

			// 照明
			lighting: [{
					name: '商业',
					value: 155,
					percentage: "40%",
					color: '#989c52',
					total: 550
				},
				{
					name: '车库',
					value: 155,
					percentage: "70%",
					color: '#0d83c1',
					total: 550
				},
				{
					name: '百货',
					value: 155,
					percentage: "80%",
					color: '#4180f2',
					total: 550
				},
				{
					name: '景观',
					value: 155,
					percentage: "75%",
					color: '#57d1c2',
					total: 550
				}
			],

			// 排水
			stageData: {
				bottom: 0.3,
				high: 0.5,
				exceed: 0.84
			}

		}
	},
	mounted() {
		this.effect();
		this.stageChart('stage_statistics', this.stageData.bottom)
		this.stageChart('stage_statistics2', this.stageData.high)
		this.stageChart('stage_statistics3', this.stageData.exceed)
	},
	methods: {
		// 排水统计
		stageChart(quality, value) {
			let ballChart = echarts.init(document.getElementById(quality));
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
										"if(value<0.4){'rgba(0, 159, 232, 1)'}else if(value<0.7){'rgba(250, 173, 20, 1)'}else{'rgba(249, 6, 28, 1)'}"
									),
								},
							},
						},

					],
					label: {
						normal: {
							color: eval(
								"if(value<0.4){'rgba(0, 159, 232, 1)'}else if(value<0.7){'rgba(250, 173, 20, 1)'}else{'rgba(249, 6, 28, 1)'}"
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
		},
		//	页面加载 特效
		effect() {
			let effectPolice = document.querySelector('.effect_police'); // DOM
			let effectMonitor = document.querySelector('.effect_monitor');
			let effectVehicle = document.querySelector('.effect_vehicle');
			let effectLighting = document.querySelector('.effect_lighting');
			effectPolice.style.cssText = "animation: rightBuiding 2s; opacity: 1"
			effectMonitor.style.cssText = "animation: rightBuiding 3s; opacity: 1"
			effectVehicle.style.cssText = "animation: rightBuiding 4s; opacity: 1"
			effectLighting.style.cssText = "animation: rightBuiding 5s; opacity: 1"

		}
	}
}
