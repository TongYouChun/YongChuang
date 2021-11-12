// 数字地标 左 数字地标 js
import echarts from 'echarts';
export default {
	props: ['digitData', 'wordEffect'],
	data() {
		return {
			// 企业数据
			qiyejinyingshuju: {},
			// 经营数据 1
			operatingData1: [],
			operatingImgs1: [{
				img: require('../../../assets/ico1.png')
			}, {
				img: require('../../../assets/ico2.png')
			}, {
				img: require('../../../assets/ico3.png')
			}],
			// 经营数据 2
			operatingData2: [],
			operatingImgs2: [{
				img: require('../../../assets/ico4.png')
			}, {
				img: require('../../../assets/ico5.png')
			}, {
				img: require('../../../assets/ico6.png')
			}],

			// 项目收支
			xiangmushouzhi: {},
			expenditureData: [],

			//项目合同
			xiangmuhetong: {},
			contractData: [],
			contractName: [],
		}
	},
	mounted() {
		// console.log(this.digitData)

	},
	watch: {
		wordEffect(ser) {
			if (ser == 'written') {	//判断公司文字介绍弹框是否加载完成
				let enterprise = document.querySelector('.enterprise_li');
				let collect = document.querySelector('.collect_li');
				let contract = document.querySelector('.contract_li');
				enterprise.style.cssText = "animation: myfirst 2s; opacity: 1;"
				collect.style.cssText = "animation: myfirst 3s; opacity: 1;"
				contract.style.cssText = "animation: myfirst 4s; opacity: 1;"
			}
		},
		// 数据
		digitData(val) {
			this.qiyejinyingshuju = val.qiyejinyingshuju;	//获得 企业经营的数据
			// 经营数据
			let qiyejinyingshujuData = JSON.parse(val.qiyejinyingshuju.data.jsonData); //字符串 转换成 json
			this.operatingData1 = qiyejinyingshujuData.operatingData1;	// 运营 上面 数据
			this.operatingData2 = qiyejinyingshujuData.operatingData2;	// 运营 下面 数据

			// 项目 收支
			this.xiangmushouzhi = val.xiangmushouzhi;  //获得 项目收支的数据
			let expenditureData = [];	// 创建新的数组
			expenditureData.push(['product', '支出', '收入'])
			this.xiangmushouzhi.data.map(ser => {
				expenditureData.push([ser.name, ser.expenditure, ser.income])
			})
			this.expenditureData = expenditureData;		// 将新数组 赋值 给 this.expenditureData
			// 项目 收支情况
			this.pileMain()

			// 项目合同
			this.xiangmuhetong = val.xiangmuhetong;	// 获得 项目合同的数据
			let contractData = JSON.parse(val.xiangmuhetong.data.jsonData); //字符串 转换成 json
			contractData.contractData.map(ser => {  // 循环接口获得的数据整理
				this.contractName.push(ser.name);	
				this.contractData.push({
					value: ser.quantity,	// 项目合同个数
					name: ser.name		// 项目名称
				});
			})
			// 项目合同额对比
			this.contractMain()
		}
	},
	methods: {
		// 主要项目支出情况
		pileMain() {
			let pileChart = echarts.init(document.getElementById('pile'));
			let pileOption = {
				legend: {
					data: ['支出', '收入'],
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
					source: this.expenditureData
				},
				dataZoom: [{
					textStyle: false,
					show: true,
					realtime: true,
					start: 0,
					end: 80,
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
				}]
			};
			pileChart.setOption(pileOption)
		},
		// 项目合同额对比
		contractMain() {
			let contractChart = echarts.init(document.getElementById('contract'));
			let contractOption = {
				legend: {
					type: 'scroll',
					orient: 'vertical',
					show: true,
					right: 0,
					// top: 20,
					bottom: 20,
					data: this.contractName,
					textStyle: { //图例文字的样式
						color: '#ccc',
						fontSize: 12
					}
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},

				series: [{
					name: '项目合同额对比',
					type: 'pie',
					radius: '80%',
					roseType: 'angle',
					avoidLabelOverlap: false,
					label: {
						show: true,
						position: 'inner',
						formatter: '{d}%',
						fontSize: 10
					},
					labelLine: {
						show: false
					},
					data: this.contractData,
				}],
				color: ['#0ce3f7', '#fd9d73', '#fefd05', '#4c9ffd']
			}
			contractChart.setOption(contractOption)
		}
	}
}
