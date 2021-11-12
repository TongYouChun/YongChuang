<!--智慧楼宇 左 操作功能栏-->
<template>
	<div class="operation">
		<div class="operation_li" v-for="(item,index) in handleData" :key="index" @click="clickOperation(index)">
			<img :src="item.Imgs" v-if="item.type">
			<img :src="item.initialImgs" v-else>
			<div class="operation_li_name">
				{{item.name}}
			</div>
		</div>
		<!-- 按钮 -->
		<div class="operation_button" @click="clickSwitch()" v-if="operate && judgeType != '4'">
			<b class="operation_button_ico" v-if="switchs"></b>
			<span v-if="switchs">展开</span>
			<span v-if="!switchs">收起</span>
			<b class="operation_button_ico2" v-if="!switchs"></b>
		</div>
		<!-- 返回 -->
		<div class="operation_return" @click="clickReturn()" v-if="operate">
		</div>
		<!-- 操作栏 -->
		<div class="operation_column">
			<!-- 右 -->
			<div class="operation_right" v-if="showHide">
				<div class="operation_menu">
					<div class="operation_menu_title">
						<b></b>
						<span>子类系统类型</span>
					</div>
					<div class="operation_menu_ul">
						<div class="operation_menu_li" :class="item.type ? 'operation_menu_li_te': ''"
							v-for="(item,index) in subclassData" :key="index" @click="clickSystem(index)">
							{{item.name}}
						</div>
					</div>
					<div class="operation_menu_title">
						<b></b>
						<span>设备资料</span>
					</div>
					<div class="operation_menu_ul">
						<div class="operation_menu_li" :class="item.type ? 'operation_menu_li_te' : ''"
							v-for="(item,index) in meansData" :key="index" @click="clickMaterial(index)">
							{{item.name}}
						</div>
					</div>
				</div>
				<div class="operation_list">
					<div class="operation_menu_title">
						<b></b>
						<span>设备列表</span>
					</div>
					<div class="device_list_catalogue">
						<span>序号</span>
						<span>设备型号</span>
						<span>设备编码</span>
						<span>设备状态</span>
					</div>
					<div class="device_list_ul">
						<div class="device_list_li" v-for="(item,index) in listData" :key="index"
							@click="clickChoice(index,item.system)">
							<div class="device_list_li_span">
								{{index+1}}
							</div>
							<div class="device_list_li_span">
								{{item.model}}
							</div>
							<div class="device_list_li_span">
								{{item.code}}
							</div>
							<div class="device_list_li_span">
								<img src="../../../../public/imges/building/control/status.png"
									v-if="item.state == 1" />
								<img src="../../../../public/imges/building/control/status3.png"
									v-if="item.state == 2" />
								<img src="../../../../public/imges/building/control/status2.png"
									v-if="item.state == 3" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 左 弹框操作 -->
			<div class="operation_left" v-if="control">
				<div class="operation_left_panel">
					全控面板
				</div>
				<div class="operation_left_ul">
					<div class="operation_li">
						<b></b>
						<span>当前启动</span>
					</div>
					<div class="operation_li">
						<b></b>
						<span>运行模式</span>
					</div>
					<div class="operation_li">
						<b></b>
						<span>设备</span>
					</div>
					<div class="operation_li">
						<b></b>
						<span>温度</span>
					</div>
					<div class="operation_li">
						<b></b>
						<span>压力</span>
					</div>
					<div class="operation_li">
						<b></b>
						<span>高低液位</span>
					</div>
				</div>
				<!-- 关闭 -->
				<div class="operation_left_close" @click="clickControl()"></div>
			</div>
			<!-- 底部 图纸参数+操作功能 -->
			<div class="operation_lower" v-if="attribute">
				<div class="operation_lower_left">

				</div>
				<div class="operation_lower_right">
					<div class="waterValve_ul">
						<div class="waterValve_li">
							水阀模式选项
						</div>
						<div class="waterValve_li">
							水阀开度设定
						</div>
						<div class="waterValve_li">
							水阀反馈
						</div>
						<div class="waterValve_li">
							水阀输出
						</div>
						<div class="waterValve_li">
							变频器模式选择
						</div>
						<div class="waterValve_li">
							变频器频率
						</div>
						<div class="waterValve_li">
							频率反馈
						</div>
						<div class="waterValve_li">
							频率输出
						</div>
						<div class="waterValve_li">
							风阀调节
						</div>
						<div class="waterValve_li">
							风阀状态
						</div>
						<div class="waterValve_li">
							风阀启停控制
						</div>
						<div class="waterValve_li">
							风阀模式选项
						</div>
					</div>
				</div>
				<!-- 关闭 -->
				<div class="operation_left_close" @click="clickAttribute()"></div>
			</div>
		</div>
		<!-- 能耗 操作 -->
		<div class="consumption_column" v-show="judgeType == '4'">
			<!-- 上 -->
			<div class="consumption_top">
				<div class="consumption_cumulative">
					<div class="cumulative_text">
						<span>累计总耗能</span>
						<span>5466357Kwh</span>
					</div>
				</div>

				<div class="consumption_year">
					<div class="year_text">
						<span>年度总耗能</span>
						<span>5466357Kwh</span>
					</div>
				</div>
			</div>
			<!-- 中 -->
			<div class="consumption_middle">
				<div class="consumption_middle_left">
					<div class="consumption_middle_li">
						<div class="consumption_title">
							空调
						</div>
						<div class="consumption_middle_container">
							<div class="left_container">
								<div class="text_li">
									今日用电量 <span>234Kwh</span>
								</div>
								<div class="text_li">
									实时功率 <span>234Kwh</span>
								</div>
							</div>
							<div class="right_container">
								<div id="expend" style="width: 100%; height: 100%;"></div>
							</div>
						</div>
					</div>
					<div class="consumption_middle_li">
						<div class="consumption_title">
							电梯
						</div>
						<div class="consumption_middle_container">
							<div class="left_container">
								<div class="text_li">
									今日用电量 <span>234Kwh</span>
								</div>
								<div class="text_li">
									实时功率 <span>234Kwh</span>
								</div>
							</div>
							<div class="right_container">
								<!-- <div id="expend" style="width: 100%; height: 100%;"></div> -->
							</div>
						</div>
					</div>
					<div class="consumption_middle_li">
						<div class="consumption_title">
							供水
						</div>
						<div class="consumption_middle_container">
							<div class="left_container">
								<div class="text_li">
									今日用电量 <span>234Kwh</span>
								</div>
								<div class="text_li">
									实时功率 <span>234Kwh</span>
								</div>
							</div>
							<div class="right_container">
								<!-- <div id="expend" style="width: 100%; height: 100%;"></div> -->
							</div>
						</div>
					</div>
				</div>
				<div class="consumption_middle_middle">
					<!-- 中间 栋 -->
					<div class="consumption_middle_analysis">
						<div class="analysis_title">
							3# 2栋
						</div>
						<!-- 健康分析 -->
						<div class="analysis_content">
							<div class="analysis_content_left">
								<div class="analysis_content_title">
									健康度分析
								</div>
								<div class="analysis_content_li">
									摄像 <span>88%</span>
								</div>
								<div class="analysis_content_li">
									门禁 <span>92%</span>
								</div>
								<div class="analysis_content_li">
									电梯 <span>100%</span>
								</div>
								<div class="analysis_content_li">
									空调 <span>85%</span>
								</div>
							</div>
							<div class="analysis_content_right">
								<img src="../../../../public/imges/building/control/nenghao/fxtp.png" >
							</div>
						</div>
						<!-- 告警统计 -->
						<div class="police">
							<div class="police_title">
								告警统计 
							</div>
							<div class="police_chart">
								<div id="police_echart" style="width: 100%; height: 100%;"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="consumption_middle_right">
					<div class="consumption_middle_li">
						<div class="consumption_title">
							通风
						</div>
						<div class="consumption_middle_container">
							<div class="left_container">
								<div class="text_li">
									今日用电量 <span>234Kwh</span>
								</div>
								<div class="text_li">
									实时功率 <span>234Kwh</span>
								</div>
							</div>
							<div class="right_container">
								<!-- <div id="expend" style="width: 100%; height: 100%;"></div> -->
							</div>
						</div>

					</div>
					<div class="consumption_middle_li">
						<div class="consumption_title">
							机房
						</div>
						<div class="consumption_middle_container">
							<div class="left_container">
								<div class="text_li">
									今日用电量 <span>234Kwh</span>
								</div>
								<div class="text_li">
									实时功率 <span>234Kwh</span>
								</div>
							</div>
							<div class="right_container">
								<!-- <div id="expend" style="width: 100%; height: 100%;"></div> -->
							</div>
						</div>
					</div>
					<div class="consumption_middle_li">
						<div class="consumption_title">
							电梯
						</div>
						<div class="consumption_middle_container">
							<div class="left_container">
								<div class="text_li">
									今日用电量 <span>234Kwh</span>
								</div>
								<div class="text_li">
									实时功率 <span>234Kwh</span>
								</div>
							</div>
							<div class="right_container">
								<!-- <div id="expend" style="width: 100%; height: 100%;"></div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 下 -->
			<div class="consumption_bottom">
				<div class="consumption_bottom_li">
					<div class="consumption_bottom_title">
						<div class="bottom_title">
							历史趋势
						</div>
						<div class="specific_date">
							<span>2021年10月5日</span>
						</div>
						<div class="consumption_bottom_choice_ul">
							<div class="consumption_bottom_choice_li">
								年
							</div>
							<div class="consumption_bottom_choice_li">
								月
							</div>
							<div class="consumption_bottom_choice_li">
								日
							</div>
						</div>
						<div class="consumption_bottom_history">
							查看历史
						</div>
					</div>
					
					<!-- 统计图 -->
					<div class="consumption_bottom_statistical">
						<div id="broken" style="width: 100%; height: 100%;"></div>
					</div>
				</div>
				<div class="consumption_bottom_li">
					<div class="consumption_bottom_title">
						<div class="bottom_title">
							历史趋势
						</div>
						<div class="specific_date">
							<span>2021年10月5日</span>
						</div>
						<div class="consumption_bottom_choice_ul">
							<div class="consumption_bottom_choice_li">
								年
							</div>
							<div class="consumption_bottom_choice_li">
								月
							</div>
							<div class="consumption_bottom_choice_li">
								日
							</div>
						</div>
						<div class="consumption_bottom_history">
							查看历史
						</div>
					</div>
					<!-- 统计图 -->
					<div class="consumption_bottom_statistical">
						<div id="broken2" style="width: 100%; height: 100%;"></div>
					</div>
				</div>
			</div>
		</div>
		<!-- 背景图片 -->
		<!-- 楼控 -->
		<!-- <div class="backdrop_imgs floor_imgs" v-if="judgeType == '1'"></div> -->
		<!-- 安防 -->
		<!-- <div class="backdrop_imgs security_imgs" v-if="judgeType == '2'"></div> -->
		<!-- 消防 -->
		<!-- <div class="backdrop_imgs hydrant_imgs" v-if="judgeType == '3'"></div> -->
		<!-- 节能 -->
		<!-- <div class="backdrop_imgs save_imgs" v-if="judgeType == '4'"></div> -->
		<!-- 门禁 -->
		<!-- <div class="backdrop_imgs door_imgs" v-if="judgeType == '5'"></div> -->
		<!-- 车位 -->
		<!-- <div class="backdrop_imgs parking_imgs" v-if="judgeType == '6'"></div> -->

	</div>
</template>

<script>
	import operation from './operation.js';
	export default operation;
</script>

<style scoped>
	@import url("operation.css");
</style>
