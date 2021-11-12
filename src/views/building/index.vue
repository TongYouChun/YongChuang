<!-- 智慧楼宇 -->
<template>
	<div class="building">
		<!-- 左 -->
		<div class="index_left">
			<!-- 左边 统计图 -->
			<leftBuiding></leftBuiding>
		</div>
		<!-- 操作功能 -->
		<div class="operation_left">
			<!-- 智慧楼宇 操作功能 -->
			<operationLeft @hideModel='hideModel'></operationLeft>
		</div>
		
		<!-- 楼层 右-->
		<div class="floor_right">
			<!-- 右边 智慧楼宇 显示的所有楼层 -->
			<floorRight></floorRight>
		</div>
		<!-- 右边 统计图 -->
		<div class="index_right">
		   <rightBuiding ></rightBuiding>
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

