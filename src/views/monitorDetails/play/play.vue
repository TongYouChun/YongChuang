<!-- 视频播放 -->
<template>
	<div class="video_play">
		<div class="video_Playback">
			<div class="video_Playback_type" v-if="layoutType === 0">
				<!-- <video width="100%" height="100%" controls autoplay>
				  <source src="movie.ogg" type="video/ogg">
				  <source src="movie.mp4" type="video/mp4">
				  <source src="movie.webm" type="video/webm">
				  <object data="movie.mp4" width="320" height="240">
				    <embed width="320" height="240" src="movie.swf">
				  </object>
				</video> -->
			</div>
			<div class="video_Playback_type4" v-if="layoutType === 4">
				<div class="video_Playback_type4_li"  v-for="(item,index) in 4" :key="index">
					
				</div>
			</div>
			<div class="video_Playback_type9" v-if="layoutType === 9">
				<div class="video_Playback_type9_li" v-for="(item,index) in 9" :key="index">
					
				</div>
			</div>
		</div>
		<div class="video_operation">
			<!-- 按钮 操作-->
			<div class="monitor_details_video_operation">
				<div class="monitor_details_operation_li">
					<span class="span span1" @click="layoutClick(0)"></span>
					<span class="span span2" @click="layoutClick(4)"></span>
					<span class="span span3" @click="layoutClick(9)"></span>
					<!-- <span class="span  span4"></span> -->
					<span class="span  span5"></span>
				</div>
				<div class="monitor_details_operation_li">
					<span class="span span6"></span>
					<span class="span span7"></span>
					<span class="span span8"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import play from './play.js';
	export default play;
</script>

<style scoped>
	@import url("play.css");
</style>

