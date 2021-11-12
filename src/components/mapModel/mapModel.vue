	<!-- three.js 地图模型 -->
<template>
	<div class="mapModel">
		<canvas id="canvas" style="position: absolute; z-index: -100;"></canvas>
		<!-- <div id="Model_homePage"></div> -->
		<!-- <div class="cameraPosition" @click="clickPosition()">
			相机当前位置
		</div> -->
		<!-- <div class="cameraAnimation" @click="animationClick()">
			相机动画
		</div> -->
		<div v-if="notHasLoadAll" class="pro">
			<i class="el-icon-loading loading-icon"> </i>
			<el-progress :percentage="percentage" :format="format"></el-progress>
		</div>
	</div>
</template>

<script>
	import mapModel from './mapModel.js';
	export default mapModel;
</script>

<style>
	@import url("mapModel.css");
</style>
