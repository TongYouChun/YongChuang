// 智慧楼宇 左 统计图 js
import echarts from 'echarts'
import 'echarts-liquidfill'
export default {
	data() {
		return {
			value1: 0.3,
			value2: 0.4,
			value3: 0.5,
			value4: 0.6,
			value5: 0.7,
			value6: 0.8,
			value7: 0.2,
			value8: 0.9,
			// 消费系统
			fireControl: [{
					name: '温感报警',
					value: 1550,
					percentage: "80%",
					color: 'rgba(201,140,4,1)'
				},
				{
					name: '烟感报警',
					value: 1550,
					percentage: "80%",
					color: '#0d83c1'
				},
				{
					name: '手动报警',
					value: 1550,
					percentage: "80%",
					color: '#4180f2'
				},
				{
					name: '其他',
					value: 1550,
					percentage: "80%",
					color: '#8bcc92'
				}
			],

			// 暖通空调
			havcData: [{
					name: '空调',
					value: 1550,
					percentage: "80%",
					color: '#989c52'
				},
				{
					name: '排风',
					value: 1550,
					percentage: "80%",
					color: '#0d83c1'
				},
				{
					name: '制冷机',
					value: 1550,
					percentage: "80%",
					color: '#4180f2'
				},
				{
					name: '新风',
					value: 1550,
					percentage: "80%",
					color: '#8bcc92'
				},
				{
					name: '通风',
					value: 1550,
					percentage: "80%",
					color: '#56cbc2'
				},
				{
					name: '吊顶风机',
					value: 1550,
					percentage: "80%",
					color: '#17bcea'
				}
			],

		}
	},
	mounted() {
		this.dynamic();
		this.sphereChart('ball_chart', this.value1, '30°c');
		this.sphereChart('ball_chart2', this.value2, '30°c');
		this.sphereChart('ball_chart3', this.value3, '30°c');
		this.sphereChart('ball_chart4', this.value4, '30°c');
		this.sphereChart('ball_chart5', this.value5, '30°c');
		this.sphereChart('ball_chart6', this.value6, '30°c');
		this.sphereChart('ball_chart7', this.value7, '30°c');
		this.sphereChart('ball_chart8', this.value8, '30°c');
	},
	methods: {
		// 动画特效
		dynamic() {
			let dynamicDyke = document.querySelector('.dynamic_dyke');
			let dynamicEnergy = document.querySelector('.dynamic_energy');
			let dynamicHavc = document.querySelector('.dynamic_havc');
			let dynamicElectric = document.querySelector('.dynamic_electric');
			dynamicDyke.style.cssText = "animation: leftBuiding 2s; opacity: 1"
			dynamicEnergy.style.cssText = "animation: leftBuiding 3s; opacity: 1"
			dynamicHavc.style.cssText = "animation: leftBuiding 4s; opacity: 1"
			dynamicElectric.style.cssText = "animation: leftBuiding 5s; opacity: 1"
		},
		// 水球图
		sphereChart(quality, value, degree) {
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
										"if(value<0.3){'rgba(0, 159, 232, 1)'}else if(value<0.7){'rgba(250, 173, 20, 1)'}else{'rgba(249, 6, 28, 1)'}"
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
		}
	}
}
