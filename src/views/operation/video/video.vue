<!-- 项目监控视频列表 -->
<template>
	<div class="video_monitor">
		<!-- 监控视频菜单 + 数量 -->
		<div class="video_monitor_menu">
			<div class="menu_name_ul">
				<div class="menu_li" :class="item.switchType ? 'menu_li_te' : ''" v-for="(item,index) in videoMenuData"
					:key="index" @click="menuClick(index)">
					{{item.name}}
				</div>
				<div class="menu_li_command" @click="clickCommand()">
					应急指挥
				</div>
			</div>
			<div class="video_monitor_quantity">
				<div class="monitor_quantity_name">
					摄像头数量:
				</div>
				<div class="monitor_quantity_ul">
					<div class="monitor_quantity_li">
						0
					</div>
					<div class="monitor_quantity_li">
						9
					</div>
					<div class="monitor_quantity_li">
						9
					</div>
				</div>
			</div>
		</div>

		<!-- 工程 监控视频 -->
		<div class="video_monitor_column" v-loading="loading" >
			<div class="video_monitor_empty" v-if="controlList.length === 0">
				<img src="../../../../public/imges/mom.png" >
			</div>
			<div class="video_monitor_column_ul" v-if="controlList.length !== 0">
				<div class="video_monitor_li" v-for="(item,index) in controlList" :key="index"
					@click="videoClick(item.id)">
					<div class="video_monitor_li_top">
						<div class="name">
							{{item.name}}
						</div>
						<div class="state" v-if="item.status">
							<div class="text">
								(在线)
							</div>
							<b class="b"></b>
						</div>
						<div class="state2" v-else>
							<div class="text">
								(离线)
							</div>
							<b class="b"></b>
						</div>
					</div>
					<div class="video_monitor_li_bottom">

					</div>
				</div>
			</div>
		</div>

		<!-- 弹框 -->
		<div class="command_spring_frame" v-show="decideLaunch">
			<div class="spring_frame">
				<div class="frame_title">
					永昌大厦
				</div>
				<!-- 会议主题 -->
				<div class="frame_meeting">
					<div class="meeting_text">
						会议主题
					</div>
					<div class="meeting_name" >
						<input type="text" placeholder="输入会议主题" v-model="conferenceData.theme"/>
					</div>
				</div>
				<!-- 会议内容 + 人 -->
				<div class="frame_content">
					<div class="frame_content_left">
						<!-- 标题 -->
						<div class="frame_content_left_title">
							<b></b>
							<div class="frame_content_text">
								搜索会议人员
							</div>
						</div>
						<!-- 人员 -->
						<div class="personnel" v-loading="loadings" element-loading-text="加载中" element-loading-spinner="el-icon-loading">
							<el-input placeholder="输入人员名称" v-model="filterText">
							</el-input>
							<div class="personnel_tree">
								<el-tree :data="personnelData" show-checkbox node-key="id" :props="defaultProps"
									:filter-node-method="filterNode" ref="tree" @check-change="clickObtain">
								</el-tree>
							</div>
						</div>
					</div>
					<div class="frame_content_right">
						<!-- 参与人员标题 -->
						<div class="frame_content_right_title">
							参与人员
						</div>
						<!-- 边框 -->
						<div class="frame_content_right_frame">
							<div class="frame_text_ul">
								<div class="frame_text_li" v-for="(item,index) in partakePeople" :key="index">
									{{item}}
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 发起会议 -->
				<div class="frame_launch" @click="clickLaunch">
					发起会议
				</div>
				<!-- 关闭弹窗 -->
				<div class="close_frame" @click="clickClose">

				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import video from './video.js';
	export default video;
</script>

<style scoped>
	@import url("video.css");
</style>

<style type="text/css">
	.video_monitor .personnel .el-input__inner {
		width: 100%;
		height: 28px;
		color: #fff;
		background-color: rgba(0, 0, 0, 0);
		border: 1px solid #08c9ff;
		font-size: 12px;
	}

	.video_monitor .personnel .personnel_tree {
		margin-top: 4%;
	}

	.video_monitor .personnel .personnel_tree .el-tree {
		background-color: rgba(0, 0, 0, 0);
		color: #fff;
	}

	.video_monitor .personnel .personnel_tree .el-tree:hover {
		background-color: rgba(0, 0, 0, 0);
	}

	.video_monitor .personnel .personnel_tree .el-tree .el-tree-node__content {
		background-color: rgba(0, 0, 0, 0);
	}

	.video_monitor .personnel .personnel_tree .el-tree .el-tree-node__content:hover {
		background-color: rgba(9, 131, 178, .2);
	}
</style>
