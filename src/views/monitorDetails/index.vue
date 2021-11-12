<!-- 监控详情视频 -->
<template>
	<div class="monitor_details">
		<!-- 返回 -->
		<div class="monitor_monitor_return" @click="clickReturn()">
		</div>
		<!-- 左 视频 -->
		<div class="monitor_details_left">
			<!-- 标题 -->
			<div class="monitor_details_left_title">
				<div class="monitor_title">
					实时监控
				</div>
				<div class="monitor_circuit">
					闭路电路线路-6
					<div class="history_monitor_button" @click="clickPlayback">
						历史监控
					</div>
				</div>
			</div>
			<!-- 播放 -->
			<div class="monitor_details_left_play">
				<!-- 视频 -->
				<div class="monitor_details_video">
					<!-- 视频 + 操作功能 -->
					<play></play>
				</div>
				
			</div>
		</div>
		<!-- 右 菜单列表 -->
		<div class="monitor_details_right">
			<div class="monitor_title">
				<div class="monitor_lis_title">
					视频监控
				</div>
				<div class="monitor_lis_number">
					<div class="text">
						摄像头数量:
					</div>
					<div class="number">
						9
					</div>
				</div>
			</div>
			<!-- 菜单 -->
			<div class="monitor_choice">
				<div class="monitor_choice_li" :class="item.switchType ? 'monitor_choice_li_te' : '' "
					v-for="(item,index) in monitorData" :key="index" @click="menuClick(index)">
					{{item.name}}
				</div>
			</div>
			<!-- 列表 -->
			<div class="monitor_list">
				<div class="monitor_list_ul">
					<div class="monitor_list_li" v-for="(item,index) in 9" :key="index" @click="">
						<div class="monitor_list_li_title">
							<div class="text">
								工程-工地大门-视频1
							</div>
							<!-- <div class="text2">
								(在线)
								<div class="b">

								</div>
							</div> -->
							<div class="text1">
								(离线)
								<div class="b">
							
								</div>
							</div>
						</div>
						<!-- 视频 -->
						<div class="list_video">

						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 回放监控视频 -->
		<div class="monitor_playback_video" v-if="closePlayback">
			<!-- 弹框 回放视频 -->
			<history @monitorPlayback="monitorPlayback"></history>
		</div>
	</div>
</template>

<script>
	import index from './index.js';
	export default index;
</script>

<style scoped>
	@import url("index.css");
</style>

<style type="text/css">
	.monitor_details .personnel .el-input__inner {
		width: 100%;
		height: 28px;
		color: #fff;
		background-color: rgba(0, 0, 0, 0);
		border: 1px solid #08c9ff;
		font-size: 12px;
	}

	.monitor_details .personnel .personnel_tree {
		margin-top: 4%;
	}

	.monitor_details .personnel .personnel_tree .el-tree {
		background-color: rgba(0, 0, 0, 0);
		color: #fff;
	}

	.monitor_details .personnel .personnel_tree .el-tree:hover {
		background-color: rgba(0, 0, 0, 0);
	}

	.monitor_details .personnel .personnel_tree .el-tree .el-tree-node__content {
		background-color: rgba(0, 0, 0, 0);
	}

	.monitor_details .personnel .personnel_tree .el-tree .el-tree-node__content:hover {
		background-color: rgba(9, 131, 178, .2);
	}
</style>
