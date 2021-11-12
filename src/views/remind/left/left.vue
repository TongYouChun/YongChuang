<!--报警页面 左 统计图 -->
<template>
	<div class="left_remind">
		<div class="chart_li chart_li_urgent">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				告警管理
			</div>
			<div class="chart_content">
				<!-- 状态名称 -->
				<div class="chart_state_name">
					<div class="chart_state_li">
						<div class="chart_state_ico">
							<img src="../../../../public/imges/building/police/teji.png" >
						</div>
						<div class="name">
							特级：2
						</div>
					</div>
					<div class="chart_state_li">
						<div class="chart_state_ico">
							<img src="../../../../public/imges/building/police/jingji.png" >
						</div>
						<div class="name">
							紧急：3
						</div>
					</div>
					<div class="chart_state_li">
						<div class="chart_state_ico">
							<img src="../../../../public/imges/building/police/yiban.png" >
						</div>
						<div class="name">
							一般：2
						</div>
					</div>
					<div class="chart_state_li">
						<div class="chart_state_ico">
							<img src="../../../../public/imges/building/police/hanse.png" >
						</div>
						<div class="name">
							普通: 5
						</div>
					</div>
				</div>
				<!-- 告警列表 -->
				<div class="chart_state_list">
					<!-- 列表 标题 -->
					<div class="list_title">
						<div class="title_li">
							位置
						</div>
						<div class="title_li">
							设备信息
						</div>
						<div class="title_li">
							设备情况
						</div>
						<div class="title_li">
							类型
						</div>
						<div class="title_li">
							级别
						</div>
					</div>
				
					<!-- 列表 内容 -->
					<div class="list_ul">
						<div class="list_ul_li" v-for="(item,index) in 20" :key="index" @click="clickList(index)">
							<div class="list_police_li">
								1层
							</div>
							<div class="list_police_li" style="color: #d6c00b;">
								0011设备
							</div>
							<div class="list_police_li" style="color: #0bb9fe;">
								设备隐患
							</div>
							<div class="list_police_li">
								<img src="../../../../public/imges/building/police/jingji.png" >
							</div>
							<div class="list_police_li" style="color: #cf5709;">
								紧急
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="chart_li chart_li_lighting">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				建筑照明
			</div>
			<div class="chart_content">
				<div class="lighting">
					<div class="lighting_left">
						<img src="../../../../public/imges/building/police/fanzmx.png" >
					</div>
					<div class="lighting_right">
						<div class="lighting_right_ul">
							<div class="lighting_right_li">
								<div class="lighting_right_colour" style="background-color: #e4e0bd;"></div>
								<div class="lighting_right_pattern">
									工作模式
								</div>
								<div class="lighting_right_layer">
									共11层
								</div>
							</div>
							<div class="lighting_right_li">
								<div class="lighting_right_colour" style="background-color: #61e3e3;"></div>
								<div class="lighting_right_pattern">
									午休模式
								</div>
								<div class="lighting_right_layer">
									共11层
								</div>
							</div>
							<div class="lighting_right_li">
								<div class="lighting_right_colour" style="background-color: #42dc24;"></div>
								<div class="lighting_right_pattern">
									下班模式
								</div>
								<div class="lighting_right_layer">
									共4层
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 弹框 -->
		<div class="remind_frame" v-if="elasticType">
			<div class="frame" v-if="!seeType">
				<div class="frame_top">
					设备告警
				</div>
				<div class="frame_middle">
					<div class="middle_left">
						<div class="frame_ico">
							<img src="../../../../public/imges/building/police/yiban.png" >
						</div>
						<div class="frame_text">
							一般警报
						</div>
					</div>
					<div class="middle_right">
						<div class="middle_text">
							照明设备有损
						</div>
						<div class="middle_text">
							2021/10/19
						</div>
						<div class="middle_text">
							测试一用灯管理
						</div>
					</div>
				</div>
				<div class="frame_bottom">
					<div class="Button_text Press1" @click="clickCancel()">
						取消所在警告
					</div>
					<div class="Button_text Press2" @click="clickCancel()">
						取消警告
					</div>
					<div class="Button_text Press3" @click="clickDetails()">
						警告详情
					</div>
				</div>
			</div>
			<!-- 弹框 详情 -->
			<div class="remind_frame_details" v-else>
				<!-- 上 -->
				<div class="frame_details_top">
					<div class="frame_details_title">
						紧急区域分区汇总
					</div>
					<div class="frame_details_return" @click="clickReturn()">
						<span>返回上一页</span>
					</div>
				</div>
				<!-- 中 -->
				<div class="frame_details_middle">
					<div class="frame_details_middle_left">
						<div class="frame_details_middle_title">
							分区设备X监控
						</div>
						<div class="frame_details_middle_li">
							
						</div>
						<div class="frame_details_middle_li">
							
						</div>
					</div>
					<div class="frame_details_middle_right">
						<div class="frame_details_middle_title">
							分区设备X监控
						</div>
						<div class="frame_details_middle_ul">
							<div class="frame_details_middle_li_equipment">
								告警
							</div>
							<div class="frame_details_middle_li_equipment">
								WJT134565
							</div>
							<div class="frame_details_middle_li_equipment">
								告警编号
							</div>
							<div class="frame_details_middle_li_equipment">
								K24324
							</div>
							<div class="frame_details_middle_li_equipment">
								告警等级
							</div>
							<div class="frame_details_middle_li_equipment">
								特级
							</div>
							<div class="frame_details_middle_li_equipment">
								告警设备名称
							</div>
							<div class="frame_details_middle_li_equipment">
								照明设备
							</div>
							<div class="frame_details_middle_li_equipment">
								告警时间
							</div>
							<div class="frame_details_middle_li_equipment">
								2021/10/14
							</div>
							<div class="frame_details_middle_li_equipment">
								操作
							</div>
							<div class="frame_details_middle_li_equipment">
								设备告警
							</div>
							<div class="frame_details_middle_li_equipment">
								设备描述
							</div>
							<div class="frame_details_middle_li_equipment">
								测试灯设备
							</div>
						</div>
					</div>
				</div>
				<!-- 下 -->
				<div class="frame_details_bottom">
					<div class="frame_details_Button" @click="clickCancel()">
						取消按钮
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import left from './left.js';
	export default left;
</script>

<style scoped>
	 @import url("left.css");
</style>
