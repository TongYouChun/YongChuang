import echarts from 'echarts';
import $ from 'jquery';

import cityMap from '@/deposit/citymap.js';

export default {
	data() {
		return {
			Mapoption: '',
			returnHide: false,
		}
	},
	mounted() {
		// this.mapPenetrate()
		this.displayMap()
	},
	methods: {
		mapPenetrate() {
			let ths = this;
			//地图容器
			var Mapchart = echarts.init(document.getElementById('penetration'));
			//34个省、市、自治区的名字拼音映射数组
			var provinces = {
				//23个省
				"台湾": "taiwan",
				"河北": "hebei",
				"山西": "shanxi",
				"辽宁": "liaoning",
				"吉林": "jilin",
				"黑龙江": "heilongjiang",
				"江苏": "jiangsu",
				"浙江": "zhejiang",
				"安徽": "anhui",
				"福建": "fujian",
				"江西": "jiangxi",
				"山东": "shandong",
				"河南": "henan",
				"湖北": "hubei",
				"湖南": "hunan",
				"广东": "guangdong",
				"海南": "hainan",
				"四川": "sichuan",
				"贵州": "guizhou",
				"云南": "yunnan",
				"陕西": "shanxi1",
				"甘肃": "gansu",
				"青海": "qinghai",
				//5个自治区
				"新疆": "xinjiang",
				"广西": "guangxi",
				"内蒙古": "neimenggu",
				"宁夏": "ningxia",
				"西藏": "xizang",
				//4个直辖市
				"北京": "beijing",
				"天津": "tianjin",
				"上海": "shanghai",
				"重庆": "chongqing",
				//2个特别行政区
				"香港": "xianggang",
				"澳门": "aomen"
			};
			var an = [];
			let xian = [];

			// 返回到上一级
			let mapPenetrationButton = document.querySelector('.map_penetration_Button');
			mapPenetrationButton.onclick = function() {
				$.getJSON('./map/china.json', function(data) {
					let d = [];
					for (var i = 0; i < data.features.length; i++) {
						d.push({
							name: data.features[i].properties.name
						})
					}
					// 隐藏南海诸岛
					d.push({
						name: "南海诸岛",
						value: 0,
						label: {
							normal: {
								show: false
							}
						},
						itemStyle: {
							normal: {
								opacity: 0,
							}
						}
					})
					//注册地图
					echarts.registerMap('china', data);
					//绘制地图
					renderMap('china', d);
					ths.returnHide = false;
				});
			}

			// var datas  = [];
			//绘制全国地图
			$.getJSON('./map/china.json', function(data) {
				// console.log(data)
				let d = [];
				for (var i = 0; i < data.features.length; i++) {
					d.push({
						name: data.features[i].properties.name
					})
				}
				// 隐藏南海诸岛
				d.push({
					name: "南海诸岛",
					value: 0,
					label: {
						normal: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							opacity: 0,
						}
					}
				})
				// console.log(data.features)
				//注册地图
				echarts.registerMap('china', data);
				// console.log(d)
				//绘制地图
				renderMap('china', d);
			});

			//地图点击事件
			Mapchart.on('dblclick', function(params) {
				// console.log(params.name);
				if (params.name in provinces) {
					// 如果点击的是34个省、市、自治区，绘制选中地区的二级地图
					$.getJSON('./map/province/' + provinces[params.name] + '.json', function(data) {
						echarts.registerMap(params.name, data);
						var d = [];
						for (var i = 0; i < data.features.length; i++) {
							an.push({
								name: data.features[i].properties.name,
								selected: false
							})
						}
						// datas.map(ser => {
						// 	an.push(ser)
						// })
						console.log(an)
						// console.log(datas)
						// console.log(cityMap)
						renderMap(params.name, an);
						ths.returnHide = true;
					});
				} else {
					// $.getJSON('./map/city/' + cityMap[params.name] + '.json', function(data) {
					// 	console.log(data)
					// 	echarts.registerMap(params.name, data);
					// 	for (var i = 0; i < data.features.length; i++) {
					// 		xian.push({
					// 			name: data.features[i].properties.name,
					// 			selected: false
					// 		})
					// 	}
					// 	console.log(xian)
					// 	renderMap(params.name, xian);
					// 	ths.returnHide = true;
					// })



					// an.map(ser => {
					// 	if (ser.name == params.name) {
					// 		ser.selected = true
					// 	} else {
					// 		ser.selected = false
					// 	}
					// })
					// // Mapoption.series[0].itemStyle.emphasis.areaColor = '#129F16'
					// Mapoption.series[0].data = an
					// Mapchart.setOption(Mapoption, true);
				}
			});

			Mapchart.on('click', function(params) {
				// console.log(params)
			})
			//初始化绘制全国地图配置
			var Mapoption = {
				title: {
					left: 'center',
					textStyle: {
						color: '#fff',
						fontSize: 16,
						fontWeight: 'normal',
						fontFamily: "Microsoft YaHei"
					},
					subtextStyle: {
						color: '#fff',
						fontSize: 13,
						fontWeight: 'normal',
						fontFamily: "Microsoft YaHei"
					},
				},

				tooltip: {
					trigger: 'item',
					backgroundColor: 'rgba(0, 0, 0, 0)',
					formatter: function(params, ticket, callback) {
						let content = {
							area: 1,
							areaName: params.name
						}
						var tipHtml = '';
						tipHtml =
							'<div style="width:200px;height:100px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
							'<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);margin-bottom:5px;">' +
							'<span style="margin-left:10px;color:#fff;font-size:16px;">' + params.name +
							'</span>' + '</div>' +
							'<div>' +
							'<p style="color:#fff;font-size:12px;">' +
							'<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;margin:0 8px">' +
							'</i>' +
							'项目工程：' + '<span style="color:#f48225;margin:0 6px;">' + 3 + '</span>' + '个' +
							'</p>' +
							'</div>' + '</div>';
						return tipHtml;
					}
				},
				animationDuration: 1000,
				animationEasing: 'cubicOut',
				animationDurationUpdate: 1000,

			};

			function renderMap(map, data) {
				// console.log(map)
				// option.title.subtext = map;
				Mapoption.series = [{
					name: map,
					type: 'map',
					mapType: map,
					x: '20%',
					roam: true,
					zoom: 1.2,
					nameMap: {
						'china': '中国'
					},
					label: {
						normal: {
							show: true,
							color: '#d1d1d1',
							fontSize: 12,
							fontWeight: 'normal',
							fontFamily: "Microsoft YaHei"

						},
						emphasis: {
							show: true,
							color: '#fff',
							fontSize: 12,
							fontWeight: 'normal',
							fontFamily: "Microsoft YaHei"
						}
					},
					itemStyle: {
						normal: {
							borderColor: 'rgba(147, 235, 248, .3)',
							borderWidth: 1,
							areaColor: {
								type: 'radial',
								x: 0.5,
								y: 0.5,
								r: 0.8,
								colorStops: [{
									offset: 0,
									color: 'rgba(175,238,238, 0)' // 0% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(47,79,79, .1)' // 100% 处的颜色
								}],
								globalCoord: false // 缺省为 false
							},
							shadowColor: 'rgba(128, 217, 248, .4)',
							shadowOffsetX: -2,
							shadowOffsetY: 2,
							shadowBlur: 10
						},
						emphasis: {
							areaColor: 'rgba(128, 217, 248, 0.7)',
							borderWidth: 1
						}
					},
					data: data
				}];
				//渲染地图
				Mapchart.setOption(Mapoption, true);
			}

		},

		// 显示 地图 坐标
		displayMap() {
			let ths = this;
			//地图容器
			var Mapchart = echarts.init(document.getElementById('penetration'));
			//34个省、市、自治区的名字拼音映射数组
			var provinces = {
				//23个省
				"台湾": "taiwan",
				"河北": "hebei",
				"山西": "shanxi",
				"辽宁": "liaoning",
				"吉林": "jilin",
				"黑龙江": "heilongjiang",
				"江苏": "jiangsu",
				"浙江": "zhejiang",
				"安徽": "anhui",
				"福建": "fujian",
				"江西": "jiangxi",
				"山东": "shandong",
				"河南": "henan",
				"湖北": "hubei",
				"湖南": "hunan",
				"广东": "guangdong",
				"海南": "hainan",
				"四川": "sichuan",
				"贵州": "guizhou",
				"云南": "yunnan",
				"陕西": "shanxi1",
				"甘肃": "gansu",
				"青海": "qinghai",
				//5个自治区
				"新疆": "xinjiang",
				"广西": "guangxi",
				"内蒙古": "neimenggu",
				"宁夏": "ningxia",
				"西藏": "xizang",
				//4个直辖市
				"北京": "beijing",
				"天津": "tianjin",
				"上海": "shanghai",
				"重庆": "chongqing",
				//2个特别行政区
				"香港": "xianggang",
				"澳门": "aomen"
			};
			var an = [];
			let xian = [];
			var geoCoordMap = {
				"南京": [118.78, 32.04],
				"北京": [116.46, 39.92],
			};
			var convertData = function(data) {
				var res = [];
				for (var i = 0; i < data.length; i++) {
					var geoCoord = geoCoordMap[data[i].name];
					if (geoCoord) {
						res.push(geoCoord.concat(data[i].value));
					}
				}
				return res;
			};
			// 返回到上一级
			let mapPenetrationButton = document.querySelector('.map_penetration_Button');
			mapPenetrationButton.onclick = function() {
				$.getJSON('./map/china.json', function(data) {
					let d = [];
					for (var i = 0; i < data.features.length; i++) {
						d.push({
							name: data.features[i].properties.name
						})
					}
					// 隐藏南海诸岛
					d.push({
						name: "南海诸岛",
						value: 0,
						label: {
							normal: {
								show: false
							}
						},
						itemStyle: {
							normal: {
								opacity: 0,
							}
						}
					})
					//注册地图
					echarts.registerMap('china', data);
					//绘制地图
					renderMap('china', d);
					ths.returnHide = false;
				});
			}

			// var datas  = [];
			//绘制全国地图
			$.getJSON('./map/china.json', function(data) {
				// console.log(data)
				let d = [];
				for (var i = 0; i < data.features.length; i++) {
					d.push({
						name: data.features[i].properties.name
					})
				}
				// 隐藏南海诸岛
				d.push({
					name: "南海诸岛",
					value: 0,
					label: {
						normal: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							opacity: 0,
						}
					}
				})
				// console.log(data.features)
				//注册地图
				echarts.registerMap('china', data);
				// console.log(d)
				//绘制地图
				renderMap('china', d);
			});

			//地图点击事件
			Mapchart.on('dblclick', function(params) {
				// console.log(params.name);
				if (params.name in provinces) {
					// 如果点击的是34个省、市、自治区，绘制选中地区的二级地图
					$.getJSON('./map/province/' + provinces[params.name] + '.json', function(data) {
						echarts.registerMap(params.name, data);
						var d = [];
						for (var i = 0; i < data.features.length; i++) {
							an.push({
								name: data.features[i].properties.name,
								selected: false
							})
						}
						// datas.map(ser => {
						// 	an.push(ser)
						// })
						console.log(an)
						// console.log(datas)
						// console.log(cityMap)
						renderMap(params.name, an);
						ths.returnHide = true;
					});
				} else {
					// $.getJSON('./map/city/' + cityMap[params.name] + '.json', function(data) {
					// 	console.log(data)
					// 	echarts.registerMap(params.name, data);
					// 	for (var i = 0; i < data.features.length; i++) {
					// 		xian.push({
					// 			name: data.features[i].properties.name,
					// 			selected: false
					// 		})
					// 	}
					// 	console.log(xian)
					// 	renderMap(params.name, xian);
					// 	ths.returnHide = true;
					// })



					// an.map(ser => {
					// 	if (ser.name == params.name) {
					// 		ser.selected = true
					// 	} else {
					// 		ser.selected = false
					// 	}
					// })
					// // Mapoption.series[0].itemStyle.emphasis.areaColor = '#129F16'
					// Mapoption.series[0].data = an
					// Mapchart.setOption(Mapoption, true);
				}
			});

			Mapchart.on('click', function(params) {
				// console.log(params)
			})
			//初始化绘制全国地图配置
			var Mapoption = {
				title: {
					left: 'center',
					textStyle: {
						color: '#fff',
						fontSize: 16,
						fontWeight: 'normal',
						fontFamily: "Microsoft YaHei"
					},
					subtextStyle: {
						color: '#fff',
						fontSize: 13,
						fontWeight: 'normal',
						fontFamily: "Microsoft YaHei"
					},
				},
				// tooltip: {
				// 	trigger: 'item'
				// },
				// legend: {
				// 	orient: 'vertical',
				// 	top: 'bottom',
				// 	left: 'right',
				// 	data: ['pm2.5'],
				// 	textStyle: {
				// 		color: '#fff'
				// 	}
				// },
				visualMap: {
					top: 'bottom',
					left: '2%',
					min: 0,
					max: 100,
					splitNumber: 5,
					color: ['#d94e5d', '#eac736', '#50a3ba'],
					textStyle: {
						color: '#fff'
					}
				},
				tooltip: {
					trigger: 'item',
					backgroundColor: 'rgba(0, 0, 0, 0)',
					formatter: function(params, ticket, callback) {
						let content = {
							area: 1,
							areaName: params.marker
						}
						var tipHtml = '';
						tipHtml =
							'<div style="width:200px;height:100px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
							'<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);margin-bottom:5px;">' +
							'<span style="margin-left:10px;color:#fff;font-size:16px;">' + params.marker +
							'</span>' + '</div>' +
							'<div>' +
							'<p style="color:#fff;font-size:12px;">' +
							'<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;margin:0 8px">' +
							'</i>' +
							'项目工程：' + '<span style="color:#f48225;margin:0 6px;">' + 3 + '</span>' + '个' +
							'</p>' +
							'</div>' + '</div>';
						return tipHtml;
					}
				},
				animationDuration: 1000,
				animationEasing: 'cubicOut',
				animationDurationUpdate: 1000,

			};

			function renderMap(map, data) {
				// console.log(map)
				// option.title.subtext = map;
				Mapoption.geo = {
					map: map,
					x: '20%',
					roam: true,
					zoom: 1.2,
					nameMap: {
						'china': '中国'
					},
					label: {
						normal: {
							show: true,
							color: '#d1d1d1',
							fontSize: 12,
							fontWeight: 'normal',
							fontFamily: "Microsoft YaHei"

						},
						emphasis: {
							show: true,
							color: '#fff',
							fontSize: 12,
							fontWeight: 'normal',
							fontFamily: "Microsoft YaHei"
						}
					},
					itemStyle: {
						normal: {
							borderColor: 'rgba(147, 235, 248, .3)',
							borderWidth: 1,
							areaColor: {
								type: 'radial',
								x: 0.5,
								y: 0.5,
								r: 0.8,
								colorStops: [{
									offset: 0,
									color: 'rgba(175,238,238, 0)' // 0% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(47,79,79, .1)' // 100% 处的颜色
								}],
								globalCoord: false // 缺省为 false
							},
							shadowColor: 'rgba(128, 217, 248, .4)',
							shadowOffsetX: -2,
							shadowOffsetY: 2,
							shadowBlur: 10
						},
						emphasis: {
							areaColor: 'rgba(128, 217, 248, 0.7)',
							borderWidth: 1
						}
					},
					data: data
				};
				Mapoption.series = [{
					name: 'pm2.5',
					type: 'scatter',
					coordinateSystem: 'geo',
					data: convertData([{
							name: "北京",
							value: 25
						},
						{
							name: "南京",
							value: 67
						}
					]),
					symbolSize: 12,
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: false
						}
					},
					itemStyle: {
						emphasis: {
							borderColor: '#fff',
							borderWidth: 1
						}
					}
				}]

				//渲染地图
				Mapchart.setOption(Mapoption, true);
			}

		}
	},

}
