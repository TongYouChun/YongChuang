<!-- 历史回放 -->
<template>
	<div class="history_playback">
		<!-- 标题 -->
		<div class="history_playback_title">
			xx位置监控视频
		</div>
		<!-- 搜索功能 -->
		<div class="history_playback_top">
			<el-date-picker v-model="value1" size="small" type="datetimerange" range-separator="至" start-placeholder="开始日期"
				end-placeholder="结束日期">
			</el-date-picker>
			<div class="history_playback_button">
				搜索
			</div>
			
		</div>
		<!-- 视频 -->
		<div class="history_playback_bottom">
		</div>
		<!-- 关闭 -->
		<div class="history_playback_close" @click="clickClose">
		</div>
				
		<!-- 操作功能 -->
		<!-- <div class="history_playback_operation">
			<div class="history_playback_operation_ul">
				<div class="history_playback_operation_li">
					<img src="../../../../public/imges/building/supervise/xiangqin/qiepin.png" >
				</div>
				<div class="history_playback_operation_li">
					<img src="../../../../public/imges/building/supervise/xiangqin/xiazai.png" >
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	import history from './history.js';
	export default history;
</script>

<style scoped>
	@import url("history.css");
</style>

<style type="text/css">
	.history_playback .el-date-editor{
		background-color: rgba(0,0,0,0);
		color: #fff;
		border: 1px solid #384162;
	}
	.history_playback .el-range-input{
		background-color: rgba(0,0,0,0);
		color: #fff;
	}
	.history_playback .el-range-separator{
		color: #fff;
	}
</style>